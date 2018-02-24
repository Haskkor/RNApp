import { combineReducers } from 'redux'
import * as loDash from 'lodash'
import programs from './programs'

const initialState = {}

const subReducers = combineReducers({
  programs
})

export default function reducer (state = initialState, action: any) { // fixme any
  const entities = loDash.result(action, 'payload.normalized.entities')
  if (entities) {
    const newState: any = loDash.assign({}, state) // fixme any
    loDash.forOwn(entities, (items, key) => {
      newState[key] = {...newState[key], ...items}
    })
    return newState
  }
  return subReducers(state, action)
}
