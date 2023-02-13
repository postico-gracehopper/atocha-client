import { React } from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import SelectDropdown from 'react-native-select-dropdown'
import { SelectList } from 'react-native-dropdown-select-list'
import languages from '../pages/SelectLanguage/languageList'
import { SearchBar } from 'react-native-elements'
export const FilterHistory = ({ setFilter }) => {
  const data = ['All', ...languages]
  return (
    <View>
      <View>
        <SelectDropdown
          buttonTextStyle={{ fontSize: 12 }}
          buttonStyle={{ width: 120, height: 40 }}
          data={data}
          onSelect={(selectedItem, index) => {
            if (selectedItem === 'All') {
              setFilter('All')
            } else setFilter(selectedItem.languageCode)
          }}
          defaultButtonText={'Filter By'}
          buttonTextAfterSelection={(selectedItem, index) => {
            if (selectedItem === 'All') {
              return 'All'
            }
            return selectedItem.languageName
          }}
          rowTextForSelection={(item, index) => {
            if (item === 'All') {
              return 'All'
            }
            return item.languageName
          }}
        />
      </View>
    </View>
  )
}

export const SortHistory = ({ setSortBy }) => {
  const data = ['-', 'Most Recent', 'Least Recent']
  return (
    <View>
      <View>
        <SelectDropdown
          buttonTextStyle={{ fontSize: 12 }}
          buttonStyle={{ width: 120, height: 40 }}
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
    <SearchBar
      placeholder="Search Conversations"
      value={searchBy}
      onChangeText={(text) => setSearchBy(text)}
    />
  )
}

export function sortedAndFiltered(session, filter, sortBy, searchBy) {
  let filtered =
    filter !== 'All'
      ? session.filter((session) => session.langTarget === filter)
      : session

  let sorted

  if (sortBy === '-') {
    sorted = filtered
  }

  if (sortBy === 'Least Recent') {
    sorted = [...filtered].sort((a, b) =>
      Number(a.date) < Number(b.date) ? -1 : 0,
    )
  }

  if (sortBy === 'Most Recent') {
    sorted = [...filtered].sort((a, b) =>
      Number(a.date) > Number(b.date) ? -1 : 0,
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
