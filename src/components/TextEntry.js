import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextInput, View } from 'react-native'

import colors from '../theme/colors'
import languages from '../pages/SelectLanguage/languageList'
import { setTranscribedText } from '../slices/translationSlice'

const TextEntry = ({ styles, onSubmitEditing, langCode }) => {
  const dispatch = useDispatch()

  const transcribedText = useSelector(
    (state) => state.translation.transcribedText,
  )

  const handleChangeText = (transcribedText) => {
    dispatch(setTranscribedText(transcribedText))
  }

  const promptString = languages.filter(
    (language) => language.languageCode === langCode,
  )[0].promptString

  return (
    <View style={styles.textInputContainer}>
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
    </View>
  )
}

export default TextEntry
