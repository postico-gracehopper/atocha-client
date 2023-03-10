import { React } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import {
  Text,
  Pressable,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native'

import colors from '../../theme/colors'
import SingleSuggestion from './SingleSuggestion'

import {
  setIsSuggestionSubmitted,
  setSuggestionGeneratedText,
  setIsTranscriptionFinal,
  setSourceLanguageOutput,
  setTargetLanguageOutput,
  setTranscribedText,
  setTranslatedText,
  setViewMode,
  setIsTeacherSubmitted,
  setTeacherGeneratedText,
  setIsTranslationFinal,
  setIsSuggestionLoading,
  setIsTeacherLoading,
  addToConversation,
  setRecordingURI,
} from '../../slices/translationSlice'
import { useAuth } from '../../../context/authContext'
import textTranslationSession from './textTranslationSession'
import host from '../../utils/host'

const Loading = ({ styles }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.brightPrimary} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

const SuggestingsView = ({ styles }) => {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()

  const {
    transcribedText,
    sourceLanguageOutput,
    targetLanguageOutput,
    suggestionGeneratedText,
    isSuggestionSubmitted,
    isSuggestionLoading,
    savedConversation,
  } = useSelector((state) => state.translation)

  const { langSource, langSourceName, langTarget, langTargetName } =
    useSelector((state) => state.languagePicker)

  async function onSubmit(event) {
    event.preventDefault()
    dispatch(setIsSuggestionLoading(true))
    dispatch(setIsSuggestionSubmitted(true))
    try {
      const response = await axios({
        method: 'post',
        url: `${host}/api/generateSuggestions`,
        data: {
          inputLang: sourceLanguageOutput,
          outputLang: targetLanguageOutput,
          conversation: savedConversation,
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
      const trimedResult = data.result.trim()
      const splitArray = trimedResult.split('%')
      let resultArray = []
      splitArray.map((item) => {
        const temp = item.split(';')
        const tempObj = { source: temp[0], target: temp[1] }
        resultArray.push(tempObj)
      })
      dispatch(setSuggestionGeneratedText(resultArray))
      dispatch(setIsSuggestionSubmitted(true))
      dispatch(setIsSuggestionLoading(false))
    } catch (error) {
      console.error(error)
    }
  }

  const onPress = async (updatedText) => {
    dispatch(setViewMode('translation-output'))
    dispatch(setTranslatedText(''))
    dispatch(setRecordingURI(''))
    dispatch(setIsTranslationFinal(false))
    dispatch(setIsTranscriptionFinal(true))
    dispatch(setTranscribedText(updatedText))
    dispatch(addToConversation(updatedText))
    dispatch(setIsTeacherSubmitted(false))
    dispatch(setIsSuggestionSubmitted(false))
    dispatch(setSuggestionGeneratedText([]))
    dispatch(setTeacherGeneratedText(''))
    dispatch(setSourceLanguageOutput(langSourceName))
    dispatch(setTargetLanguageOutput(langTargetName))
    dispatch(setIsTeacherLoading(false))
    dispatch(setIsSuggestionLoading(false))
    textTranslationSession({
      transcribedText,
      langSource,
      langTarget,
      dispatch,
      idToken: await currentUser.getIdToken(),
    })
      .then((textFromGoogle) => {
        console.log('text from google: ', textFromGoogle)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <View
      style={[styles.generatedTextActiveContainer, { borderTopLeftRadius: 20 }]}
    >
      {!isSuggestionSubmitted ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 65,
          }}
        >
          <Pressable onPress={onSubmit} style={styles.generatePressable}>
            <Text style={styles.generatePressableText}>
              Continue the conversation
            </Text>
          </Pressable>
        </View>
      ) : null}
      {isSuggestionLoading ? (
        <Loading styles={styles} />
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            {suggestionGeneratedText.map((item) => {
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
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default SuggestingsView
