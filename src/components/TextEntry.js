import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, TextInput, View } from 'react-native'

import colors from '../theme/colors'
import languages from '../pages/SelectLanguage/languageList'
import { setTranscribedText } from '../slices/translationSlice'
import ResetButton from './ResetButton'

const TextEntry = ({ styles, onSubmitEditing, langCode, handleReset }) => {
  const dispatch = useDispatch()

  const { transcribedText, isTeacherLoading, isSuggestionLoading } =
    useSelector((state) => state.translation)

  const handleChangeText = (transcribedText) => {
    dispatch(setTranscribedText(transcribedText))
  }

  const promptString = languages.filter(
    (language) => language.languageCode === langCode,
  )[0].promptString

  return (
    <View style={styles.textInputContainer}>
      <View style={styles.resetButtonContainer}>
        <ResetButton
          styles={styles}
          handleReset={handleReset}
          disabled={isSuggestionLoading || isTeacherLoading}
        />
      </View>
      <ScrollView>
        <TextInput
          value={transcribedText}
          style={styles.textInput}
          placeholderTextColor={colors.gray}
          placeholder={promptString}
          multiline={true}
          returnKeyType="done"
          onChangeText={handleChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      </ScrollView>
    </View>
  )
}

export default TextEntry
