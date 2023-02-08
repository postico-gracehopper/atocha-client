import { useState, useEffect, React } from 'react'
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native'
import colors from '../../theme/colors'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebase'

import { getDocs, collection, onSnapshot } from 'firebase/firestore'

const GetVocab = () => {
  const [vocabWords, setVocabWords] = useState([])
  const [userId, setUserId] = useState(null)

  const onGetVocab = async () => {
    console.log('In the getVocab async block :)')
    const user = getAuth()
    setUserId(user.currentUser.uid)
    console.log('current user is', user.currentUser)

    const unsub = onSnapshot(
      collection(db, `User/${userId}/phrasebook`),
      (querySnapshot) => {
        console.log('Query path:', `User/${userId}/phrasebook`)

        const vocabWords = querySnapshot.docs
          .map((doc) => {
            return {
              id: doc.id,
              vocabWord: doc.data().vocabWord,
              definition: doc.data().definition,
              dateAdded: doc.data().dateAdded,
            }
          })
          .sort((a, b) => {
            const dateA = a.dateAdded ? new Date(a.dateAdded) : 0
            const dateB = b.dateAdded ? new Date(b.dateAdded) : 0
            return -1 * (dateA - dateB)
          })
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
            <Text style={styles.vocabWord}>{word.vocabWord}</Text>
            <Text style={styles.definition}>{word.definition}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  vocabWord: {
    fontSize: 24,
    color: 'white',
  },
  definition: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '700',
    color: colors.brightPrimary,
  },
})

export default GetVocab
