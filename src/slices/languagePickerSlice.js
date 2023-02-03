import { createSlice } from '@reduxjs/toolkit'

// TODO test all the language pairs with Google
const initialState = {
  input: 'en-US',
  output: 'es-MX',
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
    swapSelectedLanguages: (state, action) => {
      ;[state.input, state.output] = [state.output, state.input]
    },
  },
})

export const { setInputLanguage, setOutputLanguage, swapSelectedLanguages } =
  languagePickerSlice.actions

export default languagePickerSlice.reducer
