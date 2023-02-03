import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import colors from '../../theme/colors'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigation = useNavigation()

  const handleLogin = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .then(() => {
        navigation.navigate('Details')
      })
      .catch((error) => {
        if (error.code == 'auth/invalid-email') {
          setError('Please enter a valid email')
        } else if (error.code == 'auth/user-not-found') {
          setError('User not found')
        } else if (error.code == 'auth/wrong-password') {
          setError('Incorrect password')
        }
      })
  }

  const image = {
    uri: 'https://media.istockphoto.com/id/480360610/photo/overview-of-amsterdam.jpg?s=612x612&w=0&k=20&c=tFcO0gMQLasIkG6nmtG8aw3OW6fe9F-0VQRO7_hk2xM=',
  }
  return (
    <View style={styles.root}>
      <ImageBackground resizeMode="cover" style={styles.image} source={image}>
        <Text style={styles.title}>Atocha</Text>
        <View style={styles.page}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#403e41"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#403e41"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={{ color: 'white' }}>Login</Text>
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
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBotton: 20,
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
    height: 240,
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

export default Login
