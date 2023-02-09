import * as React from 'react'
import { Platform, Pressable } from 'react-native'
import { Audio } from 'expo-av'

import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function TextTranscriber({ color, disabled, uri }) {
  const pastRecording = new Audio.Sound()
  //state holding whether it is playing
  const [playing, setPlaying] = React.useState(false)

  const handlePlay = async () => {
    console.log('playing?', playing, 'play pressed')
    setPlaying(true)
    if (uri) {
      try {
        const { durationMillis: duration } = await pastRecording.loadAsync({
          uri,
        })
        await pastRecording.playAsync()
        console.log('playing?', playing, 'sound should have started')
        setTimeout(async () => {
          console.log('playing?', playing, 'timeout fired')
          await pastRecording.unloadAsync()
          console.log('playing?', playing, 'stopped thru timer')
          setPlaying(false)
        }, duration)
        return
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleStop = async () => {
    console.log('playing?', playing, 'stopped')
    await pastRecording.unloadAsync()
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
