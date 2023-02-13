import { useState, React } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native'
import { getAuth } from 'firebase/auth'

import colors from '../../theme/colors'
import GetVocab from './GetVocab'

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.brightPrimary} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

export default function Phrasebook() {
  const user = getAuth()
  const [isLoading, setIsLoading] = useState(false)

  const image = {
    uri: 'https://images.unsplash.com/photo-1573455494057-12684d151bf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1862&q=80',
  }

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.transparentOverlay} />
        <View style={styles.wrapper}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <View style={styles.container}>
                <Text style={styles.notYet}>Phrasebook</Text>
                <GetVocab />
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    marginTop: 20,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    zIndex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.white,
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
  wordContainer: {
    marginBottom: 16,
  },
})
