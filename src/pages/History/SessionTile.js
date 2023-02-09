import React from 'react'
import { View, Text } from 'react-native'
import { colors } from 'theme'
import TextTranscriber from '../../components/TextTranscriber'
import languageList from '../SelectLanguage/languageList'
import URIPlayback from '../../components/URIPlayBack'

const SessionTile = (props) => {
  let {
    date,
    sourceTranscription,
    targetTranscription,
    uri,
    langSource,
    langTarget,
  } = props.session.item

  if (typeof date === 'number') {
    date = new Date(date)
    date = date.toString().split(' ').slice(0, 3)
    date[2] =
      String(parseInt(date[2])) +
      ({ 1: 'st', 2: 'nd', 3: 'rd' }[parseInt(date[2])] || 'th')
    date = `${date[0]}, ${date[1]} ${date[2]}`
    // date = `${date.toString().slice(0, 3)}, ${date
    //   .toString()
    //   .slice(4, 7)} ${date.toString()}`
  }
  const langSourceFlag = languageList.find(
    (lang) => lang.languageCode === langSource,
  ).flag
  const langTargetFlag = languageList.find(
    (lang) => lang.languageCode === langTarget,
  ).flag

  return (
    <View
      style={{
        color: colors.white,
        borderTopWidth: 1,
        borderColor: colors.fadedPrimary,
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
        <Text>
          {uri ? (
            <URIPlayback color={colors.white} disabled={false} uri={uri} />
          ) : (
            <TextTranscriber
              text={sourceTranscription}
              language={langSource}
              color={colors.white}
              disabled={false}
            />
          )}
          <Text style={{ fontSize: 22 }}>{langSourceFlag}</Text>
        </Text>
        <Text style={{ color: 'white' }}>{sourceTranscription}</Text>
      </View>
      <View style={{ flex: 1, textAlign: 'right' }}>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text>
            <Text style={{ fontSize: 22 }}>{langTargetFlag}</Text>
            <TextTranscriber
              text={targetTranscription}
              language={langTarget}
              color={colors.white}
              disabled={false}
            />
          </Text>
        </View>
        <Text style={{ color: 'white', textAlign: 'right' }}>
          {targetTranscription}
        </Text>
      </View>
    </View>
  )
}

export default SessionTile
