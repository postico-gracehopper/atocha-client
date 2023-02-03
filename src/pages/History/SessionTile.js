import React from 'react'
import { View, Text } from 'react-native'
import { colors } from 'theme'
import TextTranscriber from '../../components/TextTranscriber'

const SessionTile = (props) => {
  let {
    date,
    sourceTranscription,
    targetTranscription,
    sourceAudio,
    sourceLang,
    targetLang,
  } = props.session.item

  if (typeof date === 'number') {
    date = new Date(date)

    date = `${date.toString().slice(0, 15)}`
  }

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        color: colors.white,
        borderTopWidth: 1,
        borderColor: colors.white,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Text
        style={{
          position: 'absolute',
          color: colors.white,
          marginTop: 7,
          marginHorizontal: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        {date}
      </Text>
      <View style={{ flex: 1 }}>
        <TextTranscriber
          text={sourceTranscription}
          language={sourceLang}
          color={colors.white}
          disabled={false}
        />
        <Text style={{ color: 'white' }}>{sourceTranscription}</Text>
      </View>
      <View style={{ flex: 1, textAlign: 'right' }}>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TextTranscriber
            text={targetTranscription}
            language={targetLang}
            color={colors.white}
            disabled={false}
          />
        </View>
        <Text style={{ color: 'white', textAlign: 'right' }}>
          {targetTranscription}
        </Text>
      </View>
    </View>
  )
}

export default SessionTile
