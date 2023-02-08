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

const SuggestingsView = ({ styles }) => {
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

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
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

  return (
    <View style={styles.generatedTextActiveContainer}>
      {isLoading ? (
        <Loading styles={styles} />
      ) : (
        <>
          <Pressable onPress={onSubmit}>
            <Text style={styles.finalText}>Suggest responses</Text>
          </Pressable>
          {result.map((item) => {
            return (
              <View key={item.source}>
                {console.log('item.source', item.source)}
                {console.log('item.target', item.target)}
                <Text style={styles.teacherText}>{item.source}</Text>
                <Text style={styles.teacherText}>{item.target}</Text>
              </View>
            )
          })}
        </>
      )}
    </View>
  )
}

export default SuggestingsView
