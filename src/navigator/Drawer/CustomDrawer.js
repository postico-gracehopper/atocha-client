import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import colors from '../../theme/colors'
import { ImageBackground, Image } from 'react-native'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

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

  useEffect(() => {
    if (current) {
      current.displayName ? setDisplayName(current.displayName) : null
      current.displayName ? setLoggedIn(true) : setLoggedIn(false)
    }
  }, [current])

  return (
    <View style={styles.root}>
      <ImageBackground
        resizeMode="cover"
        source={backgroundImage}
        style={styles.image}
      >
        <View style={styles.transparentOverlay} />
        <DrawerContentScrollView {...props}>
          {loggedIn ? (
            <>
              {/* <Image
                source={profileDefault}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  marginBottom: 10,
                }}
              ></Image> */}
              <View style={styles.loggedOutWelcome}>
                <Text style={styles.subText}> Welcome, </Text>
                <Text style={styles.arsilonText}> {displayName} </Text>
              </View>
            </>
          ) : (
            <View style={styles.loggedOutWelcome}>
              <Text style={styles.arsilonText}> Welcome! </Text>
            </View>
          )}
          <View style={{ flex: 1, paddingTop: 10 }}>
            <DrawerItemList
              {...props}
              labelStyle={{
                marginLeft: -25,
                fontFamily: 'Cochin',
                fontSize: 32,
                color: colors.white,
              }}
            />
          </View>
        </DrawerContentScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  subText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    alignSelf: 'flex-start',
    borderRadius: 10,
    overflow: 'hidden',
  },
  arsilonText: {
    color: colors.white,
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: 'arsilon',
    alignSelf: 'flex-start',
    borderRadius: 10,
    overflow: 'hidden',
  },
  loggedOutWelcome: {
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  transparentOverlay: {
    backgroundColor: 'black',
    opacity: 0.85,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default CustomDrawer
