import { getAuth, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import Login from './Login'
import { createStackNavigator } from '@react-navigation/stack'
import { Button } from 'react-native'

const Logout = () => {
  const auth = getAuth()
  const [logOut, setLogout] = useState(false)

  const Stack = createStackNavigator()

  useEffect(() => {
    if (logOut) {
      ;<>
        <Stack.Screen name="Login" component={Login} />
      </>
    }
  }, [logOut])

  return (
    <Button
      title="Log Out"
      onPress={() => {
        auth
          .signOut()
          .then(() => {
            console.log('Sign-out successful')
          })
          .catch((error) => {
            console.log('Error signing out', error)
          })
      }}
    />
  )
}

export default Logout
