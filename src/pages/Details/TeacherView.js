import { useState, React } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useAuth } from '../../../context/authContext'
import {
  Text,
  Pressable,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native'

import colors from '../../theme/colors'
import host from '../../utils/host'

import {
  setTeacherGeneratedText,
  setIsTeacherSubmitted,
  setIsTeacherLoading,
} from '../../slices/translationSlice'

const Loading = ({ styles }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

const TeacherView = ({ styles }) => {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()

  const {
    translatedText,
    sourceLanguageOutput,
    targetLanguageOutput,
    teacherGeneratedText,
    isTeacherSubmitted,
    isTeacherLoading,
  } = useSelector((state) => state.translation)

  async function onSubmit(event) {
    event.preventDefault()
    dispatch(setIsTeacherLoading(true))
    dispatch(setIsTeacherSubmitted(true))
    try {
      const response = await axios({
        method: 'post',
        url: `${host}/api/generateTeacher`,
        data: {
          inputLang: sourceLanguageOutput,
          outputLang: targetLanguageOutput,
          conversation: translatedText,
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
      dispatch(setTeacherGeneratedText(trimedResult))
      dispatch(setIsTeacherLoading(false))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View
      style={[
        styles.generatedTextActiveContainer,
        { borderTopRightRadius: 20 },
      ]}
    >
      {!isTeacherSubmitted ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 65,
          }}
        >
          <Pressable onPress={onSubmit} style={styles.generatePressable}>
            <Text style={styles.generatePressableText}>Ask the teacher</Text>
          </Pressable>
        </View>
      ) : null}
      {isTeacherLoading ? (
        <Loading styles={styles} />
      ) : (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.teacherText}>{teacherGeneratedText}</Text>
        </ScrollView>
      )}
    </View>
  )
}

export default TeacherView
