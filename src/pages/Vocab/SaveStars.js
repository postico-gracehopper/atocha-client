import { useState, useEffect, React } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import colors from '../../theme/colors'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebase'

import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore'

async function addVocabToFirebase(userId, vocabWord, originalLang, definition) {
  try {
    console.log(JSON.stringify(db, null, 4))
    if (userId == null) {
      console.log('No user is signed in.')
      return null
    }

    await addDoc(collection(db, `User/${userId}/phrasebook`), {
      vocabWord: vocabWord,
      originalLang: originalLang,
      definition: definition,
      dateAdded: serverTimestamp(),
    }),
      console.log('Vocab added to Firebase successfully.')
  } catch (error) {
    console.error('Error adding vocab to Firebase: ', error)
  }
}

const SaveStars = (vocab) => {
  const user = getAuth()
  const currentUser = user.currentUser

  const onSaveStars = async (event) => {
    event.preventDefault()
    if (currentUser) {
      const uid = currentUser.uid
      console.log('Uid isss', uid)
      // dummy data first
      const starredWord = 'ananas'
      const currentLang = 'fr-FR'
      const starredDef = 'pineappleeee'
      addVocabToFirebase(uid, starredWord, currentLang, starredDef).catch(
        (error) => console.error(error),
      )
    } else {
      console.error('No user is signed in.')
    }
  }

  return (
    <Pressable style={styles.vocabPressable} onPress={onSaveStars}>
      <Text style={styles.vocabPressableText}>Save my stars</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  vocabPressable: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.brightPrimary,
  },
  vocabPressableText: {
    fontSize: 22,
    fontFamily: 'Baskerville',
  },
})

export default SaveStars
