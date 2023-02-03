import { React } from 'react'
import { TextInput, View } from 'react-native'

import colors from '../theme/colors'

const TextEntry = ({ styles, onSubmitEditing }) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={colors.gray}
        placeholder="Enter text or record a phrase..."
        multiline={true}
        returnKeyType="done"
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  )
}

export default TextEntry
