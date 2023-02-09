import { readAsStringAsync, EncodingType } from 'expo-file-system'
import { io } from 'socket.io-client'
import {
  setTranslatedText,
  setTranscribedText,
  setIsTranslationFinal,
  setIsTranscriptionFinal,
} from '../../slices/translationSlice'
import writeToAtochaFile from '../../filesystem/writeToAtochaFile'

const translationSession = ({
  uri,
  langSource,
  langTarget,
  dispatch,
  userUID,
  idToken,
}) => {
  let closureTranslation = ''
  let closureTransciption = ''
  return new Promise((resolve, reject) => {
    readAsStringAsync(uri, {
      encoding: EncodingType.Base64,
    })
      .catch((err) => {
        reject(new Error(`could not read recording uri: ${uri}, error: ${err}`))
      })
      .then((audioBase64) => {
        const socket = io('http://127.0.0.1:3000/audio', {
          auth: { token: idToken },
        }) // !@# need some ternary for TEST / LOCAL / PRODUCTION
        socket.on('connect', () => {
          socket.emit('session', {
            langSource,
            langTarget,
            audioData: audioBase64,
            fileFormat: 'm4a',
            userUID,
          })
        })
        socket.on('partial-translation', (partialTranslation) => {
          dispatch(setTranslatedText(partialTranslation.translation))
        })
        socket.on('final-translation', (finalTranslation) => {
          dispatch(setTranslatedText(finalTranslation.translation))
          dispatch(setIsTranslationFinal(true))
          closureTranslation = finalTranslation.translation
        })
        socket.on('partial-transcription', (partialTranscription) => {
          dispatch(setTranscribedText(partialTranscription))
        })
        socket.on('final-transcription', (finalTranscription) => {
          if (finalTranscription === '')
            dispatch(setTranscribedText('Please record again...'))
          else {
            dispatch(setTranscribedText(finalTranscription))
            closureTransciption = finalTranscription
          }
          dispatch(setIsTranscriptionFinal(true))
        })
        socket.on('session-complete', () => {
          const sessionObj = {
            langSource,
            langTarget,
            uri,
            sourceTranscription: closureTransciption,
            targetTranscription: closureTranslation,
            date: Date.now(),
          }
          writeToAtochaFile(JSON.stringify(sessionObj))
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
  })
}

export default translationSession
