import React from 'react'

import { Text, Pressable, View } from 'react-native'

const SingleSuggestion = ({ styles, onPress, sourceText, targetText }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable onPress={onPress} style={styles.suggestionPressable}>
        <Text style={styles.suggestionsText}>{sourceText}</Text>
        <Text style={styles.suggestionsText}>{targetText}</Text>
      </Pressable>
    </View>
  )
}

export default SingleSuggestion
