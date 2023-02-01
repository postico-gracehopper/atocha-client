import { useState, React } from 'react'
import { View, Button, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'

import colors from '../../theme/colors'
import languages from '../SelectLanguage/languageList'

const dummyData =
  'One of the best places to be is around the Canal and Republique. Restaurants, bakeries, bars, cafes, and cute shops are all around. And no major tourist destinations means that the crowds are not as thick.'

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

export default function Vocab() {
  const currInput = useSelector((state) => state.targetLanguage.input)
  const currOutput = useSelector((state) => state.targetLanguage.output)
  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const outputLangText = languages.find(
    (language) => language.languageCode === currOutput,
  ).languageName

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    // First, generate the vocab list given the recent conversation and output language.
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/generateVocab',
        data: {
          inputLang: currInput,
          outputLang: currOutput,
          conversation: dummyData,
        },
      })
      const { data } = response
      console.log('data issss', data)
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }
      setResult(data.result)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          {result ? (
            <Text style={styles.vocabList}>{result}</Text>
          ) : (
            <Text>
              No vocabulary words yet. Click below and we'll suggest some{' '}
              {outputLangText} words based on your recent conversation!
            </Text>
          )}
          <Button title="Suggest vocabulary" onPress={onSubmit} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  vocabList: {
    fontFamily: 'Cochin',
    fontSize: 24,
    lineHeight: 28,
    color: colors.primary,
    textAlign: 'center',
  },
})
