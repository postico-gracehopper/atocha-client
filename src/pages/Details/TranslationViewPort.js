import { React } from 'react'
import { useSelector } from 'react-redux'
import { View, Dimensions } from 'react-native'
import { TextEntry, TextOutput, ListeningView } from '../../components/'

import { colors } from 'theme'

const TranslationViewPort = ({
  styles,
  viewMode,

  handleReset,
  handleTextSubmit,
}) => {
  const translatedText = useSelector(
    (state) => state.translation.translatedText,
  )
  const transcribedText = useSelector(
    (state) => state.translation.transcribedText,
  )
  const isTranslationFinal = useSelector(
    (state) => state.translation.isTranslationFinal,
  )
  const isTranscriptionFinal = useSelector(
    (state) => state.translation.isTranscriptionFinal,
  )
  const sourceLanguageOutput = useSelector(
    (state) => state.translation.sourceLanguageOutput,
  )
  const targetLanguageOutput = useSelector(
    (state) => state.translation.targetLanguageOutput,
  )
  const langSource = useSelector((state) => state.languagePicker.input)
  const langTarget = useSelector((state) => state.languagePicker.output)

  const windowWidth = Dimensions.get('window').width

  return (
    <>
      {viewMode === 'text-input' ? (
        <TextEntry
          styles={styles}
          onSubmitEditing={handleTextSubmit}
          handleReset={handleReset}
          langCode={langSource}
        />
      ) : null}
      {viewMode === 'audio-input' ? (
        <ListeningView
          styles={styles}
          langCode={langSource}
          handleReset={handleReset}
        />
      ) : null}
      {viewMode === 'translation-output' ? (
        <View style={styles.textOutputContainer}>
          {isTranscriptionFinal ? (
            <TextOutput
              styles={styles}
              langCode={langSource}
              langName={sourceLanguageOutput}
              text={transcribedText}
              isFinal={isTranscriptionFinal}
            />
          ) : null}
          {isTranslationFinal ? (
            <>
              <View
                style={{
                  backgroundColor: colors.gray,
                  height: 1,
                  width: windowWidth * 0.9,
                  marginTop: 15,
                  marginBottom: 15,
                }}
              ></View>
              <TextOutput
                styles={styles}
                langCode={langTarget}
                langName={targetLanguageOutput}
                text={translatedText}
                isFinal={isTranslationFinal}
              />
            </>
          ) : null}
        </View>
      ) : null}
    </>
  )
}

export default TranslationViewPort
