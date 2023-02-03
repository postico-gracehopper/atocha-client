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

  const auth = getAuth()
  const navigation = useNavigation()
  const { currentUser } = useAuth()

  const user = auth.currentUser

  const saveToDb = async () => {
    const userId = user.uid
    const updateDb = async () => {
      await setDoc(
        doc(db, 'User', userId),
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

  //   function writeUserData(userId, userName, email) {
  //     const db = getDatabase()
  //     set(ref(db, '/User', userId), {
  //       userName: userName,
  //       email: email,
  //     })
  //     console.log('database updated')
  //   }

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

  const image = {
    uri: 'https://theworldpursuit.com/wp-content/uploads/2021/10/Grindelwald-switzerland.jpeg',
  }

  return (
    <View style={styles.root}>
      <ImageBackground resizeMode="cover" style={styles.image} source={image}>
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
            style={styles.loginBtn}
            onPress={async () => {
              await onSignUpPress()
              saveToDb()
              //writeUserData(userId, userName, email)
              updateUserName()
            }}
          >
            <Text style={{ color: 'white' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  loginBtn: {
    width: 200,
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
    alignItems: 'center',
    marginTop: 200,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: colors.lightGrayPurple,
  },
})

export default SignUp
