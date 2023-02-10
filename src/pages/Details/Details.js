/* eslint-disable no-use-before-define */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  ImageBackground,
  View,
  StatusBar,
  Pressable,
} from 'react-native'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors } from 'theme'
import { LanguagePicker, ResetButton } from '../../components/'

import {
  setTranslatedText,
  setTranscribedText,
  setIsTranslationFinal,
  setIsTranscriptionFinal,
  setSourceLanguageOutput,
  setTargetLanguageOutput,
  setIsTeacherSubmitted,
  setTeacherGeneratedText,
  setViewMode,
  setIsSuggestionSubmitted,
  setSuggestionGeneratedText,
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

const image = {
  uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
}
import { useAuth } from '../../../context/authContext'

const Details = () => {
  const [recording, setRecording] = React.useState()
  const [isRecording, setIsRecording] = React.useState(false)
  const { currentUser } = useAuth()

  const { transcribedText, isTeacherLoading, isSuggestionLoading } =
    useSelector((state) => state.translation)
  const { langSource, langTarget, langSourceName, langTargetName } =
    useSelector((state) => state.languagePicker)

  const dispatch = useDispatch()

  async function startRecording() {
    console.log('Starting recording..')
    setIsRecording(true)
    dispatch(setViewMode('audio-input'))
    dispatch(setTranscribedText(''))
    dispatch(setTranslatedText(''))
    dispatch(setIsTranscriptionFinal(false))
    dispatch(setIsTranslationFinal(false))
    dispatch(setIsTeacherSubmitted(false))
    dispatch(setIsSuggestionSubmitted(false))
    dispatch(setTeacherGeneratedText(''))
    dispatch(setSuggestionGeneratedText([]))
    dispatch(setSourceLanguageOutput(''))
    dispatch(setTargetLanguageOutput(''))
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
    dispatch(setViewMode('translation-output'))
    setIsRecording(false)
    setRecording(undefined)
    dispatch(setSourceLanguageOutput(langSourceName))
    dispatch(setTargetLanguageOutput(langTargetName))
    await recording.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })

    const uri = await recording.getURI()
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
    dispatch(setTranscribedText(''))
    dispatch(setTranslatedText(''))
    dispatch(setIsTranscriptionFinal(false))
    dispatch(setIsTranslationFinal(false))
    dispatch(setSourceLanguageOutput(''))
    dispatch(setTargetLanguageOutput(''))
    dispatch(setIsTeacherSubmitted(false))
    dispatch(setTeacherGeneratedText(''))
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

        <View style={styles.controlContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', top: 0 }}>
              <LanguagePicker
                styles={styles}
                chosenLanguage={langSource}
                onValueChange={onInputValueChange}
              />
            </View>
            <View style={styles.recordButtonContainer}>
              <Pressable
                title="SWAP LANGUAGES"
                onPress={handleLanguageSwap}
                style={{ paddingBottom: 10 }}
              >
                <MaterialCommunityIcons
                  name="swap-horizontal"
                  size={35}
                  color={colors.white}
                />
              </Pressable>
              <Pressable
                style={
                  isRecording ? styles.recordButtonOff : styles.recordButtonOn
                }
                title={isRecording ? 'STOP' : 'RECORD'}
                onPress={recording ? stopRecording : startRecording}
                disabled={isTeacherLoading || isSuggestionLoading}
              >
                <MaterialCommunityIcons
                  name={'microphone'}
                  size={45}
                  color={colors.primary}
                />
              </Pressable>
            </View>
            <LanguagePicker
              styles={styles}
              chosenLanguage={langTarget}
              onValueChange={onOutputValueChange}
            />
          </View>
        </View>
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
    flexDirection: 'column',
    backgroundColor: colors.lightGrayPurple,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transparentOverlay: {
    backgroundColor: 'rgba(47,00,24,0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  languagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 35,
    paddingBottom: 15,
  },
  picker: {
    width: 170,
  },
  onePickerItem: {
    height: 130,
    color: colors.white,
    fontSize: 18,
    fontStyle: 'bold',
  },
  textInputContainer: {
    flex: 5,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 50,
    fontFamily: 'Cochin',
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
    fontSize: 25,
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  textOutputTag: {
    textTransform: 'uppercase',
    color: colors.white,
    fontSize: 15,
    paddingRight: 10,
    fontFamily: 'Cochin',
  },
  controlContainer: {
    height: 135,
    position: 'absolute',
    bottom: 15,
    width: '100%',
  },
  recordButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  recordButtonOn: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonOff: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonContainer: {
    position: 'absolute',
    top: 65,
    right: 20,
    zIndex: '1',
  },
  resetButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 70,
  },
  partialText: {
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.gray,
    fontSize: 20,
    fontFamily: 'Cochin',
  },
  finalText: {
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Cochin',
  },
  teacherText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Cochin',
  },
  generatedTextContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 50,
    bottom: 150,
  },
  textOutputContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingTop: 85,
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
    fontSize: 18,
    fontFamily: 'Cochin',
  },
  generatedTextActiveContainer: {
    backgroundColor: 'rgba(169, 169, 169, 0.2)',
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.white,
  },
  generatePressable: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.primary,
    borderColor: colors.gray,
    borderWidth: 1,
  },
  generatePressableText: {
    fontSize: 18,
    fontFamily: 'Baskerville',
    color: colors.white,
  },
  suggestionPressable: {
    borderRadius: 20,
    borderColor: colors.gray,
    borderWidth: 1,
    paddingLeft: 20,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  suggestionsText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Cochin',
  },
  scrollView: {
    flex: 1,
    alignSelf: 'center',
    justifySelf: 'center',
    width: '100%',
  },
})

export default Details
