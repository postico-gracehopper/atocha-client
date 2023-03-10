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
        borderColor: colors.darkPrimary,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Text
        style={{
          position: 'absolute',
          color: colors.gray,
          marginTop: 3,
          marginHorizontal: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        {date}
      </Text>
      <View style={{ flex: 1, marginRight: 4 }}>
        <Text>
          <Text style={{ fontSize: 30 }}>{langSourceFlag}</Text>
          {uri ? (
            <URIPlayback
              color={colors.brightPrimary}
              disabled={false}
              uri={uri}
              size={30}
            />
          ) : (
            <TextTranscriber
              text={sourceTranscription}
              language={langSource}
              color={colors.brightPrimary}
              disabled={false}
              size={30}
            />
          )}
        </Text>
        <Text style={{ color: 'white' }}>{sourceTranscription}</Text>
      </View>
      <View style={{ flex: 1, textAlign: 'right', marginLeft: 4 }}>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text>
            <TextTranscriber
              text={targetTranscription}
              language={langTarget}
              color={colors.brightPrimary}
              disabled={false}
              size={30}
            />
            <Text style={{ fontSize: 30 }}>{langTargetFlag}</Text>
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
