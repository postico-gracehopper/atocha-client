/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  currentText: null,
  isTranslationFinal: false,
}

// Don't forget to add authorization header
// in your post request below if we implement that.
// export const submitRecordingAsync = createAsyncThunk(
//   'POST recording',
//   async (URI) => {
//     const { data } = await axios.post(
//       'http://localhost:3000/api/translate',
//       URI,
//     )
//     return data
//   },
// )

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    setCurrentText: (state, action) => {
      state.currentText = action.payload
    },
    setIsTranslationFinal: (state, action) => {
      state.isTranslationFinal = action.payload
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(submitRecordingAsync.fulfilled, (state, action) => {
  //     console.log('In extraReducer/fulfilled :) ', action.payload.textResponse)
  //     state.currentText = action.payload.textResponse
  //   })
  // },
})

export const selectCurrentText = (state) => state.recording.currentText

export const { setCurrentText, setIsTranslationFinal } = recordingSlice.actions

export default recordingSlice.reducer
