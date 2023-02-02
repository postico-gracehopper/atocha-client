import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { serverTimestamp, doc, setDoc } from 'firebase/firestore'
import { useAuth } from '../../../context/authContext'
import { db } from '../../../firebase'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  const auth = getAuth()
  const navigation = useNavigation()
  const { currentUser } = useAuth()
  const user = auth.currentUser

  const saveToDb = async () => {
    const updateDb = async () => {
      await setDoc(
        doc(db, 'User', user.uid),
        {
          email,
          userName,
          created: serverTimestamp(),
        },
        { merge: true },
      )
    }
    await updateDb().catch(console.error)
  }

  const updateUserName = () => {
    updateProfile(user, {
      displayName: userName,
    })
      .then(() => {
        console.log('Profile updated')
        console.log(user.displayName)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onSignUpPress = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('SUCCESS', user)
      })
      .then(() => {
        navigation.navigate('Details')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error)
      })
  }

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Username"
        onChangeText={(text) => setUserName(text)}
        value={userName}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        secureTextEntry={false}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        onPress={async () => {
          await onSignUpPress()
          saveToDb()
          updateUserName()
        }}
      />
    </View>
  )
}

export default SignUp
