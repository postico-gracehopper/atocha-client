import { useState, React } from 'react'
import { View, Button, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'

const dummyData =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.'

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
          {result ? <Text>{result}</Text> : <Text>No result yet</Text>}
          <Button title="Submit" onPress={onSubmit} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
    padding: 20,
  },
})
