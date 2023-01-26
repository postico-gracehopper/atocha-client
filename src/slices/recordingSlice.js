/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  currentText: null,
}

// Don't forget to add authorization header
// in your post request below if we implement that.
export const submitRecordingAsync = createAsyncThunk(
  'POST recording',
  async (URI) => {
    const { data } = await axios.post(
      'http://localhost:3000/api/translate',
      URI,
    )
    return data
  },
)

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitRecordingAsync.fulfilled, (state, action) => {
      console.log('In extraReducer/fulfilled :) ', action.payload.textResponse)
      state.currentText = action.payload.textResponse
    })
  },
})

export const selectCurrentText = (state) => {
  return state.recording.currentText
}

export default recordingSlice.reducer
