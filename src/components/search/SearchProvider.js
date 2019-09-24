import React, {
  createContext
  // useState, useEffect, useCallback
} from 'react'
import useReactRouter from 'use-react-router'
import { queryStringToState, stateToQueryString } from './search-utils'
import { getSortOrderOptions } from './sort-order'

export const SearchContext = createContext({})

export const SearchProvider = ({ children }) => {
  const { history, location } = useReactRouter()

  const { query, selectedTags, page, sort } = queryStringToState(
    location.search
  )

  const onChange = changes => {
    const queryString = stateToQueryString({
      query,
      selectedTags,
      page: 1,
      sort,
      ...changes
    })
    const path = queryString ? `/projects?${queryString}` : '/' // back to the homepage if there is no query
    history.push(path)
  }

  const sortOrderOptions = getSortOrderOptions({ showBookmark: true })
  const sortOption =
    sortOrderOptions.find(item => item.id === sort) || sortOrderOptions[0]

  return (
    <SearchContext.Provider
      value={{ selectedTags, query, sort, page, sortOption, history, onChange }}
    >
      {children}
    </SearchContext.Provider>
  )
}
