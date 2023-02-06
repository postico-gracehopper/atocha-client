import { React } from 'react'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../theme/colors'

const ResetButton = ({ styles, handleReset }) => {
  return (
    <Pressable
      title="RESET TRANSLATION"
      onPress={handleReset}
      styles={styles.resetButton}
    >
      <MaterialCommunityIcons
        name="close-circle"
        size={36}
        color={colors.white}
      />
    </Pressable>
  )
}

export default ResetButton
