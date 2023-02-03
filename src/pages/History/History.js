import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { selectHistory } from '../../slices/historySlice'
import { fetchHistory } from '../../slices/historySlice'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

const History = () => {
  const dispatch = useDispatch()
  const history = useSelector(selectHistory)

  useEffect(() => {
    dispatch(fetchHistory())
  }, [dispatch])

  return (
    <View>
      <Text>Test</Text>
    </View>
  )
}
//not sure if this necessary for now/what it does?
// History.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func,
//   }),
// }

// History.defaultProps = {
//   navigation: { navigate: () => null },
// }

export default History
