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

const TranslationViewPort = ({ styles, handleReset, handleTextSubmit }) => {
  const [generatedTextView, setGeneratedTextView] = React.useState('teacher')

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
