/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  input: 'English',
}

const targetLanguageSlice = createSlice({
  name: 'targetLanguage',
  initialState,
  reducers: {
    setTargetLanguage: (state, action) => {
      state.lang = action.payload
    },
  },
})

export const { setTargetLanguage } = targetLanguageSlice.actions
export const selectLang = (state) => state.targetLanguage.lang
export default targetLanguageSlice.reducer
