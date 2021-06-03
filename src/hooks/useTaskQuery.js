import { useRouter } from 'next/router'
import { useReducer } from 'react'

const useTaskQuery = () => {
  const router = useRouter()

  const initialState = {
    page: 1,
    size: 10,
    states: '',
    storeId: '',
    ...router.query,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'change':
        return {
          ...state,
          ...action.data,
          states: action.data.states?.join(',') || '',
        }
      default:
        return state
    }
  }

  return useReducer(reducer, initialState)
}

export default useTaskQuery
