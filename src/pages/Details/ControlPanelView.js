import { React } from 'react'
import { useSelector } from 'react-redux'

import { Pressable, View } from 'react-native'

import colors from '../../theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { LanguagePicker } from '../../components'

const ControlPanelView = ({
  styles,
  startRecording,
  stopRecording,
  onInputValueChange,
  onOutputValueChange,
  handleLanguageSwap,
  isRecording,
  recording,
}) => {
  const { isTeacherLoading, isSuggestionLoading } = useSelector(
    (state) => state.translation,
  )
  const { langSource, langTarget } = useSelector(
    (state) => state.languagePicker,
  )

  return (
    <View style={styles.controlContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <LanguagePicker
            styles={styles}
            chosenLanguage={langSource}
            onValueChange={onInputValueChange}
          />
        </View>
        <Pressable title="SWAP LANGUAGES" onPress={handleLanguageSwap}>
          <MaterialCommunityIcons
            name="arrow-u-right-top"
            size={30}
            color={colors.brightPrimary}
          />
        </Pressable>
        <View style={styles.recordButtonContainer}>
          <Pressable
            style={isRecording ? styles.recordButtonOff : styles.recordButtonOn}
            title={isRecording ? 'STOP' : 'RECORD'}
            onPress={recording ? stopRecording : startRecording}
            disabled={isTeacherLoading || isSuggestionLoading}
          >
            <MaterialCommunityIcons
              name={'microphone'}
              size={40}
              color={isRecording ? 'white' : colors.brightPrimary}
            />
          </Pressable>
        </View>
        <Pressable title="SWAP LANGUAGES" onPress={handleLanguageSwap}>
          <MaterialCommunityIcons
            name="arrow-u-left-bottom"
            size={30}
            color={colors.brightPrimary}
          />
        </Pressable>
        <LanguagePicker
          styles={styles}
          chosenLanguage={langTarget}
          onValueChange={onOutputValueChange}
        />
      </View>
    </View>
  )
}
export default ControlPanelView
