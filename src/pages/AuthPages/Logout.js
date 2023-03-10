import { getAuth, signOut, signInAnonymously } from 'firebase/auth'
import { View, ImageBackground, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import colors from '../../theme/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Logout = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  const image = {
    uri: 'https://media4.giphy.com/media/zZQe7wglGKCEE/giphy.gif',
  }

  const anonymousSignIn = () => {
    signInAnonymously(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.root}>
      <ImageBackground resizeMode="cover" style={styles.image} source={image}>
        <View style={styles.transparentOverlay}>
          <View style={{ position: 'relative', zIndex: '1' }}>
            <TouchableOpacity
              style={styles.vocabPressable}
              title="Log Out"
              onPress={() => {
                auth
                  .signOut()
                  .then(() => {
                    console.log('Sign-out successful')
                  })
                  .then(() => {
                    anonymousSignIn()
                  })
                  .then(() => {
                    navigation.navigate('Home')
                  })
                  .catch((error) => {
                    console.log('Error signing out', error)
                  })
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'lora',
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>¡Te veo pronto!</Text>
            <Text style={styles.text}>再见！</Text>
            <Text style={styles.text}>जल्द ही फिर मिलेंगे!</Text>
            <Text style={styles.text}>See You Soon!</Text>
            <Text style={styles.text}>A presto!</Text>
            <Text style={styles.text}>vejo você em breve!</Text>
            <Text style={styles.text}>seh dich später!</Text>
            <Text style={styles.text}>до скорой встречи!</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  textWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'arsilon',
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 60,
    textAlign: 'center',
  },
  logoutBtn: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: colors.primary,
    marginTop: 300,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 4,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 7,
    shadowRadius: 3,
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
  vocabPressable: {
    marginTop: 400,
    width: 150,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.brightPrimary,
    opacity: 1.0,
    fontSize: 18,
    fontFamily: 'Baskerville',
    color: colors.white,
  },
  transparentOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default Logout
