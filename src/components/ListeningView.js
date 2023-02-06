import { React } from 'react'
import { Text, View } from 'react-native'
import languages from '../pages/SelectLanguage/languageList'

import colors from '../theme/colors'

const ListeningView = ({ styles, langCode }) => {
  const listeningString = languages.filter(
    (language) => language.languageCode === langCode,
  )[0].listeningString

  return (
    <View style={styles.listeningViewContainer}>
      <Text style={styles.listeningViewText}>{listeningString}</Text>
    </View>
  )
}

export default ListeningView
