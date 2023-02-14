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
            vocabWord: doc.data().vocabWord.trim(''),
            originalLang: doc.data().originalLang,
            definition: doc.data().definition.trim(''),
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
          marginTop: -30,
          // borderTopColor: colors.gray,
          // borderTopWidth: 2,
        }}
      >
        <FilterPhraseBook setFilter={setFilter} />
        <SortPhraseBook setSortBy={setSortBy} />
      </View>
      <ScrollView style={styles.scrollView}>
        {vocabWordsFiltered.map((word) => (
          <View key={word.id} style={styles.wordContainer}>
            <View style={styles.wordBlock}>
              <Text>{langFlags[word.originalLang]}</Text>
              <Text style={styles.vocabWord}>{word.vocabWord}</Text>
            </View>
            <View>
              <Text style={styles.definition}>{word.definition}</Text>
            </View>
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
    // flex: 1,
    // alignSelf: 'center',
    // justifySelf: 'center',
  },
  wordContainer: {
    flexDirection: 'row',
    margin: 4,
    maxWidth: '90%',
  },
  vocabWord: {
    fontSize: 13,
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    // fontStyle: 'italic',
    // fontWeight: 'bold',
    color: colors.white,
    flexWrap: 'wrap',
    maxWidth: '70%',
    textAlign: 'left',
    marginBottom: 16,
    marginLeft: 5,
  },
  definition: {
    fontSize: 16,
    lineHeight: 16,
    color: colors.white,
    fontFamily: 'lora_regular_italic',
    // fontStyle: 'italic',
    flexWrap: 'wrap',
    maxWidth: 120,
    marginBottom: 16,
  },
  wordBlock: {
    width: '70%',
    flexDirection: 'row',
  },
})

export default GetVocab
