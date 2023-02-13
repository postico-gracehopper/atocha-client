import { React } from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import SelectDropdown from 'react-native-select-dropdown'
import { SelectList } from 'react-native-dropdown-select-list'
import languages from '../pages/SelectLanguage/languageList'
import { SearchBar } from 'react-native-elements'
import { langFlags } from '../pages/Phrasebook/langFlags'

import colors from '../theme/colors'

const style2 = StyleSheet.create({
  dropdownBtnStyle: {
    width: 200,
    height: 40,
    backgroundColor: colors.darkGray,
    marginTop: 20,
    borderColor: colors.gray,
    borderRightWidth: 1,
  },
  dropdown1BtnTxtStyle: {
    color: colors.gray,
    fontSize: 14,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    paddingLeft: 10,
  },
  dropdown2BtnTxtStyle: {
    color: colors.gray,
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
            setFilter(selectedItem)
          }}
          defaultButtonText={'Filter by'}
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

export const SortPhraseBook = ({ setSortBy }) => {
  const data = ['-', 'Most Recent', 'Least Recent']
  return (
    <View>
      <View>
        <SelectDropdown
          buttonStyle={style2.dropdownBtnStyle}
          buttonTextStyle={style2.dropdown2BtnTxtStyle}
          // buttonTextStyle={{ fontSize: 12 }}
          // buttonStyle={{ width: 120, height: 40 }}
          data={data}
          onSelect={(selectedItem, index) => {
            setSortBy(selectedItem)
          }}
          defaultButtonText={'Sort by'}
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

export const SearchPhraseBook = ({ searchBy, setSearchBy }) => {
  return (
    <SearchBar
      placeholder="Search Phrases"
      value={searchBy}
      onChangeText={(text) => setSearchBy(text)}
    />
  )
}

export function sortedAndFiltered(vocabWords, filter, sortBy, searchBy) {
  let filtered =
    filter !== 'All'
      ? vocabWords.filter((word) => word.originalLang === filter)
      : vocabWords

  let sorted

  if (sortBy === '-') {
    sorted = filtered
  }

  if (sortBy === 'Least Recent') {
    sorted = [...filtered].sort((a, b) =>
      Number(a.dateAdded) < Number(b.dateAdded) ? -1 : 0,
    )
  }

  if (sortBy === 'Most Recent') {
    sorted = [...filtered].sort((a, b) =>
      Number(a.dateAdded) > Number(b.dateAdded) ? -1 : 0,
    )
  }

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
