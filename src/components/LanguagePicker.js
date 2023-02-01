import { React } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import colors from '../theme/colors'
import languages from '../pages/SelectLanguage/languageList'

const LanguagePicker = ({ chosenLanguage, onValueChange, text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.translateText}>{text}</Text>
      <Picker
        selectedValue={chosenLanguage}
        style={styles.picker}
        onValueChange={onValueChange}
        itemStyle={styles.onePickerItem}
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
    alignItems: 'center',
  },
  picker: {
    backgroundColor: 'rgba(47,00,24,0.6)',
    width: 170,
  },
  onePickerItem: {
    height: 170,
    color: colors.white,
    fontSize: 20,
  },
  translateText: {
    textTransform: 'uppercase',
    color: colors.white,
    fontSize: 15,
  },
})

export default LanguagePicker
