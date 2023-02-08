import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import colors from '../../theme/colors'
import { ImageBackground, Image } from 'react-native'
import { getAuth, signInAnonymously, signOut } from 'firebase/auth'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const backgroundImage = {
  uri: 'https://www.state.gov/wp-content/uploads/2018/11/Germany-2109x1406.jpg',
}

const profileDefault = {
  uri: 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
}

const CustomDrawer = (props) => {
  const [displayName, setDisplayName] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const user = getAuth()
  const current = user.currentUser
  //   const navigation = useNavigation()

  //   const anonymousSignIn = () => {
  //     console.log('IN ANONYMOUS SIGN IN')
  //     signInAnonymously(user)
  //       .then(() => {})
  //       .catch((error) => {
  //         const errorCode = error.code
  //         const errorMessage = error.message
  //         console.log(error)
  //       })
  //   }

  useEffect(() => {
    if (current) {
      current.displayName ? setDisplayName(current.displayName) : null
      current.displayName ? setLoggedIn(true) : setLoggedIn(false)
    }
  }, [current])

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: 'white' }}
      >
        <ImageBackground
          resizeMode="cover"
          source={backgroundImage}
          style={{ padding: 20 }}
        >
          <Image
            source={profileDefault}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          ></Image>
          {loggedIn ? (
            <Text style={styles.userInfo}> Welcome {displayName}! </Text>
          ) : (
            <Text> Welcome!</Text>
          )}
        </ImageBackground>
        <View style={{ flex: 1, paddingTop: 10 }}>
          <DrawerItemList
            {...props}
            activeBackgroundColor={colors.primary}
            activeTintColor="white"
            inactiveTintColor={colors.primary}
            labelStyle={{ marginLeft: -25, fontFamily: 'Cochin', fontSize: 16 }}
          />
        </View>
      </DrawerContentScrollView>
      {/* <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: colors.primary,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            user
              .signOut()
              .then(() => {
                setDisplayName('')
                console.log('Sign-out successful')
              })
              .then(() => {
                anonymousSignIn()
              })
              .then(() => {
                navigation.navigate('Detials')
              })
              .catch((error) => {
                console.log('Error signing out', error)
              })
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="log-out-outline" size={22} color={colors.primary} />
            <Text
              style={{
                fontFamily: 'Cochin',
                fontSize: 16,
                color: colors.primary,
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity> */}
      {/* </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  userInfo: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'flex-start',
    borderRadius: 10,
    overflow: 'hidden',
  },
})

export default CustomDrawer
