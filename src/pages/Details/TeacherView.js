import { useState, React } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { Text, Pressable, View, ActivityIndicator } from 'react-native'

import colors from '../../theme/colors'

const Loading = ({ styles }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

const TeacherView = ({ styles }) => {
  const translatedText = useSelector(
    (state) => state.translation.translatedText,
  )
  const sourceLanguageOutput = useSelector(
    (state) => state.translation.sourceLanguageOutput,
  )
  const targetLanguageOutput = useSelector(
    (state) => state.translation.targetLanguageOutput,
  )

  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setSubmitted(true)
    // First, generate the vocab list given the recent conversation and output language.
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/generateTeacher',
        data: {
          inputLang: sourceLanguageOutput,
          outputLang: targetLanguageOutput,
          conversation: translatedText,
        },
      })
      const { data } = response
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }
      const trimedResult = data.result.trim()
      setResult(trimedResult)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.generatedTextActiveContainer}>
      {!submitted ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Pressable onPress={onSubmit} style={styles.generatePressable}>
            <Text style={styles.generatePressableText}>Ask the teacher</Text>
          </Pressable>
        </View>
      ) : null}
      {isLoading ? (
        <Loading styles={styles} />
      ) : (
        <View>
          <Text style={styles.teacherText}>{result}</Text>
        </View>
      )}
    </View>
  )
}

export default TeacherView
