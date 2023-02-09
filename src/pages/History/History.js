import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
} from 'react-native'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import {
  readAsStringAsync,
  documentDirectory,
  EncodingType,
} from 'expo-file-system'
import colors from '../../theme/colors'
import SessionTile from './SessionTile'
import readAtochaFile from '../../filesystem/readAtochaFile'
import clearAtochaFile from '../../filesystem/clearAtochaFile'
import writeToAtochaFile from '../../filesystem/writeToAtochaFile'
import { useDispatch, useSelector } from 'react-redux'

const History = () => {
  let [sessions, setSessions] = useState([])
  let [_, setTrigger] = useState(Date.now())
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      readAtochaFile()
        .then((sessions) => setSessions(sessions))
        .catch((e) => {
          if (e.code === 'ERR_FILESYSTEM_CANNOT_READ_FILE') {
            writeToAtochaFile('').then(() => {
              setTimeout(() => setTrigger(Date.now()), 2000)
            })
          }
        })
    }
  }, [isFocused])

  const image = {
    uri: 'https://i.pinimg.com/564x/d9/42/60/d942607c490f0b816e5e8379b57eb91e.jpg',
  }

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.transparentOverlay} />
        {sessions && sessions.length ? (
          <FlatList
            style={{ marginTop: 50, width: '100%' }}
            data={sessions}
            renderItem={(session) => <SessionTile session={session} />}
          />
        ) : (
          <></>
        )}
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transparentOverlay: {
    backgroundColor: 'black',
    opacity: 0.82,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default History
