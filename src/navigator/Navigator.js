import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { authenticate } from 'slices/app.slice'
import { LoggedNav, LoginNav } from './Drawer'
import { auth } from '../../firebase'

const Navigator = () => {
  const { checked, loggedIn } = useSelector((state) => state.app)
  const [logged, setLogged] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate({ loggedIn: true, checked: true }))
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        if (currentUser.email == undefined) {
          setLogged(false)
          console.log('Navigator false! Current user is', currentUser)
        } else {
          setLogged(true)
          console.log('Navigator true! Current user is', currentUser)
        }
      } else setLogged(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  return checked ? (
    <NavigationContainer>
      {logged ? <LoggedNav /> : <LoginNav />}
    </NavigationContainer>
  ) : (
    <Text>Loading...</Text>
  )
}

export default Navigator
