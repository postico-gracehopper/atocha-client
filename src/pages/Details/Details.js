/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  StatusBar,
  Pressable,
} from 'react-native'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors } from 'theme'
import {
  LanguagePicker,
  TextEntry,
  TextOutput,
  ListeningView,
} from '../../components/'

import {
  setTranslatedText,
  setTranscribedText,
  setIsTranslationFinal,
  setIsTranscriptionFinal,
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

const image = {
  // move this someplace else
  uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
}

const Details = ({ route, navigation }) => {
  // remove props?
  const [recording, setRecording] = React.useState()
  const [isRecording, setIsRecording] = React.useState(false)
  const [showInput, setShowInput] = React.useState(true)

  const translatedText = useSelector(
    (state) => state.translation.translatedText,
  )
  const transcribedText = useSelector(
    (state) => state.translation.transcribedText,
  )
  const isTranslationFinal = useSelector(
    (state) => state.translation.isTranslationFinal,
  )
  const isTranscriptionFinal = useSelector(
    (state) => state.translation.isTranscriptionFinal,
  )

  const langSource = useSelector((state) => state.languagePicker.input)
  const langTarget = useSelector((state) => state.languagePicker.output)
  const langSourceName = useSelector(
    (state) => state.languagePicker.inputString,
  )
  const langTargetName = useSelector(
    (state) => state.languagePicker.outputString,
  )

  const dispatch = useDispatch()

  async function startRecording() {
    setShowInput(false)
    setIsRecording(true)
    dispatch(setTranscribedText(''))
    dispatch(setIsTranscriptionFinal(false))
    dispatch(setTranslatedText(''))
    dispatch(setIsTranslationFinal(false))
    try {
      console.log('Requesting permission from the phone..')
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      console.log('Starting recording..')
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      )
      setRecording(recording)
      console.log('Recording started')
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..')
    setIsRecording(false)
    setRecording(undefined)
    await recording.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })

    const uri = await recording.getURI()
    console.log('stop recording entered')

    translationSession({
      uri,
      langSource: langSource,
      langTarget: langTarget,
      dispatch,
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

  const handleTextSubmit = () => {
    console.log('text submitted')
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      {/*can we put this in the parent? */}
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.languagePickerContainer}>
          <LanguagePicker
            styles={styles}
            chosenLanguage={langSource}
            onValueChange={onInputValueChange}
          />
          <Pressable title="SWAP LANGUAGES" onPress={handleLanguageSwap}>
            <MaterialCommunityIcons
              name="swap-horizontal-bold"
              size={35}
              color={colors.white}
            />
          </Pressable>
          <LanguagePicker
            styles={styles}
            chosenLanguage={langTarget}
            onValueChange={onOutputValueChange}
          />
        </View>
        {showInput ? (
          <TextEntry styles={styles} onSubmitEditing={handleTextSubmit} />
        ) : null}
        {isRecording && !transcribedText ? (
          <View style={styles.listeningViewContainer}>
            <Text style={styles.listeningViewText}>Listening...</Text>
          </View>
        ) : null}
        {!isRecording && transcribedText ? (
          <>
            <TextOutput
              styles={styles}
              langCode={langSource}
              langName={langSourceName}
              text={transcribedText}
              isFinal={isTranscriptionFinal}
            />
            <TextOutput
              styles={styles}
              langCode={langTarget}
              langName={langTargetName}
              text={translatedText}
              isFinal={isTranslationFinal}
            />
          </>
        ) : null}

        <View style={styles.controlContainer}>
          <Pressable
            style={isRecording ? styles.recordButtonOff : styles.recordButtonOn}
            title={isRecording ? 'STOP' : 'RECORD'}
            onPress={recording ? stopRecording : startRecording}
          >
            <MaterialCommunityIcons
              name={'microphone'}
              size={45}
              color={colors.primary}
            />
          </Pressable>
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
  languagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(47,00,24,0.8)',
    width: '100%',
    paddingTop: 40,
    paddingBottom: 20,
  },
  pickerContainer: {
    alignItems: 'center',
  },
  picker: {
    width: 170,
  },
  onePickerItem: {
    height: 130,
    color: colors.white,
    fontSize: 20,
    fontStyle: 'bold',
  },
  textInputContainer: {
    flex: 2,
    width: '100%',
    backgroundColor: 'rgba(47,00,24,0.8)',
    paddingLeft: 20,
    fontFamily: 'Cochin',
  },
  textOutputContainer: {
    flex: 2,
    width: '100%',
    backgroundColor: 'rgba(47,00,24,0.8)',
    paddingLeft: 20,
  },
  listeningViewContainer: {
    flex: 4,
    width: '100%',
    backgroundColor: 'rgba(47,00,24,0.8)',
    paddingLeft: 20,
  },
  listeningViewText: {
    color: colors.gray,
    fontSize: 30,
  },
  textInput: {
    color: colors.white,
    fontSize: 30,
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
    fontSize: 20,
    paddingRight: 10,
    fontFamily: 'Cochin',
  },
  controlContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(47,00,24,0.8)',
    width: '100%',
  },
  recordButtonOn: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.white,
  },
  recordButtonOff: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.pink,
  },
  partialText: {
    marginTop: 20,
    color: colors.gray,
    fontSize: 30,
    fontFamily: 'Cochin',
  },
  finalText: {
    marginTop: 20,
    color: colors.white,
    fontSize: 30,
    fontFamily: 'Cochin',
  },
})

export default Details
