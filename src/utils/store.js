import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import appReducer from 'slices/app.slice'
import recordingReducer from 'slices/recordingSlice'
import targetLanguageReducer from 'slices/targetLanguageSlice'

const rootReducer = combineReducers({
  app: appReducer,
  recording: recordingReducer,
  targetLanguage: targetLanguageReducer,
  // add more reducers
})

const defaultMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
})

const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line no-undef
  middleware: __DEV__ ? defaultMiddleware.concat(logger) : defaultMiddleware,
})

export default store
