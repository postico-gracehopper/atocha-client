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
        console.log('SUCCESS', user)
      })
      .then(() => {
        navigation.navigate('Details')
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
        <Text style={styles.title}>Atocha</Text>
        <View style={styles.page}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#403e41"
            onChangeText={(text) => setUserName(text)}
            value={userName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#403e41"
            onChangeText={(text) => setEmail(text)}
            value={email}
            secureTextEntry={false}
          />
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
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={async () => {
              await onSignUpPress()
              //writeUserData(userId, userName, email)
              updateUserName()
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
    marginTop: 40,
    fontFamily: 'arsilon',
    color: colors.primary,
    fontSize: 80,
  },
  signOutBtn: {
    width: 150,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    color: 'white',
    backgroundColor: colors.primary,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    height: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    color: colors.primary,
  },
  page: {
    width: 200,
    height: 350,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 25,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: colors.lightGrayPurple,
  },
  error: {
    marginTop: 10,
    borderRadius: 20,
    color: colors.primary,
    fontSize: 16,
  },
})

export default SignUp
