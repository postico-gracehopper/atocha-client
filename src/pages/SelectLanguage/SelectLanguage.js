import { React } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useSelector, useDispatch } from 'react-redux'

import colors from '../../theme/colors'
import languages from './languageList'
import {
  setInputLanguage,
  setOutputLanguage,
} from '../../slices/languagePickerSlice'

export default function SelectLanguage() {
  const { langSource, langTarget } = useSelector(
    (state) => state.languagePicker,
  )

  const dispatch = useDispatch()

  const onInputValueChange = (itemValue) => {
    dispatch(setInputLanguage(itemValue))
  }

  const onOutputValueChange = (itemValue) => {
    dispatch(setOutputLanguage(itemValue))
  }

  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <Text style={styles.chooseText}>I'd like...</Text>
        <Picker
          selectedValue={langSource}
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
      </View>
      <View style={styles.languageContainer}>
        <Text style={styles.chooseText}>Translated into...</Text>
        <Picker
          selectedValue={langTarget}
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
  languageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 20,
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
