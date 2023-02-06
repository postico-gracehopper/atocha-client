import { useState, useEffect, React } from 'react'
import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native'
import colors from '../../theme/colors'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebase'

import { getDocs, collection } from 'firebase/firestore'

const GetVocab = () => {
  const user = getAuth()
  const currentUser = user.currentUser

  const [vocabWords, setVocabWords] = useState([])

  const onGetVocab = async () => {
    console.log('In the getVocab async block :)')
    if (currentUser) {
      const userId = user.currentUser.uid
      const querySnapshot = await getDocs(
        collection(db, `User/${userId}/phrasebook`),
      )
      const vocabWords = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          vocabWord: doc.data().vocabWord,
          definition: doc.data().definition,
        }
      })
      setVocabWords(vocabWords)
    } else {
      console.error('No user is signed in.')
    }
  }

  useEffect(() => {
    onGetVocab()
  }, [])

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
