import { combineReducers } from 'redux'
import parties from './parties'
import accounts from './accounts'
import advisers from './advisers'
import accountParties from './accountParties'
import * as lodash from 'lodash'

const initialState = {
}

const subReducers = combineReducers({
  accountParties,
  parties,
  accounts,
  advisers
})

export default function reducer (state = initialState, action: any) { // fixme any
  const entities = lodash.result(action, 'payload.normalized.entities')
  if (entities) {
    const newState: any = lodash.assign({}, state) // fixme any
    lodash.forOwn(entities, (items, key) => {
      newState[key] = {...newState[key], ...items}
    })
    return newState
  }
  return subReducers(state, action)
}
