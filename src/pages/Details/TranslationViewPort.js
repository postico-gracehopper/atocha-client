import React from 'react'
import { useSelector } from 'react-redux'
import { View } from 'react-native'
import {
  TextEntry,
  TextOutput,
  ListeningView,
  ResetButton,
} from '../../components/'

import { colors } from 'theme'
import GenerateTextView from './GeneratedTextView'

const TranslationViewPort = ({ styles, handleReset, handleTextSubmit }) => {
  const {
    translatedText,
    transcribedText,
    isTranslationFinal,
    isTranscriptionFinal,
    sourceLanguageOutput,
    targetLanguageOutput,
    isTeacherLoading,
    isSuggestionsLoading,
    viewMode,
  } = useSelector((state) => state.translation)

  const { langSource, langTarget } = useSelector(
    (state) => state.languagePicker,
  )
  // const windowWidth = Dimensions.get('window').width
  // const windowHeight = Dimensions.get('window').height

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
        <>
          <View style={styles.textOutputContainer}>
            <View style={styles.resetButtonContainer}>
              <ResetButton
                styles={styles}
                handleReset={handleReset}
                disabled={isSuggestionsLoading || isTeacherLoading}
              />
            </View>
            {/* Input below */}
            <TextOutput
              styles={styles}
              langCode={langSource}
              langName={sourceLanguageOutput}
              text={transcribedText}
              isFinal={isTranscriptionFinal}
              isSource={true}
            />
            {/* Divider */}
            <View
              style={{
                backgroundColor: colors.gray,
                height: 1,
                marginTop: 15,
                marginBottom: 15,
              }}
            ></View>
            {/* Translated below */}
            <TextOutput
              styles={styles}
              langCode={langTarget}
              langName={targetLanguageOutput}
              text={translatedText}
              isFinal={isTranslationFinal}
              isSource={false}
            />
          </View>
          {isTranslationFinal ? <GenerateTextView styles={styles} /> : null}
        </>
      ) : null}
    </>
  )
}

export default TranslationViewPort
