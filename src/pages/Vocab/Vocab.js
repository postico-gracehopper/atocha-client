import { useState, React } from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'

const dummyData =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.'

export default function Vocab() {
  const currInput = useSelector((state) => state.targetLanguage.input)
  const currOutput = useSelector((state) => state.targetLanguage.output)
  const [result, setResult] = useState()

  async function onSubmit(event) {
    event.preventDefault()

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
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      {/* <Button onPress={onSubmit} title="Press me" /> */}
      <Button title="Press me" />
      <View>
        <Text onPress={onSubmit}>Testing</Text>
        <Text style={styles.vocabList}>{result}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  vocabList: {
    padding: 20,
  },
})
