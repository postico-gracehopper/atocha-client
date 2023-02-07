import { useState, React } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import colors from '../../theme/colors'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebase'
import { Animated, Easing } from 'react-native'

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

const SaveStars = ({ sessionVocab, language }) => {
  const user = getAuth()
  const currentUser = user.currentUser
  const [backgroundColor, setBackgroundColor] = useState(colors.primary)
  const [textColor, setTextColor] = useState(colors.white)
  const [textOpacity, setTextOpacity] = useState(new Animated.Value(1))
  const [text, setText] = useState('Save my stars')

  const onSaveStars = async (event) => {
    event.preventDefault()
    setBackgroundColor('white')
    setTimeout(() => {
      setBackgroundColor(colors.brightPrimary)
    }, 200)

    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 800,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setText('Vocabulary saved.')
      setBackgroundColor(colors.primary)
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
    })

    if (currentUser) {
      const uid = currentUser.uid

      // Iterate over the key-value pairs in the sessionVocab object
      Object.entries(sessionVocab).forEach(([vocabWord, definition]) => {
        addVocabToFirebase(uid, vocabWord, language, definition).catch(
          (error) => console.error(error),
        )
      })
    } else {
      console.error('No user is signed in.')
    }
  }

  return (
    <Pressable
      style={[styles.vocabPressable, { backgroundColor }]}
      onPress={onSaveStars}
    >
      <Animated.Text
        style={[styles.vocabPressableText, { opacity: textOpacity }]}
      >
        {text}
      </Animated.Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  vocabPressable: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  vocabPressableText: {
    fontSize: 18,
    fontFamily: 'Baskerville',
    color: colors.white,
  },
})

export default SaveStars
