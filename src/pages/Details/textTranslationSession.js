import { readAsStringAsync, EncodingType } from 'expo-file-system'
import { io } from 'socket.io-client'
import {
  setTranslatedText,
  setTranscribedText,
  setIsTranslationFinal,
  setIsTranscriptionFinal,
} from '../../slices/translationSlice'

const textTranslationSession = ({
  transcribedText,
  langSource,
  langTarget,
  dispatch,
}) => {
  return new Promise((resolve, reject) => {
    console.log('entered session')
    const socket = io('http://127.0.0.1:3000') // !@# need some ternary for TEST / LOCAL / PRODUCTION
    socket.on('connect', () => {
      socket.emit('text', {
        langSource,
        langTarget,
        text: transcribedText,
      })
    })
    socket.on('partial-translation', (partialTranslation) => {
      dispatch(setTranslatedText(partialTranslation.translation))
    })
    socket.on('final-translation', (finalTranslation) => {
      console.log('final-translation: ', finalTranslation)
      if (finalTranslation === '')
        dispatch(setTranslatedText('Please enter your text again...'))
      else dispatch(setTranslatedText(finalTranslation))
      dispatch(setIsTranslationFinal(true))
    })
    socket.on('session-complete', () => {
      console.log('Session complete, disconnecting socket...')
      socket.disconnect()
      resolve('session complete')
    })
    socket.on('error', () => {
      console.log('Session **error**, disconnecting socket...')
      socket.disconnect()
      reject('error during translation')
    })
    socket.on('err', (err) => reject(err))
  })
}

export default textTranslationSession