import { useState, useEffect, React } from 'react'
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

import { uri } from '../../../constants'
import { useAuth } from '../../../context/authContext'
import colors from '../../theme/colors'
import languages from '../SelectLanguage/languageList'
import SaveStars from './SaveStars'

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
  const [selectedWords, setSelectedWords] = useState([])
  const recentConversation = useSelector(
    (state) => state.translation.translatedText,
  )
  // MV to-do: Conversation should take in the last 3 recording transcriptions from history,
  // not just the current "translatedText" (aka the most recent recording transcription).

  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [translatedStrings, setTranslatedStrings] = useState([])
  const [sessionVocab, setSessionVocab] = useState({})

  const image = {
    uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
  }

  const currentMessage = useSelector((state) => state.translation.currentText)

  let nonEnglishCode = ''
  let displayLang = ''

  if (currInput == 'en-US') {
    nonEnglishCode = currOutput.split('-')[0]
    displayLang = languages.find(
      (language) => language.languageCode === currOutput,
    ).languageName
  } else {
    nonEnglishCode = currInput.split('-')[0]
    displayLang = languages.find(
      (language) => language.languageCode === currInput,
    ).languageName
  }

  useEffect(() => {
    if (result) {
      getDefinitions(result)
    }
  }, [result])

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    console.log('non English lang isss', nonEnglishCode)
    console.log('Uri isss', uri)
    // First, generate the vocab list given the recent conversation and output language.
    try {
      const response = await axios({
        method: 'post',
        url: `${uri}/api/generateVocab`,
        data: {
          inputLang: displayLang,
          conversation: recentConversation,
        },
      })
      const { data } = response
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }
      setResult(
        data.result
          .toLowerCase()
          .replace(/[,.]/g, '')
          .trim()
          .split(' ')
          .filter((el) => el !== ''),
      )
      setIsLoading(false)
      setSelectedWords([])
    } catch (error) {
      console.error(error)
    }
  }

  async function getDefinitions(wordArray) {
    // Next we'll use Google translate to give the definitions for each word/phrase.
    try {
      console.log('getDefinitions is using this "result": ', wordArray)
      const response = await axios({
        method: 'post',
        url: `${uri}/api/translateString`,
        data: {
          targetLang: 'en',
          // targetLang: nonEnglishCode,
          // Replace the above if you want non-English definitions in the future.
          text: wordArray,
        },
      })
      setTranslatedStrings(
        response.data.map((word) => word.toLowerCase().replace(/\./gi, '')),
      )
      console.log('Translated strings arrre', translatedStrings)
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
                  <View style={styles.vocabContainer}>
                    {result &&
                      result.map((word, index) => (
                        <View key={index} style={styles.wordContainer}>
                          <Pressable
                            onPress={() => {
                              const selected = selectedWords.includes(index)
                              setSelectedWords(
                                selected
                                  ? selectedWords.filter((i) => i !== index)
                                  : [...selectedWords, index],
                              )
                              setSessionVocab({
                                ...sessionVocab,
                                [word]: translatedStrings[index],
                              })
                            }}
                          >
                            <Text style={styles.starContainer}>
                              {selectedWords.includes(index) ? (
                                <Text style={styles.selectedVocab}>
                                  ★ {word}
                                </Text>
                              ) : (
                                <Text>☆ {word}</Text>
                              )}
                            </Text>
                            <Text style={styles.vocabDefinition}>
                              {translatedStrings[index]}
                            </Text>
                          </Pressable>
                        </View>
                      ))}
                  </View>
                  <Pressable style={styles.vocabPressable} onPress={onSubmit}>
                    <Text style={styles.vocabPressableText}>
                      Get a fresh list
                    </Text>
                  </Pressable>
                  <SaveStars
                    sessionVocab={sessionVocab}
                    language={displayLang}
                  />
                  {/* currentLang should be updated; French is dummy data */}
                </View>
              ) : (
                <View style={styles.container}>
                  <View style={styles.notYetContainer}>
                    <Text style={styles.notYet}>No vocabulary words yet.</Text>
                    <Text style={styles.notYetSubtext}>
                      {currentMessage === null
                        ? "Once you've recorded some conversation, we'll be able to suggest vocabulary for you."
                        : "Click below and we'll suggest some " +
                          displayLang +
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
  selectedVocab: {
    color: colors.brightPrimary,
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
    fontSize: 18,
    fontFamily: 'Baskerville',
    color: colors.white,
  },
  starContainer: {
    fontFamily: 'Baskerville-SemiBold',
    fontSize: 32,
    lineHeight: 42,
    color: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  vocabContainer: {
    alignContent: 'flex-start',
    paddingTop: 60,
  },
  vocabDefinition: {
    fontFamily: 'Baskerville',
    fontStyle: 'italic',
    letterSpacing: 1,
    fontSize: 24,
    color: colors.white,
    textAlign: 'left',
    paddingLeft: 40,
  },
  wordContainer: {
    marginBottom: 16,
  },
})
