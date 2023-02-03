/* eslint-disable no-use-before-define */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  StatusBar,
  TouchableOpacity, //TODO update to Pressable
  Pressable,
} from 'react-native'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors } from 'theme'
import LanguagePicker from '../../components/LanguagePicker'
import TextTranscriber from '../../components/TextTranscriber'

import {
  setTranslatedText,
  setTranscribedText,
  setIsTranslationFinal,
  setIsTranscriptionFinal,
} from '../../slices/translationSlice'
import {
  setInputLanguage,
  setOutputLanguage,
} from '../../slices/languagePickerSlice'

import translationSession from './translationSession'

const Details = ({ route, navigation }) => {
  const [recording, setRecording] = React.useState()
  const [isRecording, setIsRecording] = React.useState(false)

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

  const dispatch = useDispatch()
  const image = {
    uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
  }

  async function startRecording() {
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
  }

  const onOutputValueChange = (itemValue) => {
    dispatch(setOutputLanguage(itemValue))
  }

  const text = 'feliz cumpleaños para mi.'

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.theySaid}>
          <View style={styles.headerContainer}>
            <Text style={styles.theySaidTag}>You said:</Text>
            <TextTranscriber
              text={transcribedText}
              language={langSource}
              color={colors.white}
              disabled={!isTranscriptionFinal}
            />
          </View>
          {isTranscriptionFinal ? (
            <Text style={styles.finalTranslation}>{transcribedText}</Text>
          ) : (
            <Text style={styles.partialTranslation}>{transcribedText}</Text>
          )}
        </View>
        <View style={styles.theySaid}>
          <View style={styles.headerContainer}>
            <Text style={styles.theySaidTag}>Translated:</Text>
            <TextTranscriber
              text={translatedText}
              language={langTarget}
              color={colors.white}
              disabled={!isTranslationFinal}
            />
          </View>
          {isTranslationFinal ? (
            <Text style={styles.finalTranslation}>{translatedText}</Text>
          ) : (
            <Text style={styles.partialTranslation}>{translatedText}</Text>
          )}
        </View>
        <StatusBar barStyle="light-content" />
        <View style={styles.controlContainer}>
          <LanguagePicker
            chosenLanguage={langSource}
            onValueChange={onInputValueChange}
            text="Translate from:"
          />
          <Pressable
            style={isRecording ? styles.recordButtonOff : styles.recordButtonOn}
            title={isRecording ? 'STOP' : 'RECORD'}
            onPress={recording ? stopRecording : startRecording}
          >
            <MaterialCommunityIcons
              name={isRecording ? 'microphone-off' : 'microphone'}
              size={35}
              color={colors.white}
            />
          </Pressable>
          <LanguagePicker
            chosenLanguage={langTarget}
            onValueChange={onOutputValueChange}
            text="Translate to:"
          />
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
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  recordButtonOn: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  recordButtonOff: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: colors.pink,
    color: colors.white,
  },
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lightGrayPurple,
  },
  controlContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempBackButton: {
    fontSize: 2,
  },
  theySaid: {
    height: '30%',
    width: '100%',
    backgroundColor: colors.primary,
    padding: 20,
  },
  theySaidTag: {
    textTransform: 'uppercase',
    color: colors.brightPrimary,
    fontSize: 20,
    marginTop: 35,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },
  partialTranslation: {
    marginTop: 20,
    color: colors.gray,
    fontSize: 30,
    fontFamily: 'Cochin',
  },
  finalTranslation: {
    marginTop: 20,
    color: colors.white,
    fontSize: 30,
    fontFamily: 'Cochin',
  },
  translateText: {
    flex: 1,
    textTransform: 'uppercase',
    color: colors.white,
    fontSize: 15,
  },
})

export default Details
