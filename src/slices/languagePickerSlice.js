import { createSlice } from '@reduxjs/toolkit'

// TODO test all the language pairs with Google
const initialState = {
  input: 'en-US',
  output: 'es-MX',
  inputString: 'English',
  outputString: 'Spanish',
}

const languagePickerSlice = createSlice({
  name: 'languagePicker',
  initialState,
  reducers: {
    setInputLanguage: (state, action) => {
      state.input = action.payload
    },
    setOutputLanguage: (state, action) => {
      state.output = action.payload
    },
    setInputLanguageString: (state, action) => {
      state.inputString = action.payload
    },
    setOutputLanguageString: (state, action) => {
      state.outputString = action.payload
    },
    swapSelectedLanguages: (state, action) => {
      ;[state.input, state.output] = [state.output, state.input]
      ;[state.inputString, state.outputString] = [
        state.outputString,
        state.inputString,
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
