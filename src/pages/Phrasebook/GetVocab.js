import { useState, useEffect, React } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

import { langFlags } from './langFlags'
import colors from '../../theme/colors'

const GetVocab = () => {
  const [vocabWords, setVocabWords] = useState([])
  const [userId, setUserId] = useState(null)

  const onGetVocab = async () => {
    console.log('In the getVocab async block :)')
    const user = getAuth()
    setUserId(user.currentUser.uid)
    console.log('current user email is', user.currentUser.email)

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

  useEffect(() => {
    onGetVocab()
  }, [userId, `User/${userId}/phrasebook`])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {vocabWords.map((word) => (
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
})

export default GetVocab
