import { React, useEffect, useState } from 'react'
import { View, Pressable, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import SelectDropdown from 'react-native-select-dropdown'
import { SelectList } from 'react-native-dropdown-select-list'
import languages from '../pages/SelectLanguage/languageList'
import { SearchBar } from 'react-native-elements'
import colors from '../theme/colors'

export const FilterHistory = ({
  styles,
  filter,
  setFilter,
  onlyLangs,
  target = true,
}) => {
  let availableLangs = [...languages]
  if (onlyLangs && onlyLangs.length) {
    availableLangs = availableLangs.filter((lang) =>
      onlyLangs.includes(lang.languageCode),
    )
  }
  const data = ['All', ...availableLangs]
  const [selected, setSelected] = useState('All')

  return (
    // <View>
    //   <View>
    //     <Picker
    //       selectedValue={filter}
    //       style={styles.picker}
    //       itemStyle={styles.onePickerItem}
    //       onValueChange={(itemValue) => setFilter(itemValue)}
    //     >
    //       <Picker.Item label="From" value="From" />
    //       {languages.map(({ languageName, languageCode }) => (
    //         <Picker.Item
    //           key={languageCode}
    //           label={languageName}
    //           value={languageCode}
    //         />
    //       ))}
    //     </Picker>
    //   </View>
    <View style={{ marginLeft: 5, marginRight: 5 }}>
      <View>
        <SelectDropdown
          buttonTextStyle={{ fontSize: 12, color: 'white' }}
          buttonStyle={{
            width: target ? 48 : 64,
            height: 30,
            borderRadius: 10,
            backgroundColor: selected === 'All' ? colors.primary : 'gray',
            borderColor: colors.white,
            borderWidth: 1,
          }}
          rowStyle={{ backgroundColor: '#00000055' }}
          rowTextStyle={{ color: 'white' }}
          dropdownStyle={{
            borderRadius: 15,
            backgroundColor: '#000000',
            color: 'white',
          }}
          data={data}
          onSelect={(selectedItem, index) => {
            if (selectedItem === 'All') {
              setFilter('All')
            } else setFilter(selectedItem.languageCode)
            setSelected(selectedItem)
          }}
          defaultButtonText={target ? 'To' : 'From'}
          defaultValue="All"
          buttonTextAfterSelection={(selectedItem, index) => {
            if (selectedItem === 'All') {
              return target ? 'To' : 'From'
            }
            return selectedItem.flag
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            if (item === 'All') {
              return 'All'
            }
            return item.flag
          }}
        />
      </View>
    </View>
  )
}

export const RecencyToggler = (props) => {
  // const [isNewestFirst, setIsNewestFirst] = useState(true)
  // useEffect(() => {}, [isNewestFirst])

  const { newestFirst, setNewestFirst } = props
  const toggleOrder = () => setNewestFirst(!newestFirst)

  return (
    <View
      style={{
        marginLeft: 5,
        marginRight: 0,
        borderWidth: 1,
        borderColor: 'white',
        height: 30,
        width: 60,
        borderRadius: 10,
        alignContent: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pressable>
        <Text style={{ color: 'white' }} onPress={toggleOrder}>
          {newestFirst ? '^New' : '^Old'}
        </Text>
      </Pressable>
    </View>
  )
}

export const SortHistory = ({ sortBy, setSortBy }) => {
  const data = ['-', 'Most Recent', 'Least Recent']
  return (
    <View>
      <View>
        <SelectDropdown
          buttonTextStyle={{ fontSize: 12 }}
          buttonStyle={{ width: 40, height: 10 }}
          data={data}
          onSelect={(selectedItem, index) => {
            setSortBy(selectedItem)
          }}
          defaultButtonText={'Sort By'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
      </View>
    </View>
  )
}

export const SearchHistory = ({ searchBy, setSearchBy }) => {
  return (
    <View style={{ flexGrow: 1 }}>
      <SearchBar
        placeholder="Search Conversations"
        value={searchBy}
        onChangeText={(text) => setSearchBy(text)}
        inputStyle={{
          fontSize: 14,
          borderWidth: 0,
          borderColor: '#00000000',
          color: 'white',
          backgroundColor: '#00000000',
        }}
        inputContainerStyle={{
          backgroundColor: '#00000000',
          borderRadius: 10,
          borderColor: 'white',
          borderWidth: 0,
          height: 30,
        }}
        containerStyle={{
          backgroundColor: '#00000055',
          padding: 0,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
        }}
        searchIcon={{ color: 'white' }}
        clearIcon={{ color: 'white' }}
        placeholderTextColor={'#CCC'}
      />
    </View>
  )
}

export function sortedAndFiltered(
  session,
  filterFrom,
  filterTo,
  mostRecentFirst,
  searchBy,
) {
  let filtered =
    filterFrom === 'All'
      ? session
      : session.filter((session) => session.langSource === filterFrom)

  filtered =
    filterTo === 'All'
      ? filtered
      : filtered.filter((session) => session.langTarget === filterTo)

  let sorted

  // if (sortBy === '-') {
  //   sorted = filtered
  // }

  // if (sortBy === 'Least Recent') {
  //   sorted = [...filtered].sort((a, b) =>
  //     Number(a.date) < Number(b.date) ? -1 : 0,
  //   )
  // }
  if (mostRecentFirst) {
    sorted = [...filtered].sort((a, b) => {
      return Number(a.date) > Number(b.date) ? -1 : 0
    })
  } else {
    sorted = [...filtered].sort((a, b) =>
      Number(a.date) < Number(b.date) ? -1 : 0,
    )
  }

  if (searchBy.length > 0) {
    return sorted.filter((session) => {
      if (searchBy === '') {
        return session
      } else if (
        session.sourceTranscription
          .toLowerCase()
          .includes(searchBy.toLowerCase()) ||
        session.targetTranscription
          .toLowerCase()
          .includes(searchBy.toLowerCase())
      ) {
        return session
      }
    })
  }
  return sorted
}
