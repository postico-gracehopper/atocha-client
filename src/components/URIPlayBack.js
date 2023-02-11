import * as React from 'react'
import { Platform, Pressable } from 'react-native'
import { Audio } from 'expo-av'

import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function URIPlayBack({ color, disabled, uri }) {
  const pastRecording = new Audio.Sound()
  //state holding whether it is playing
  const [playing, setPlaying] = React.useState(false)

  const handlePlay = async () => {
    setPlaying(true)
    if (uri) {
      try {
        const { durationMillis: duration } = await pastRecording.loadAsync({
          uri: uri,
        })
        await pastRecording.playAsync()
        setTimeout(async () => {
          await pastRecording.unloadAsync()
          setPlaying(false)
        }, duration)
        return
      } catch (err) {
        console.log('URIplayback error', err)
      }
    }
  }

  const handleStop = async () => {
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
