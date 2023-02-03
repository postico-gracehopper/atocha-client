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
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error)
      })
  }

  const image = {
    uri: 'https://media.istockphoto.com/id/480360610/photo/overview-of-amsterdam.jpg?s=612x612&w=0&k=20&c=tFcO0gMQLasIkG6nmtG8aw3OW6fe9F-0VQRO7_hk2xM=',
  }
  return (
    <View style={styles.root}>
      <ImageBackground resizeMode="cover" style={styles.image} source={image}>
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
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  loginBtn: {
    width: '80%',
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

export default Login
