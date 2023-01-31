/* eslint-disable no-use-before-define */
import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Audio } from 'expo-av'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors } from 'theme'
import {
  setCurrentText,
  setIsTranslationFinal,
} from '../../slices/recordingSlice'
import translationSession from './translationSession'

const Details = ({ route, navigation }) => {
  const [recording, setRecording] = React.useState()

  const translatedText = useSelector((state) => state.recording.currentText)
  const isTranslationFinal = useSelector(
    (state) => state.recording.isTranslationFinal,
  )
  const langSource = useSelector((state) => state.languageSelector.input)
  const langTarget = useSelector((state) => state.languageSelector.output)

  const dispatch = useDispatch()
  const image = {
    uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
  }

  async function startRecording() {
    dispatch(setCurrentText(''))
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

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.theySaid}>
          <Text style={styles.theySaidTag}>They said:</Text>
          {isTranslationFinal ? (
            <Text style={styles.finalTranslation}>{translatedText}</Text>
          ) : (
            <Text style={styles.partialTranslation}>{translatedText}</Text>
          )}
        </View>
        <StatusBar barStyle="light-content" />
        <View>
          <TouchableOpacity
            style={recording ? styles.recordButtonOff : styles.recordButtonOn}
            title={recording ? 'STOP' : 'RECORD'}
            onPress={recording ? stopRecording : startRecording}
          >
            <MaterialCommunityIcons
              name={recording ? 'microphone-off' : 'microphone'}
              size={35}
              color={colors.white}
            />
          </TouchableOpacity>
          <Text
            title="Go Back"
            color="white"
            style={styles.tempBackButton}
            backgroundColor={colors.pink}
            onPress={navigation.goBack}
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
  recordButtonOn: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
    borderRadius: 100,
    backgroundColor: colors.pink,
    color: colors.white,
  },
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lightGrayPurple,
  },
  tempBackButton: {
    fontSize: 2,
  },
  theySaid: {
    height: '60%',
    width: '100%',
    backgroundColor: colors.primary,
    padding: 20,
  },
  theySaidTag: {
    textTransform: 'uppercase',
    color: colors.white,
    fontSize: 20,
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
})

export default Details
