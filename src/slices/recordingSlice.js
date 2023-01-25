/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  doneRecording: false,
  uri: {},
}

// ------------------------------------
// Slice
// ------------------------------------

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {},
})

export default recordingSlice.reducer

export const selectRecording = (state) => state.recording.uri
