import { getAuth, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { Button, View, ImageBackground, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import colors from '../../theme/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Logout = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  const image = {
    uri: 'https://media4.giphy.com/media/zZQe7wglGKCEE/giphy.gif',
  }

  return (
    <View style={styles.root}>
      <ImageBackground resizeMode="cover" style={styles.image} source={image}>
        <View>
          <TouchableOpacity
            style={styles.logoutBtn}
            title="Log Out"
            onPress={() => {
              auth
                .signOut()
                .then(() => {
                  console.log('Sign-out successful')
                })
                .then(() => {
                  navigation.navigate('Login')
                })
                .catch((error) => {
                  console.log('Error signing out', error)
                })
            }}
          >
            <Text style={{ color: 'white' }}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>See You Soon!</Text>
          <Text style={styles.text}>¡Te veo pronto!</Text>
          <Text style={styles.text}>再见！</Text>
          <Text style={styles.text}>जल्द ही फिर मिलेंगे!</Text>
          <Text style={styles.text}>A presto!</Text>
          <Text style={styles.text}>vejo você em breve!</Text>
          <Text style={styles.text}>seh dich später!</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'arsilon',
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 60,
  },
  logoutBtn: {
    width: 200,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: colors.primary,
    marginTop: 300,
  },
  page: {
    width: 200,
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
})

export default Logout