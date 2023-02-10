import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  langSource: 'en-US',
  langTarget: 'es-MX',
  langSourceName: 'English',
  langTargetName: 'Spanish',
}

const languagePickerSlice = createSlice({
  name: 'languagePicker',
  initialState,
  reducers: {
    setInputLanguage: (state, action) => {
      state.langSource = action.payload
    },
    setOutputLanguage: (state, action) => {
      state.langTarget = action.payload
    },
    setInputLanguageString: (state, action) => {
      state.langSourceName = action.payload
    },
    setOutputLanguageString: (state, action) => {
      state.langTargetName = action.payload
    },
    swapSelectedLanguages: (state, action) => {
      ;[state.langSource, state.langTarget] = [
        state.langTarget,
        state.langSource,
      ]
      ;[state.langSourceName, state.langTargetName] = [
        state.langTargetName,
        state.langSourceName,
      ]
    },
  },
})

export const {
  setInputLanguage,
  setOutputLanguage,
  swapSelectedLanguages,
  setInputLanguageString,
  setOutputLanguageString,
} = languagePickerSlice.actions

export default languagePickerSlice.reducer
