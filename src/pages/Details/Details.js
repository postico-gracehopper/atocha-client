/* eslint-disable no-use-before-define */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, ImageBackground, View, StatusBar } from 'react-native'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'

import { colors } from 'theme'

import {
  setIsTranscriptionFinal,
  setSourceLanguageOutput,
  setTargetLanguageOutput,
  setViewMode,
  setIsSuggestionSubmitted,
  addToConversation,
  setRecordingURI,
  resetTranslationSession,
} from '../../slices/translationSlice'

import {
  setInputLanguage,
  setOutputLanguage,
  swapSelectedLanguages,
  setInputLanguageString,
  setOutputLanguageString,
} from '../../slices/languagePickerSlice'

import languages from '../SelectLanguage/languageList'
import translationSession from './translationSession'
import textTranslationSession from './textTranslationSession'
import TranslationViewPort from './TranslationViewPort'
import ControlPanelView from './ControlPanelView'

import { useAuth } from '../../../context/authContext'

const image = {
  uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
}

const Details = () => {
  const [recording, setRecording] = React.useState()
  const [isRecording, setIsRecording] = React.useState(false)

  const { currentUser } = useAuth()

  const { transcribedText } = useSelector((state) => state.translation)
  const { langSource, langTarget, langSourceName, langTargetName } =
    useSelector((state) => state.languagePicker)

  const dispatch = useDispatch()

  async function startRecording() {
    console.log('Starting recording..')
    setIsRecording(true)
    dispatch(setViewMode('audio-input'))
    dispatch(resetTranslationSession())

    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      )
      setRecording(recording)
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..')
    setIsRecording(false)
    setRecording(undefined)
    dispatch(setViewMode('translation-output'))
    dispatch(setSourceLanguageOutput(langSourceName))
    dispatch(setTargetLanguageOutput(langTargetName))
    await recording.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })

    const uri = await recording.getURI()
    dispatch(setRecordingURI(uri))
    translationSession({
      uri,
      langSource: langSource,
      langTarget: langTarget,
      dispatch,
      idToken: await currentUser.getIdToken(),
    })
      .then((textFromGoogle) => {
        console.log('text from google: ', textFromGoogle)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const onInputValueChange = (itemValue) => {
    dispatch(setInputLanguage(itemValue))
    const languageName = languages.filter(
      (language) => language.languageCode === itemValue,
    )[0].languageName
    dispatch(setInputLanguageString(languageName))
  }

  const onOutputValueChange = (itemValue) => {
    dispatch(setOutputLanguage(itemValue))
    const languageName = languages.filter(
      (language) => language.languageCode === itemValue,
    )[0].languageName
    dispatch(setOutputLanguageString(languageName))
  }

  const handleLanguageSwap = () => {
    dispatch(swapSelectedLanguages())
  }

  const handleTextSubmit = async () => {
    console.log('text submitted')
    dispatch(setIsTranscriptionFinal(true))
    dispatch(setSourceLanguageOutput(langSourceName))
    dispatch(setTargetLanguageOutput(langTargetName))
    dispatch(addToConversation(transcribedText))
    dispatch(setIsSuggestionSubmitted(false))
    textTranslationSession({
      transcribedText,
      langSource,
      langTarget,
      dispatch,
      idToken: await currentUser.getIdToken(),
    })
      .then((textFromGoogle) => {
        console.log('text from google: ', textFromGoogle)
      })
      .catch((err) => {
        console.error(err)
      })
    dispatch(setViewMode('translation-output'))
  }

  const handleReset = async () => {
    dispatch(setViewMode('text-input'))
    setIsRecording(false)
    if (recording) {
      await recording.stopAndUnloadAsync()
    }

    dispatch(resetTranslationSession())
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.transparentOverlay} />

        <TranslationViewPort
          styles={styles}
          recording={recording}
          isRecording={isRecording}
          handleReset={handleReset}
          handleTextSubmit={handleTextSubmit}
        />

        <ControlPanelView
          styles={styles}
          startRecording={startRecording}
          stopRecording={stopRecording}
          onInputValueChange={onInputValueChange}
          onOutputValueChange={onOutputValueChange}
          handleLanguageSwap={handleLanguageSwap}
          isRecording={isRecording}
          recording={recording}
        />
      </ImageBackground>
    </View>
  )
}

Details.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

Details.defaultProps = {
  route: { params: { from: '' } },
  navigation: { goBack: () => null },
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  transparentOverlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  languagePickerContainer: {},
  picker: {
    width: 160,
    marginHorizontal: -20,
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  onePickerItem: {
    height: 100,
    color: colors.white,
    fontSize: 18,
    fontStyle: 'bold',
  },
  textInputContainer: {
    flex: 5,
    maxHeight: '90%',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 50,
    paddingTop: 85,
  },
  listeningViewContainer: {
    flex: 5,
    width: '100%',
    paddingLeft: 20,
    paddingTop: 85,
  },
  listeningViewText: {
    color: colors.gray,
    fontSize: 25,
  },
  textInput: {
    color: colors.white,
    fontSize: 28,
    fontFamily: 'lora',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  textOutputTag: {
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: colors.brightPrimary,
    fontSize: 15,
    fontWeight: '700',
    paddingRight: 10,
  },
  controlContainer: {
    height: 100,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  recordButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  recordButtonOn: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonOff: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: colors.brightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonContainer: {
    position: 'absolute',
    top: 55,
    right: 8,
    zIndex: '1',
  },
  resetButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 70,
  },
  partialText: {
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.gray,
    fontSize: 16,
    fontFamily: 'lora',
    lineHeight: 24,
  },
  finalText: {
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.white,
    fontSize: 16,
    fontFamily: 'lora',
    lineHeight: 24,
  },
  teacherText: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 24,
  },
  generatedTextContainer: {
    flex: 1.8,
    width: '100%',
  },
  textOutputContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingTop: 55,
    paddingBottom: 30,
  },
  generatedTextHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  generatedTextHeaderActive: {
    alignItems: 'center',
    width: '50%',
    backgroundColor: 'rgba(169, 169, 169, 0.2)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  generatedTextHeaderInactive: {
    alignItems: 'center',
    width: '50%',
  },
  generatedTextHeaderText: {
    color: colors.white,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    padding: 12,
  },
  generatedTextActiveContainer: {
    backgroundColor: 'rgba(169, 169, 169, 0.2)',
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
    marginLeft: 20,
  },
  loadingText: {
    fontSize: 16,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 10,
    color: colors.white,
  },
  generatePressable: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.brightPrimary,
  },
  generatePressableText: {
    fontSize: 18,
    fontFamily: 'lora_bold',
    color: colors.white,
  },
  suggestionPressable: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 18,
    width: '100%',
    paddingVertical: 12,
  },
  suggestionsText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  suggestionsTextTarget: {
    color: colors.white,
    fontSize: 10,
    fontStyle: 'italic',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'center',
    justifySelf: 'center',
    width: '100%',
  },
})

export default Details
