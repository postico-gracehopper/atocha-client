import * as FileSystem from 'expo-file-system'

import readAtochaFile from './readAtochaFile'

export default writeToAtochaFile = async (session, clear = false) => {
  let fileUri = FileSystem.documentDirectory + 'AtochaTranslations.txt'

  let existingRecordings = null
  try {
    existingRecordings = await readAtochaFile()
    existingRecordings = existingRecordings
      .map((r) => JSON.stringify(r))
      .join('\n')
  } catch (err) {
    console.log(err)
  }

  await FileSystem.writeAsStringAsync(
    fileUri,
    !clear && existingRecordings
      ? existingRecordings + '\n' + session
      : session,
    {
      encoding: FileSystem.EncodingType.UTF8,
    },
  )
}
