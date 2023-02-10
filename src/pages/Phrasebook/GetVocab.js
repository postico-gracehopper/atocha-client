import { useState, useEffect, React } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { db } from '../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../../../context/authContext'
import { langFlags } from './langFlags'
import colors from '../../theme/colors'
import { FilterPhraseBook } from '../../components/FilterSortPhraseBook'
import { sortedAndFiltered } from '../../components/FilterSortPhraseBook'
import { SortPhraseBook } from '../../components/FilterSortPhraseBook'
import { SearchPhraseBook } from '../../components/FilterSortPhraseBook'
const GetVocab = () => {
  const [vocabWords, setVocabWords] = useState([])
  let [filter, setFilter] = useState('All')
  let [sortBy, setSortBy] = useState('-')
  let [searchBy, setSearchBy] = useState('')
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
  const vocabWordsFiltered = sortedAndFiltered(
    vocabWords,
    filter,
    sortBy,
    searchBy,
    langFlags,
  )
  console.log(vocabWordsFiltered)

  useEffect(() => {
    onGetVocab()
  }, [userId, `User/${userId}/phrasebook`])

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 30,
        }}
      >
        <FilterPhraseBook setFilter={setFilter} />
        <SortPhraseBook setSortBy={setSortBy} />
      </View>
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
      <SearchPhraseBook searchBy={searchBy} setSearchBy={setSearchBy} />
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
})

export default GetVocab
