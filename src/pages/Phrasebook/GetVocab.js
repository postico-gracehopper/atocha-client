import { useState, useEffect, React } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { db } from '../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../../../context/authContext'
import { langFlags } from './langFlags'
import colors from '../../theme/colors'
import { FilterPhraseBook } from '../../components/FilterSortPhraseBook'
import { sortedAndFiltered } from '../../components/FilterSortPhraseBook'
// import { SortPhraseBook } from '../../components/FilterSortPhraseBook'
import { SearchPhraseBook } from '../../components/FilterSortPhraseBook'
import { RecencyToggler } from '../../components/FilterSortPhraseBook'
import { SafeAreaView } from 'react-native-safe-area-context'

const GetVocab = () => {
  const [vocabWords, setVocabWords] = useState([])
  let [filter, setFilter] = useState('All')
  // let [sortBy, setSortBy] = useState('-')
  let [searchBy, setSearchBy] = useState('')
  let [mostRecentFirst, setMostRecentFirst] = useState(true)
  const { currentUser } = useAuth()
  const userId = currentUser.uid

  const onGetVocab = async () => {
    const unsub = onSnapshot(
      collection(db, `User/${userId}/phrasebook`),
      (querySnapshot) => {
        const vocabWords = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            vocabWord: doc.data().vocabWord,
            originalLang: doc.data().originalLang,
            definition: doc.data().definition,
            dateAdded: doc.data().dateAdded,
          }
        })
        vocabWords.sort((a, b) => b.dateAdded - a.dateAdded)
        setVocabWords(vocabWords)
      },
    )
    return () => unsub()
  }

  const availableLangs = vocabWords.reduce((acc, val) => {
    return acc.length && acc.includes(val.originalLang)
      ? acc
      : [...acc, val.originalLang]
  }, [])

  const vocabWordsFiltered = sortedAndFiltered(
    vocabWords,
    filter,
    // sortBy,
    searchBy,
    mostRecentFirst,
  )

  useEffect(() => {
    onGetVocab()
  }, [userId, `User/${userId}/phrasebook`])

  return (
    <View style={styles.container}>
      <View style={styles.searchSortFilterContainer}>
        <FilterPhraseBook setFilter={setFilter} onlyLangs={availableLangs} />
        <SearchPhraseBook searchBy={searchBy} setSearchBy={setSearchBy} />
        <RecencyToggler
          newestFirst={mostRecentFirst}
          setNewestFirst={setMostRecentFirst}
        />
      </View>
      <Text style={styles.notYet}>Phrasebook</Text>
      <ScrollView style={styles.scrollView}>
        {vocabWordsFiltered.map((word) => (
          <View key={word.id} style={styles.wordContainer}>
            <Text style={styles.vocabWord}>
              {langFlags[word.originalLang]} {word.vocabWord}
            </Text>
            <Text style={styles.definition}>{word.definition}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignSelf: 'center',
    justifySelf: 'center',
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
    maxWidth: '95%',
  },
  vocabWord: {
    fontSize: 22,
    color: 'white',
    flexWrap: 'wrap',
    maxWidth: '50%',
    textAlign: 'left',
    fontFamily: 'Cochin',
  },
  definition: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.lightPrimary,
    fontFamily: 'Cochin',
    flexWrap: 'wrap',
    maxWidth: '50%',
    textAlign: 'right',
  },
  searchSortFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 0,
    backgroundColor: colors.primary,
    position: 'fixed',
    paddingTop: 5,
    paddingBottom: 5,
  },
  notYet: {
    marginTop: 30,
    marginBottom: 30,
    paddingTop: 40,
    paddingLeft: 10,
    width: '100%',
    fontSize: 80,
    lineHeight: 70,
    fontFamily: 'arsilon',
    color: colors.white,
    zIndex: 1,
  },
})

export default GetVocab
