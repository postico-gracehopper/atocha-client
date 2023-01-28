import { useState, useEffect, React } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useDispatch } from 'react-redux'

import colors from '../../theme/colors'
import languages from './languageList'
import {
  setInputLanguage,
  setOutputLanguage,
} from '../../slices/targetLanguageSlice'

export default function SelectLanguage() {
  const [chosenInput, setChosenInput] = useState()
  const [chosenOutput, setChosenOutput] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInputLanguage(chosenInput))
  }, [chosenInput])

  useEffect(() => {
    dispatch(setOutputLanguage(chosenOutput))
  }, [chosenOutput])

  const onInputValueChange = (itemValue) => {
    setChosenInput(itemValue)
    dispatch(setInputLanguage(chosenInput))
  }

  const onOutputValueChange = (itemValue) => {
    setChosenOutput(itemValue)
    dispatch(setOutputLanguage(chosenOutput))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.chooseText}>I'd like...</Text>
      <Picker
        selectedValue={chosenInput}
        style={styles.picker}
        onValueChange={onInputValueChange}
        itemStyle={{
          color: colors.white,
        }}
      >
        {languages.map(({ languageName, languageCode }) => (
          <Picker.Item
            key={languageCode}
            label={languageName}
            value={languageCode}
          />
        ))}
      </Picker>
      <Text style={styles.chooseText}>Translated into...</Text>
      <Picker
        selectedValue={chosenOutput}
        style={styles.picker}
        onValueChange={onOutputValueChange}
        itemStyle={{
          color: colors.white,
        }}
      >
        {languages.map(({ languageName, languageCode }) => (
          <Picker.Item
            key={languageCode}
            label={languageName}
            value={languageCode}
          />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 50,
  },
  picker: {
    width: 400,
  },
  chooseText: {
    color: colors.white,
    fontSize: 32,
    fontFamily: 'Cochin',
  },
})
