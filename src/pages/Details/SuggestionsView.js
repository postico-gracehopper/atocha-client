import { useState, React } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { Text, Pressable, View, ActivityIndicator } from 'react-native'

import colors from '../../theme/colors'
import SingleSuggestion from './SingleSuggestion'

import {
  setTranslatedText,
  setTranscribedText,
  setIsTranslationFinal,
  setIsTranscriptionFinal,
  setSourceLanguageOutput,
  setTargetLanguageOutput,
} from '../../slices/translationSlice'
import { useAuth } from '../../../context/authContext'
import textTranslationSession from './textTranslationSession'

const Loading = ({ styles }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

const SuggestingsView = ({ styles }) => {
  const dispatch = useDispatch()

  const transcribedText = useSelector(
    (state) => state.translation.transcribedText,
  )
  const sourceLanguageOutput = useSelector(
    (state) => state.translation.sourceLanguageOutput,
  )
  const targetLanguageOutput = useSelector(
    (state) => state.translation.targetLanguageOutput,
  )

  const [result, setResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { currentUser } = useAuth()

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setSubmitted(true)

    // First, generate the vocab list given the recent conversation and output language.
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/generateSuggestions',
        data: {
          inputLang: sourceLanguageOutput,
          outputLang: targetLanguageOutput,
          conversation: transcribedText,
        },
        headers: {
          auth: await currentUser.getIdToken(),
        },
      })
      const { data } = response
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }
      console.log('data.result', data.result)
      const trimedResult = data.result.trim()
      const splitArray = trimedResult.split('%')
      console.log('splitArray', splitArray)
      let resultArray = []
      splitArray.map((item) => {
        const temp = item.split(';')
        console.log('temp', temp)
        const tempObj = { source: temp[0], target: temp[1] }
        resultArray.push(tempObj)
      })
      console.log('resultArray', resultArray)
      setResult(resultArray)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const onPress = (updatedText) => {
    console.log('onPress')
    // dispatch(setIsTranscriptionFinal(true))
    // dispatch(setSourceLanguageOutput(sourceLanguageOutput))
    // dispatch(setTargetLanguageOutput(targetLanguageOutput))
    // dispatch(setTranscribedText(updatedText))
    // textTranslationSession({
    //   transcribedText,
    //   sourceLanguageOutput,
    //   targetLanguageOutput,
    //   dispatch,
    // })
    //   .then((textFromGoogle) => {
    //     console.log('text from google: ', textFromGoogle)
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
  }

  return (
    <View style={styles.generatedTextActiveContainer}>
      {!submitted ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Pressable onPress={onSubmit} style={styles.generatePressable}>
            <Text style={styles.generatePressableText}>Continue the convo</Text>
          </Pressable>
        </View>
      ) : null}
      {isLoading ? (
        <Loading styles={styles} />
      ) : (
        <>
          {result.map((item) => {
            return (
              <SingleSuggestion
                key={item.source}
                styles={styles}
                onPress={onPress}
                sourceText={item.source}
                targetText={item.target}
              />
            )
          })}
        </>
      )}
    </View>
  )
}

export default SuggestingsView
