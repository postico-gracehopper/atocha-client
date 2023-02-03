import { useState, React } from 'react'
import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'

import colors from '../../theme/colors'
import languages from '../SelectLanguage/languageList'

const dummyData =
  'One of the best places to be is around the Canal and Republique. Restaurants, bakeries, bars, cafes, and cute shops are all around. And no major tourist destinations means that the crowds are not as thick.'

const dummyWordArray = ['restaurant', 'boulangerie', 'cafe', 'republique']

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

export default function Vocab() {
  const currInput = useSelector((state) => state.languagePicker.input)
  const currOutput = useSelector((state) => state.languagePicker.output)
  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const image = {
    uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
  }

  const currentMessage = useSelector((state) => state.translation.currentText)

  const inputLangText = languages.find(
    (language) => language.languageCode === currInput,
  ).languageName

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
          inputLang: inputLangText,
          outputLang: outputLangText,
          conversation: dummyData,
        },
      })
      const { data } = response
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }
      setResult(data.result)
      await getDefinitions(dummyWordArray)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function getDefinitions(wordArray) {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/translateString',
        data: {
          targetLang: inputLangText,
          text: wordArray,
        },
      })
      const translatedStrings = response
      console.log('Translated strings are', translatedStrings)
      return translatedStrings
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.transparentOverlay} />
        <View style={styles.wrapper}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {result ? (
                <View style={styles.container}>
                  {result &&
                    result
                      .replace(/,/g, '')
                      .toLowerCase()
                      .split(' ')
                      .map((word, index) => (
                        <View key={index} style={styles.wordContainer}>
                          <Text style={styles.vocabList}>{`${word}`}</Text>
                          <Text style={styles.vocabDefinition}>
                            {/* {translatedStrings[index]} */}
                            Your definition here.
                          </Text>
                        </View>
                      ))}
                  <Pressable style={styles.vocabPressable} onPress={onSubmit}>
                    <Text style={styles.vocabPressableText}>
                      Get a fresh list
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.container}>
                  <View style={styles.notYetContainer}>
                    <Text style={styles.notYet}>No vocabulary words yet.</Text>
                    <Text style={styles.notYetSubtext}>
                      {currentMessage === null
                        ? "Once you've recorded some conversation, we'll be able to suggest vocabulary for you."
                        : "Click below and we'll suggest some " +
                          inputLangText +
                          ' words based on your recent conversation.'}
                    </Text>
                    {currentMessage !== null && (
                      <Pressable
                        style={styles.vocabPressable}
                        onPress={onSubmit}
                      >
                        <Text style={styles.vocabPressableText}>
                          Suggest vocabulary
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
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
    color: colors.white,
  },
  notYet: {
    paddingTop: 40,
    paddingLeft: 10,
    fontSize: 80,
    lineHeight: 70,
    fontFamily: 'arsilon',
    color: colors.white,
    zIndex: 1,
  },
  notYetContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  notYetSubtext: {
    marginTop: 10,
    fontSize: 26,
    fontFamily: 'Baskerville',
    color: colors.white,
    paddingHorizontal: 30,
  },
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  transparentOverlay: {
    backgroundColor: 'black',
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  vocabPressable: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.brightPrimary,
  },
  vocabPressableText: {
    fontSize: 22,
    fontFamily: 'Baskerville',
  },
  vocabList: {
    fontFamily: 'Baskerville-SemiBold',
    fontSize: 27,
    lineHeight: 42,
    color: colors.white,
    textAlign: 'center',
  },
  vocabDefinition: {
    fontFamily: 'Baskerville-SemiBold',
    fontSize: 12,
    lineHeight: 12,
    color: colors.white,
    textAlign: 'center',
  },
  wordContainer: {
    marginBottom: 16,
  },
})
