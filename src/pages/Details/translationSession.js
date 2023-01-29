import { readAsStringAsync, EncodingType } from 'expo-file-system'
import { io } from 'socket.io-client'

export default function translationSession({ uri, langSource, langTarget }) {
  return new Promise((resolve, reject) => {
    readAsStringAsync(uri, {
      encoding: EncodingType.Base64,
    })
      .catch((err) => {
        reject(new Error(`could not read recording uri: ${uri}, error: ${err}`))
      })
      .then((audioBase64) => {
        const socket = io('http://127.0.0.1:3000') // !@# need some ternary for TEST / LOCAL / PRODUCTION
        socket.on('connect', () => {
          socket.emit('audio', {
            langSource,
            langTarget,
            audioData: audioBase64,
            fileFormat: 'm4a',
          })
        })
        socket.on('final-translation', (finalTranslation) => {
          resolve(finalTranslation)
          socket.disconnect()
        })
        socket.on('err', (err) => reject(err))
      })
  })
}
