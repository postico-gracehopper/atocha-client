import { React } from 'react'
import { Text, View } from 'react-native'
import languages from '../pages/SelectLanguage/languageList'

import colors from '../theme/colors'
import ResetButton from './ResetButton'

const ListeningView = ({ styles, langCode, handleReset }) => {
  const listeningString = languages.filter(
    (language) => language.languageCode === langCode,
  )[0].listeningString

  return (
    <View style={styles.listeningViewContainer}>
      <View style={styles.resetButtonContainer}>
        <ResetButton styles={styles} handleReset={handleReset} />
      </View>
      <Text style={styles.listeningViewText}>{listeningString}</Text>
    </View>
  )
}

export default ListeningView
