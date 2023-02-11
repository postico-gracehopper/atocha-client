import React from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import colors from '../../theme/colors'

export default function LoggedOutPhrasebook(props) {
  const image = {
    uri: 'https://images.unsplash.com/photo-1573455494057-12684d151bf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1862&q=80',
  }
  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.transparentOverlay} />
        <View style={styles.wrapper}>
          <View style={styles.notYetContainer}>
            <Text style={styles.notYet}>Hold on...</Text>
            <Text style={styles.notYetSubtext}>
              You'll need to be logged in to save words to your Phrasebook.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notYet: {
    marginTop: 50,
    marginBottom: 30,
    paddingTop: 40,
    paddingLeft: 10,
    fontSize: 80,
    lineHeight: 70,
    fontFamily: 'arsilon',
    color: colors.white,
    zIndex: 1,
  },
  notYetContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  notYetSubtext: {
    marginTop: 10,
    fontSize: 26,
    fontFamily: 'lora',
    color: colors.white,
    paddingHorizontal: 30,
  },
  root: {
    flex: 1,
    flexDirection: 'column',
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
})
