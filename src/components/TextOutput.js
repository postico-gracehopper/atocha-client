import { React } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import TextTranscriber from './TextTranscriber'
import URIPlayBack from './URIPlayBack'
import colors from '../theme/colors'

const TextOutput = ({
  styles,
  langCode,
  langName,
  text,
  isFinal,
  isSource,
}) => {
  const { recordingURI } = useSelector((state) => state.translation)

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.textOutputTag}>{langName}</Text>
        {isSource && recordingURI.length > 0 ? (
          <URIPlayBack
            color={colors.brightPrimary}
            disabled={false}
            uri={recordingURI}
          />
        ) : (
          <TextTranscriber
            text={text}
            language={langCode}
            color={colors.brightPrimary}
            disabled={!isFinal}
          />
        )}
      </View>
      {/* The below controls how much text to show before scrolling. */}
      <ScrollView
        style={{ maxHeight: 80 }}
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
