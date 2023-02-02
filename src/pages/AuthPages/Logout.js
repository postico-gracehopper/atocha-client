import { getAuth, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Logout = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  return (
    <Button
      title="Log Out"
      onPress={() => {
        auth
          .signOut()
          .then(() => {
            console.log('Sign-out successful')
          })
          .then(() => {
            navigation.navigate('Login2')
          })
          .catch((error) => {
            console.log('Error signing out', error)
          })
      }}
    />
  )
}

export default Logout
