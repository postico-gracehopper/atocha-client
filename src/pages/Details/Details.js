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

import Button from 'components/Button'
import { colors } from 'theme'
import { submitRecordingAsync } from '../../slices/recordingSlice'

const Details = ({ route, navigation }) => {
  const from = route?.params?.from
  // MV the above seems navigation-based but isn't used?
  const translatedText = useSelector((state) => state.recording.currentText)
  // MV it wasn't working with useSelector(selectCurrentText) so I'm trying this,
  // as it worked when the prior didn't in Postico Ski Shop

  const [recording, setRecording] = React.useState()
  const [recordings, setRecordings] = React.useState([])
  const dispatch = useDispatch()
  const image = {
    uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
  }

  async function startRecording() {
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

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60
    const minutesDisplay = Math.floor(minutes)
    const seconds = Math.round((minutes - minutesDisplay) * 60)
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds
    return `${minutesDisplay}:${secondsDisplay}`
  }

  async function stopRecording() {
    console.log('Stopping recording..')
    setRecording(undefined)
    await recording.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })

    const uri = recording.getURI()

    let updatedRecordings = [...recordings]

    const { sound, status } = await recording.createNewLoadedSoundAsync()
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    })
    setRecordings(updatedRecordings)

    try {
      dispatch(submitRecordingAsync(uri))
    } catch (err) {
      console.error('Failed to send recording (POST where??)', err)
      err.innerText = err.response
        ? err.response.data.message
        : 'Request Timed Out'
    }

    // console.log('Recording stopped and stored at', uri)
    // console.log('UpdatedRecordings isss', updatedRecordings)
    // console.log('Most recent file is here:', recording.getURI())
  }

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.theySaid}>
          <Text style={styles.theySaidTag}>They said:</Text>
          <Text style={styles.yourTranslation}>{translatedText}</Text>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },
  yourTranslation: {
    marginTop: 20,
    color: colors.white,
    fontSize: 38,
    fontFamily: 'Cochin',
  },
})

export default Details
