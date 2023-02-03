import { React } from 'react'
import { Text, View } from 'react-native'

import colors from '../theme/colors'

const ListeningView = ({ styles, langCode }) => {
  return (
    <View style={styles.listeningViewContainer}>
      <Text style={styles.listeningViewText}>Listening...</Text>
    </View>
  )
}

export default ListeningView
