import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, Dimensions, Pressable, Text } from 'react-native'
import {
  TextEntry,
  TextOutput,
  ListeningView,
  ResetButton,
} from '../../components/'

import { colors } from 'theme'
import TeacherView from './TeacherView'
import SuggestingsView from './SuggestionsView'

const TranslationViewPort = ({
  styles,
  viewMode,
  handleReset,
  handleTextSubmit,
}) => {
  const [generatedTextView, setGeneratedTextView] = React.useState('teacher')

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
              <ResetButton styles={styles} handleReset={handleReset} />
            </View>
            <TextOutput
              styles={styles}
              langCode={langSource}
              langName={sourceLanguageOutput}
              text={transcribedText}
              isFinal={isTranscriptionFinal}
            />
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
          </View>
          {isTranslationFinal ? (
            <View style={styles.generatedTextContainer}>
              <View style={styles.generatedTextHeader}>
                <Pressable
                  style={
                    generatedTextView === 'teacher'
                      ? styles.generatedTextHeaderActive
                      : styles.generatedTextHeaderInactive
                  }
                  disabled={generatedTextView === 'teacher'}
                  onPress={() => {
                    setGeneratedTextView('teacher')
                  }}
                >
                  <Text style={styles.generatedTextHeaderText}>Teacher</Text>
                  <Text style={styles.generatedTextHeaderText}>
                    explanation
                  </Text>
                </Pressable>
                <Pressable
                  style={
                    generatedTextView === 'recommendations'
                      ? styles.generatedTextHeaderActive
                      : styles.generatedTextHeaderInactive
                  }
                  disabled={generatedTextView === 'recommendations'}
                  onPress={() => {
                    setGeneratedTextView('recommendations')
                  }}
                >
                  <Text style={styles.generatedTextHeaderText}>Suggested</Text>
                  <Text style={styles.generatedTextHeaderText}>responses</Text>
                </Pressable>
              </View>
              {generatedTextView === 'teacher' ? (
                <TeacherView styles={styles} />
              ) : null}
              {generatedTextView === 'recommendations' ? (
                <SuggestingsView styles={styles} />
              ) : null}
            </View>
          ) : null}
        </>
      ) : null}
    </>
  )
}

export default TranslationViewPort
