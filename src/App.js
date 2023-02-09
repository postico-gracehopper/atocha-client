import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import store from 'utils/store'
import 'utils/ignore'
import { AuthProvider } from '../context/authContext'
// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import Navigator from './navigator'

import { useDispatch } from 'react-redux'
import { getAuth, signInAnonymously } from 'firebase/auth'

const App = () => {
  const [didLoad, setDidLoad] = useState(false)

  // assets preloading
  const handleLoadAssets = async () => {
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  const user = getAuth()
  const current = user.currentUser
  const loggedIn = current !== null ? true : false

  const anonymousSignIn = () => {
    if (!loggedIn) {
      signInAnonymously(user)
        .then(() => {})
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(error)
        })
    }
  }

  useEffect(() => {
    anonymousSignIn()
    handleLoadAssets()
  }, [])

  return didLoad ? (
    <AuthProvider>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </AuthProvider>
  ) : (
    <View />
  )
}

export default App
