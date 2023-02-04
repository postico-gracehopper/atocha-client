import {
  readAsStringAsync,
  documentDirectory,
  EncodingType,
} from 'expo-file-system'

export default readAtochaFile = async () => {
  return new Promise((resolve, reject) => {
    readAsStringAsync(documentDirectory + 'AtochaTranslations.txt', {
      encoding: EncodingType.UTF8,
    })
      .then((fileText) => {
        resolve(fileText.split('\n').map((s) => JSON.parse(s)))
      })
      .catch((err) => reject(err))
  })
}
