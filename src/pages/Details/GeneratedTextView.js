import React from 'react'

import { Pressable, View, Text } from 'react-native'

import TeacherView from './TeacherView'
import SuggestingsView from './SuggestionsView'

const GenerateTextView = ({ styles }) => {
  const [generatedTextView, setGeneratedTextView] = React.useState('teacher')

  return (
    <View style={styles.generatedTextContainer}>
      <View style={styles.generatedTextHeader}>
        <Pressable
          style={
            generatedTextView === 'teacher'
              ? styles.generatedTextHeaderActive
              : styles.generatedTextHeaderInactive
          }
          disabled={generatedTextView === 'teacher'}
          onPress={() => {
            console.log('teacher pressed')
            setGeneratedTextView('teacher')
          }}
        >
          <Text style={styles.generatedTextHeaderText}>Teach me</Text>
        </Pressable>
        <Pressable
          style={
            generatedTextView === 'recommendations'
              ? styles.generatedTextHeaderActive
              : styles.generatedTextHeaderInactive
          }
          disabled={generatedTextView === 'recommendations'}
          onPress={() => {
            console.log('recommendations pressed')
            setGeneratedTextView('recommendations')
          }}
        >
          <Text style={styles.generatedTextHeaderText}>Respond</Text>
        </Pressable>
      </View>
      {generatedTextView === 'teacher' ? <TeacherView styles={styles} /> : null}
      {generatedTextView === 'recommendations' ? (
        <SuggestingsView styles={styles} />
      ) : null}
    </View>
  )
}
export default GenerateTextView
