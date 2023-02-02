import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import Logout from '../AuthPages/Logout'
import { getAuth } from 'firebase/auth'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    marginBottom: 20,
  },
})

const Home = ({ navigation }) => {
  const auth = getAuth()
  const user = auth.currentUser
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text>
        {user !== null ? (
          <Text style={styles.greeting}>{`Welcome ${user.email}!`}</Text>
        ) : null}
      </Text>
      <Text style={styles.title}>Home</Text>
      <Button
        title="Go to Details"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />
      <Button
        title="Login"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => {
          navigation.navigate('Login2', { from: 'Home' })
        }}
      />
      <Button
        title="Sign Up"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => {
          navigation.navigate('SignUp', { from: 'Home' })
        }}
      />
      <Button
        title="Select Language"
        color="white"
        backgroundColor={colors.lightPurple}
        onPress={() => {
          navigation.navigate('SelectLanguage', { from: 'Home' })
        }}
      />
      <Logout />
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
