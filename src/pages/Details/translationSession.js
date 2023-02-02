import { readAsStringAsync, EncodingType } from 'expo-file-system'
import { io } from 'socket.io-client'
import {
  setTranslatedText,
  setTranscribedText,
  setIsTranslationFinal,
  setIsTranscriptionFinal,
} from '../../slices/translationSlice'

const translationSession = ({ uri, langSource, langTarget, dispatch }) => {
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
        socket.on('partial-translation', (partialTranslation) => {
          dispatch(setTranslatedText(partialTranslation.translation))
        })
        socket.on('final-translation', (finalTranslation) => {
          dispatch(setTranslatedText(finalTranslation.translation))
          dispatch(setIsTranslationFinal(true))
        })
        socket.on('partial-transcription', (partialTranscription) => {
          console.log(
            '🚀 ~ file: translationSession.js:36 ~ socket.on ~ partialTranscription',
            partialTranscription,
          )
          dispatch(setTranscribedText(partialTranscription))
        })
        socket.on('final-transcription', (finalTranscription) => {
          console.log(
            '🚀 ~ file: translationSession.js:41 ~ socket.on ~ finalTranscription',
            finalTranscription,
          )
          dispatch(setTranscribedText(finalTranscription))
          dispatch(setIsTranscriptionFinal(true))
        })
        socket.on('session-complete', () => {
          console.log('Session complete, disconnecting socket...')
          socket.disconnect()
          resolve('session complete')
        })
        socket.on('session-error', () => {
          console.log('Session **error**, disconnecting socket...')
          socket.disconnect()
          reject('error during translation')
        })
        socket.on('err', (err) => reject(err))
      })
  })
}

export default translationSession
