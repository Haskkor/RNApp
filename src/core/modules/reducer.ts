import { combineReducers } from 'redux'
import me from './me'
import container from './container/reducer'
import entities from './entities/reducer'

export default combineReducers({
  me,
  container,
  entities,
})
