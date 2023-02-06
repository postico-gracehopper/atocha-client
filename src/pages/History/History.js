import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'

import SessionTile from './SessionTile'
import { FlatList } from 'react-native-gesture-handler'

const History = () => {
  const image = {
    uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
  }

  const dummyHistory = [
    {
      date: Date.now(),
      sourceLang: 'en-US',
      sourceTranscription: 'I like to play soccer',
      sourceAudio: 'uri://audiohere.m4a',
      targetLang: 'es-MX',
      targetTranscription: 'Me gusta jugar fútbol',
    },
    {
      date: Date.now() - 10,
      sourceLang: 'en-US',
      sourceTranscription: 'I like to play soccer',
      sourceAudio: 'uri://audiohere.m4a',
      targetLang: 'es-MX',
      targetTranscription: 'Me gusta jugar fútbol',
    },
    {
      date: Date.now() - 100,
      sourceLang: 'en-US',
      sourceTranscription: 'What is the best type of bear?',
      sourceAudio: 'uri://audiohere2.m4a',
      targetLang: 'es-MX',
      targetTranscription: 'Cual es el mejor tipo de oso',
    },
    {
      date: Date.now() - 100,
      sourceLang: 'en-US',
      sourceTranscription:
        'This is a long string of text to check how the tiles work when there is a ton of text on the screen. Did you know that lorem ipsum was a real speech, not just the idea of filling in fake text?',
      sourceAudio: 'uri://audiohere2.m4a',
      targetLang: 'es-MX',
      targetTranscription:
        'Esta es una larga cadena de texto para verificar cómo funcionan los mosaicos cuando hay un montón de texto en la pantalla. ¿Sabías que lorem ipsum era un discurso real, no solo la idea de rellenar texto falso?',
    },
  ]

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.transparentOverlay} />
        <FlatList
          style={{ marginTop: 50, width: '100%' }}
          data={dummyHistory}
          renderItem={(session) => <SessionTile session={session} />}
        />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transparentOverlay: {
    backgroundColor: 'black',
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default History
