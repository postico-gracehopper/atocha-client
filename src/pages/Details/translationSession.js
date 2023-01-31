import { readAsStringAsync, EncodingType } from 'expo-file-system'
import { io } from 'socket.io-client'
import {
  setCurrentText,
  setIsTranslationFinal,
} from '../../slices/recordingSlice'

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
          dispatch(setCurrentText(partialTranslation.translation))
        })
        socket.on('final-translation', (finalTranslation) => {
          dispatch(setCurrentText(finalTranslation.translation))
          dispatch(setIsTranslationFinal(true))
          resolve(finalTranslation)
          socket.disconnect()
        })
        socket.on('err', (err) => reject(err))
      })
  })
}

export default translationSession
