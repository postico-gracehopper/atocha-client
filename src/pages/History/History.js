import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
  SafeAreaView,
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
import { Picker } from '@react-native-picker/picker'
import {
  sortedAndFiltered,
  SortHistory,
  SearchHistory,
} from '../../components/FilterSortHistory'
import { SearchBar } from 'react-native-elements'
import { FilterHistory } from '../../components/FilterSortHistory'
import { useDispatch, useSelector } from 'react-redux'

const History = () => {
  let [sessions, setSessions] = useState([])
  let [trigger, setTrigger] = useState(Date.now())
  let [fromFilter, setFromFilter] = useState('All')
  let [toFilter, setToFilter] = useState('All')
  // let [sortBy, setSortBy] = useState('-')
  let [mostRecentFirst, setMostRecentFirst] = useState(true)
  let [searchBy, setSearchBy] = useState('')
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  const sessionFiltered = sortedAndFiltered(
    sessions,
    fromFilter,
    toFilter,
    mostRecentFirst,
    searchBy,
  )

  const fromLangs = sessions.reduce((acc, val) => {
    return acc.length && acc.includes(val.langSource)
      ? acc
      : [...acc, val.langSource]
  }, [])
  const toLangs = sessions.reduce((acc, val) => {
    return acc.length && acc.includes(val.langTarget)
      ? acc
      : [...acc, val.langTarget]
  }, [])

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
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.primary,
        }}
      >
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.transparentOverlay} />
          <View style={styles.languagePickerContainer}>
            <FilterHistory
              filter={fromFilter}
              setFilter={setFromFilter}
              target={false}
              onlyLangs={fromLangs}
            />
            <SearchHistory searchBy={searchBy} setSearchBy={setSearchBy} />
            {/* <SortHistory setSortBy={setSortBy} /> */}
            <RecencyToggler
              newestFirst={mostRecentFirst}
              setNewestFirst={setMostRecentFirst}
            />
            <FilterHistory
              filter={toFilter}
              setFilter={setToFilter}
              target={true}
              onlyLangs={toLangs}
            />
          </View>
          <View style={{ minHeight: 1000, width: '100%' }}>
            {sessionFiltered && sessionFiltered.length ? (
              <FlatList
                contentContainerStyle={{ paddingBottom: 400 }}
                style={{ marginTop: 0, width: '100%' }}
                data={sessionFiltered}
                renderItem={(session) => <SessionTile session={session} />}
              />
            ) : (
              <></>
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
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
  languagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 0,
    backgroundColor: colors.primary,
    position: 'fixed',
    paddingTop: 0,
    paddingBottom: 5,
  },
  picker: {
    width: 170,
  },
  onePickerItem: {
    height: 130,
    color: colors.white,
    fontSize: 20,
    fontStyle: 'bold',
  },
})

export default History
