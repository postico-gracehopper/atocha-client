// import React from 'react'
// import { StyleSheet, Text, View, StatusBar } from 'react-native'
// import * as WebBrowser from 'expo-web-browser'
// import * as Google from 'expo-auth-session/providers/google'

// import Button from 'components/Button'
// import { colors } from 'theme'

// WebBrowser.maybeCompleteAuthSession()

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.lightGrayPurple,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// })

// export default function Login() {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//     iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//     androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//     webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//   })

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response
//     }
//   }, [response])

//   return (
//     <Button
//       disabled={!request}
//       title="Login"
//       onPress={() => {
//         promptAsync()
//       }}
//     />
//   )
// }

import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../context/authContext'
import { db, provider, auth } from '../../../firebase'
import { serverTimestamp, doc, setDoc } from 'firebase/firestore'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { TextInput } from 'react-native-gesture-handler'
import { Button, View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Home/Home'
import Details from '../Details/Details'
import Profile from '../Profile/Profile'

const Login = () => {
  const [signIn, setSignIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null)

  const { currentUser, login, signup } = useAuth()
  const myauth = getAuth()

  const Stack = createStackNavigator()

  useEffect(() => {
    //attemping to display home page when a user logs in
    if (currentUser) {
      ;<>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Settings" component={Profile} />
      </>
    }
  }, [currentUser])

  const handleClick = () => {
    setSignIn(!signIn)
  }

  const handleLogin = async () => {
    if (signIn) {
      try {
        await login(email, password)
      } catch (error) {
        setError('Incorrect Email or Password')
        console.log(error)
      }
    }
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const saveToDb = async () => {
    const user = myauth.currentUser
    const updateDb = async () => {
      await setDoc(
        doc(db, 'User', user.uid),
        {
          email,
          firstName,
          lastName,
          created: serverTimestamp(),
        },
        { merge: true },
      )
    }
    await updateDb().catch(console.error)
  }

  const handleSignUp = async () => {
    if (!signIn) {
      try {
        await signup(email, password)
      } catch (error) {
        if (password.length < 6) {
          setError('Password Needs to be at least 6 characters')
        } else if (error) {
          setError('Email already in use')
        } else {
          setError('Please Fill In All Fields')
        }
      }
    }
  }

  return (
    <View>
      <Text>Get Started</Text>
      <Button title="Sign-In" onPress={!signIn ? handleClick : null} />
      <Button title="Sign-Up" onPress={signIn ? handleClick : null} />
      <View>
        {signIn ? (
          <View>
            <TextInput
              placeholder="email"
              value={email}
              onChangeText={(e) => setEmail(e)}
              onKeyPress={handleKeypress}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(e) => setPassword(e)}
              onKeyPress={handleKeypress}
              secureTextEntry={true}
            />
            <Button title="Sign In" onPress={handleLogin} />
          </View>
        ) : (
          <View>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={(e) => setFirstName(e)}
              onKeyPress={handleKeypress}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={(e) => setLastName(e)}
              onKeyPress={handleKeypress}
            />
            <TextInput
              placeholder="email"
              value={email}
              onChangeText={(e) => setEmail(e)}
              onKeyPress={handleKeypress}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(e) => setPassword(e)}
              onKeyPress={handleKeypress}
              secureTextEntry={true}
            />
            <Button
              title="Sign Up"
              onPress={async () => {
                await handleSignUp()
                saveToDb()
              }}
            />
          </View>
        )}
      </View>
    </View>
  )
}

export default Login
