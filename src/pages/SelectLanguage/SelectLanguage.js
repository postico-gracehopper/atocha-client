import { useState, useEffect, React } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { colors } from 'theme'
import { useSelector, useDispatch } from 'react-redux'
import { setTargetLanguage } from '../../slices/targetLanguageSlice'

export default function SelectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTargetLanguage(selectedLanguage))
  }, [selectedLanguage])

  const onValueChange = (itemValue) => {
    setSelectedLanguage(itemValue)
    // console.log('selected language isss', selectedLanguage)
    // console.log('action object: ', setTargetLanguage(selectedLanguage))
    dispatch(setTargetLanguage(selectedLanguage))
    // console.log('state isss', consoleMe)
  }

  return (
    <View style={styles.container}>
      <Text>Please select a language:</Text>
      <Picker
        selectedValue={selectedLanguage}
        style={styles.picker}
        onValueChange={onValueChange}
      >
        <Picker.Item label="English" value="english" />
        <Picker.Item label="French" value="french" />
        <Picker.Item label="Spanish" value="spanish" />
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 200,
  },
})
