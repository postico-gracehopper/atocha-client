import * as React from 'react'
import { Platform, Pressable } from 'react-native'
import * as Speech from 'expo-speech'
import { Audio } from 'expo-av'
const soundObject = new Audio.Sound()

import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function TextTranscriber({
  text,
  language,
  color,
  disabled,
  uri,
}) {
  //state holding whether it is playing
  const [playing, setPlaying] = React.useState(false)

  const handlePlay = async () => {
    setPlaying(true)
    if (uri) {
      try {
        const sound = new Audio.Sound()
        const { durationMillis: duration } = await sound.loadAsync({
          uri,
        })
        await sound.playAsync()
        setTimeout(() => {
          setPlaying(false)
        }, duration)
        return
      } catch (err) {
        console.log(err)
      }
    }

    const enableAndPlaySound = async () => {
      if (Platform.OS === 'ios') {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
        await soundObject.loadAsync(
          require('../../assets/sounds/emptySoundFile.mp3'), //must play empty sound to get Speech to play
        )
        await soundObject.playAsync()
      }
      Speech.speak(text, {
        language: language,
        onDone: () => setPlaying(false),
        onError: (err) => console.log(`Error in dictation callback: ${err}`),
      })
      await soundObject.unloadAsync()
    }
    enableAndPlaySound()
  }

  const handleStop = async () => {
    Speech.stop()
    await soundObject.unloadAsync()
    setPlaying(false)
  }

  return (
    <Pressable onPress={playing ? handleStop : handlePlay} disabled={disabled}>
      <MaterialCommunityIcons
        name={playing ? 'stop' : 'play'}
        size={24}
        color={color}
      />
    </Pressable>
  )
}
