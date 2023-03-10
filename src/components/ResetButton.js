import { React } from 'react'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../theme/colors'

const ResetButton = ({ styles, handleReset, disabled }) => {
  return (
    <Pressable
      title="RESET TRANSLATION"
      onPress={handleReset}
      styles={styles.resetButton}
      disabled={disabled}
    >
      <MaterialCommunityIcons
        name="close-circle"
        size={24}
        color={colors.gray}
      />
    </Pressable>
  )
}

export default ResetButton
