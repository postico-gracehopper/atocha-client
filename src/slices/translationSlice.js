/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  translatedText: '',
  transcribedText: '',
  isTranslationFinal: false,
  isTranscriptionFinal: false,
  sourceLanguageOutput: '',
  targetLanguageOutput: '',
  teacherGeneratedText: '',
  isTeacherSubmitted: false,
  isTeacherLoading: false,
  suggestionGeneratedText: [],
  savedConversation: '',
  isSuggestionSubmitted: false,
  isSuggestionLoading: false,
  viewMode: 'text-input',
  recordingURI: '',
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
    setRecordingURI: (state, action) => {
      state.recordingURI = action.payload
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
      state.teacherGeneratedText = action.payload
    },
    setIsTeacherSubmitted: (state, action) => {
      state.isTeacherSubmitted = action.payload
    },
    setIsTeacherLoading: (state, action) => {
      state.isTeacherLoading = action.payload
    },
    setSuggestionGeneratedText: (state, action) => {
      state.suggestionGeneratedText = action.payload
    },
    setSavedConversation: (state, action) => {
      state.savedConversation = action.payload
    },
    addToConversation: (state, action) => {
      if (state.savedConversation === '')
        state.savedConversation = action.payload
      else
        state.savedConversation =
          state.savedConversation + '; ' + action.payload
    },
    setIsSuggestionSubmitted: (state, action) => {
      state.isSuggestionSubmitted = action.payload
    },
    setIsSuggestionLoading: (state, action) => {
      state.isSuggestionLoading = action.payload
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
    resetTranslationSession: (state, action) => {
      state.translatedText = ''
      state.transcribedText = ''
      state.recordingURI = ''
      state.isTranslationFinal = false
      state.isTranscriptionFinal = false
      state.sourceLanguageOutput = ''
      state.targetLanguageOutput = ''
      state.teacherGeneratedText = ''
      state.isTeacherSubmitted = false
      state.isTeacherLoading = false
      state.suggestionGeneratedText = []
      state.savedConversation = ''
      state.isSuggestionSubmitted = false
      state.isSuggestionLoading = false
    },
  },
})

export const selectSessionObject = (state) => {
  return {
    sourceTranscription: state.translation.transcribedText,
    targetTranscription: state.translation.translatedText,
  }
}

export const {
  setTranslatedText,
  setTranscribedText,
  setRecordingURI,
  setIsTranslationFinal,
  setIsTranscriptionFinal,
  setSourceLanguageOutput,
  setTargetLanguageOutput,
  setTeacherGeneratedText,
  setIsTeacherSubmitted,
  setSuggestionGeneratedText,
  setIsSuggestionSubmitted,
  setIsSuggestionLoading,
  setIsTeacherLoading,
  setViewMode,
  addToConversation,
  setSavedConversation,
  resetTranslationSession,
} = translationSlice.actions

export default translationSlice.reducer
