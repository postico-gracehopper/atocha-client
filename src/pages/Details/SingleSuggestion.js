import React from 'react'

import { Text, Pressable, View } from 'react-native'

const SingleSuggestion = ({ styles, onPress, sourceText, targetText }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
      }}
    >
      <Pressable
        onPress={() => onPress(sourceText)}
        style={styles.suggestionPressable}
      >
        <View>
          <Text style={[styles.suggestionsText, { paddingBottom: 7 }]}>
            >&nbsp;&nbsp;{sourceText}
          </Text>
        </View>
        <View>
          <Text style={styles.suggestionsTextTarget}>{targetText}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default SingleSuggestion
