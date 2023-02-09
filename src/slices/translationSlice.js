/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  translatedText: null,
  transcribedText: null,
  isTranslationFinal: false,
  isTranscriptionFinal: false,
  sourceLanguageOutput: '',
  targetLanguageOutput: '',
  teacherGeneratedText: null,
  suggestionGeneratedText: null,
}

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setTranslatedText: (state, action) => {
      state.translatedText = action.payload
    },
    setTranscribedText: (state, action) => {
      state.transcribedText = action.payload
    },
    setIsTranslationFinal: (state, action) => {
      state.isTranslationFinal = action.payload
    },
    setIsTranscriptionFinal: (state, action) => {
      state.isTranscriptionFinal = action.payload
    },
    setSourceLanguageOutput: (state, action) => {
      state.sourceLanguageOutput = action.payload
    },
    setTargetLanguageOutput: (state, action) => {
      state.targetLanguageOutput = action.payload
    },
    setTeacherGeneratedText: (state, action) => {
      state.sourceLanguageOutput = action.payload
    },
    setSuggestionGeneratedText: (state, action) => {
      state.targetLanguageOutput = action.payload
    },
  },
})

export const selectCurrentText = (state) => state.translation.currentText // TODO delete this

export const selectSessionObject = (state) => {
  return {
    sourceTranscription: state.translation.transcribedText,
    targetTranscription: state.translation.translatedText,
  }
}

export const {
  setTranslatedText,
  setTranscribedText,
  setIsTranslationFinal,
  setIsTranscriptionFinal,
  setSourceLanguageOutput,
  setTargetLanguageOutput,
  setTeacherGeneratedText,
  setSuggestionGeneratedText,
} = translationSlice.actions

export default translationSlice.reducer
