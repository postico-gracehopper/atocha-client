import { React } from 'react'
import { Text, View } from 'react-native'

import TextTranscriber from './TextTranscriber'
import colors from '../theme/colors'

const TextOutput = ({ styles, langCode, langName, text, isFinal }) => {
  return (
    <View style={styles.textOutputContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.textOutputTag}>{langName}</Text>
        <TextTranscriber
          text={text}
          language={langCode}
          color={colors.white}
          disabled={!isFinal}
        />
      </View>
      {isFinal ? (
        <Text style={styles.finalText}>{text}</Text>
      ) : (
        <Text style={styles.partialText}>{text}</Text>
      )}
    </View>
  )
}

export default TextOutput
