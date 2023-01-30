/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  input: 'Spanish',
  output: 'English',
}

const targetLanguageSlice = createSlice({
  name: 'targetLanguage',
  initialState,
  reducers: {
    setInputLanguage: (state, action) => {
      state.input = action.payload
    },
    setOutputLanguage: (state, action) => {
      state.output = action.payload
    },
  },
})

export const { setInputLanguage, setOutputLanguage } =
  targetLanguageSlice.actions
export default targetLanguageSlice.reducer
