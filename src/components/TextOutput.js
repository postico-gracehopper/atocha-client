import { React } from 'react'
import { Text, View, ScrollView } from 'react-native'

import TextTranscriber from './TextTranscriber'
import colors from '../theme/colors'

const TextOutput = ({ styles, langCode, langName, text, isFinal }) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.textOutputTag}>{langName}</Text>
        <TextTranscriber
          text={text}
          language={langCode}
          color={colors.white}
          disabled={!isFinal}
        />
      </View>
      {/* The below controls how much text to show before scrolling. */}
      <ScrollView
        style={{ maxHeight: 70 }}
        showsVerticalScrollIndicator={false}
      >
        {isFinal ? (
          <Text style={styles.finalText}>{text}</Text>
        ) : (
          <Text style={styles.partialText}>{text}</Text>
        )}
      </ScrollView>
    </>
  )
}

export default TextOutput
