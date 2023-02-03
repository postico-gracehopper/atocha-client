import { React } from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { SelectList } from 'react-native-dropdown-select-list'

import colors from '../theme/colors'
import languages from '../pages/SelectLanguage/languageList'

const LanguagePicker = ({ styles, chosenLanguage, onValueChange, text }) => {
  const handleLanguageFiltering = () => {
    if (chosenLanguage === 'en-US')
      return languages.filter((language) => language.languageCode === 'en-US')
    else
      return languages.filter((language) => language.languageCode !== 'en-US')
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={chosenLanguage}
        style={styles.picker}
        onValueChange={onValueChange}
        itemStyle={styles.onePickerItem}
      >
        {handleLanguageFiltering(languages).map(
          ({ languageName, languageCode }) => (
            <Picker.Item
              key={languageCode}
              label={languageName}
              value={languageCode}
            />
          ),
        )}
      </Picker>
    </View>
  )
}

export default LanguagePicker
