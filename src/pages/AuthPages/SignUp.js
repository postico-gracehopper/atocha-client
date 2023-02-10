import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import { serverTimestamp, doc, setDoc } from 'firebase/firestore'
import { useAuth } from '../../../context/authContext'
import { db } from '../../../firebase'
import colors from '../../theme/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getDatabase, ref, set } from 'firebase/database'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [error, setError] = useState(null)
  const auth = getAuth()
  const navigation = useNavigation()

  const saveToDb = async (uid) => {
    const updateDb = async () => {
      await setDoc(
        doc(db, 'User', uid),
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
    updateProfile(auth.currentUser, {
      displayName: userName,
    })
      .then(() => {
        console.log('Profile updated')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onSignUpPress = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        saveToDb(user.uid)
        updateUserName()
        console.log('SUCCESS', user)
      })
      .then(setEmail(''), setUserName(''), setPassword(''))
      .then(() => {
        navigation.navigate('Home')
      })
      .catch((error) => {
        setError(error.code.split('/')[1].split('-').join(' '))
        if (error.code.includes('internal-error')) {
          setError('Please fill out all fields!')
        } else if (error.code.includes('weak-password')) {
          setError('password must be at least 6 characters!')
        }
      })
  }

  const image = {
    uri: 'https://theworldpursuit.com/wp-content/uploads/2021/10/Grindelwald-switzerland.jpeg',
  }

  return (
    <View style={styles.root}>
      <ImageBackground resizeMode="cover" style={styles.image} source={image}>
        <View style={styles.transparentOverlay} />
        <Text style={styles.title}>Sign up</Text>
        <View
          style={
            !emailError && password.length < 6 && error !== null
              ? styles.pageErrors
              : styles.page
          }
        >
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#403e41"
            onChangeText={(text) => {
              setUserName(text)
            }}
            value={userName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#403e41"
            onChangeText={(text) => {
              setEmail(text)
              setEmailError(/\S+@\S+\.\S+/.test(text))
            }}
            value={email}
            secureTextEntry={false}
          />
          {emailError ? null : <Text>Valid email required</Text>}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#403e41"
            onChangeText={(text) => {
              setPassword(text)
            }}
            value={password}
            secureTextEntry
          />
          {password.length < 6 ? (
            <Text style={{ textAlign: 'center' }}>
              Password must be at least 6 characters
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={async () => {
              await onSignUpPress()
            }}
          >
            <Text style={{ color: 'white' }}>Sign Up</Text>
          </TouchableOpacity>
          {error !== null ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 150,
    fontFamily: 'arsilon',
    color: colors.white,
    fontSize: 100,
  },
  signOutBtn: {
    width: '90%',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: colors.primary,
  },
  input: {
    backgroundColor: colors.ecru,
    width: '90%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    height: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    width: 300,
    height: 200,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 25,
  },
  pageErrors: {
    width: 200,
    height: 400,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 25,
  },
  error: {
    marginTop: 10,
    borderRadius: 20,
    color: colors.primary,
    fontSize: 16,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: colors.lightGrayPurple,
  },
  transparentOverlay: {
    backgroundColor: 'black',
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  error: {
    marginTop: 10,
    borderRadius: 20,
    color: colors.primary,
    fontSize: 16,
  },
})

export default SignUp
