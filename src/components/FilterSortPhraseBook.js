import { React } from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import SelectDropdown from 'react-native-select-dropdown'
import { SelectList } from 'react-native-dropdown-select-list'
import languages from '../pages/SelectLanguage/languageList'
import { SearchBar } from 'react-native-elements'
import { langFlags } from '../pages/Phrasebook/langFlags'
import colors from '../theme/colors'
import { Pressable, Text, View } from 'react-native'

export const FilterPhraseBook = ({ setFilter, onlyLangs }) => {
  let availableLangs = [...languages]
  if (onlyLangs && onlyLangs.length) {
    availableLangs = availableLangs.filter((lang) =>
      onlyLangs.includes(lang.languageName),
    )
  }
  const data = ['All', ...availableLangs]

import colors from '../theme/colors'

const style2 = StyleSheet.create({
  dropdownBtnStyle: {
    width: 200,
    height: 40,
    backgroundColor: colors.primary,
    borderColor: colors.fadedPrimary,
    borderRightWidth: 1,
  },
  dropdown1BtnTxtStyle: {
    color: colors.brightPrimary,
    fontSize: 14,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    paddingLeft: 10,
  },
  dropdown2BtnTxtStyle: {
    color: colors.brightPrimary,
    fontSize: 14,
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    paddingRight: 10,
  },
})

export const FilterPhraseBook = ({ setFilter }) => {
  const data = [
    'All',
    'English',
    'Spanish',
    'French',
    'German',
    'Portuguese',
    'Italian',
    'Russian',
    'Hindi',
    'Thai',
  ]

  return (
    <View>
      <View>
        <SelectDropdown
          buttonStyle={style2.dropdownBtnStyle}
          buttonTextStyle={style2.dropdown1BtnTxtStyle}
          // buttonTextStyle={{ fontSize: 12 }}
          // buttonStyle={{ width: 120, height: 40 }}
          data={data}
          onSelect={(selectedItem, index) => {
            if (selectedItem === 'All') {
              setFilter('All')
            } else setFilter(selectedItem.languageName)
          }}
          defaultButtonText={'All'}

          buttonTextAfterSelection={(selectedItem, index) => {
            if (selectedItem === 'All') {
              return 'All'
            }
            return selectedItem.flag
          }}
          rowTextForSelection={(item, index) => {
            if (item === 'All') {
              return 'All'
            }
            return item.flag
          }}
          buttonStyle={{
            width: 64,
            height: 30,
            borderRadius: 10,
            backgroundColor: colors.primary,
            borderColor: colors.fadedPrimary,
            borderWidth: 1,
          }}
          buttonTextStyle={{ fontSize: 12, color: 'white' }}
          rowTextStyle={{ color: 'white', fontSize: 12 }}
          rowStyle={{ backgroundColor: '#00000055' }}
          dropdownStyle={{
            borderRadius: 15,
            backgroundColor: '#000000',
            color: 'white',
          }}
        />
      </View>
    </View>
  )
}

// export const SortPhraseBook = ({ setSortBy }) => {
//   const data = ['-', 'Most Recent', 'Least Recent']
//   return (
//     <View>
//       <View>
//         <SelectDropdown
//           buttonStyle={{
//             width: 150,
//             height: 30,
//             borderRadius: 10,
//             backgroundColor: colors.primary,
//             borderColor: colors.white,
//             borderWidth: 1,
//           }}
//           buttonTextStyle={{ fontSize: 12, color: 'white' }}
//           rowTextStyle={{ color: 'white', fontSize: 12 }}
//           rowStyle={{ backgroundColor: '#00000055' }}
//           dropdownStyle={{
//             borderRadius: 15,
//             backgroundColor: '#000000',
//             color: 'white',
//           }}
//           data={data}
//           onSelect={(selectedItem, index) => {
//             setSortBy(selectedItem)
//           }}
//           defaultButtonText={'Sort By'}
//           buttonTextAfterSelection={(selectedItem, index) => {
//             return selectedItem
//           }}
//           rowTextForSelection={(item, index) => {
//             return item
//           }}
//         />
//       </View>
//     </View>
//   )
// }

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
        borderColor: colors.fadedPrimary,
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

export const SearchPhraseBook = ({ searchBy, setSearchBy }) => {
  return (
    <View style={{ flexGrow: 1 }}>
      <SearchBar
        placeholder="Search Phrases"
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
  vocabWords,
  filter,
  // sortBy,
  searchBy,
  mostRecentFirst,
) {
  let filtered =
    filter !== 'All'
      ? vocabWords.filter((word) => word.originalLang === filter)
      : vocabWords

  let sorted

  // if (sortBy === '-') {
  //   sorted = filtered
  // }

  // if (sortBy === 'Least Recent') {
  //   sorted = [...filtered].sort((a, b) =>
  //     Number(a.dateAdded) < Number(b.dateAdded) ? -1 : 0,
  //   )
  // }

  // if (sortBy === 'Most Recent') {
  //   sorted = [...filtered].sort((a, b) =>
  //     Number(a.dateAdded) > Number(b.dateAdded) ? -1 : 0,
  //   )
  // }
  //////////////////////////////////////////////////////////////////////////
  if (mostRecentFirst) {
    sorted = [...filtered].sort((a, b) => {
      return Number(a.dateAdded) > Number(b.dateAdded) ? -1 : 0
    })
  } else {
    sorted = [...filtered].sort((a, b) =>
      Number(a.dateAdded) < Number(b.dateAdded) ? -1 : 0,
    )
  }
  ///////////////////////////////////////////////////////////////////////////
  if (searchBy.length > 0) {
    return sorted.filter((word) => {
      if (searchBy === '') {
        return word
      } else if (
        word.originalLang.toLowerCase().includes(searchBy.toLowerCase()) ||
        word.vocabWord.toLowerCase().includes(searchBy.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchBy.toLowerCase())
      ) {
        return word
      }
    })
  }
  return sorted
}
