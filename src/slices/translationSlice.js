/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentText: null,
  isTranslationFinal: false,
}

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setCurrentText: (state, action) => {
      state.currentText = action.payload
    },
    setIsTranslationFinal: (state, action) => {
      state.isTranslationFinal = action.payload
    },
  },
})

export const selectCurrentText = (state) => state.translation.currentText

export const { setCurrentText, setIsTranslationFinal } =
  translationSlice.actions

export default translationSlice.reducer
