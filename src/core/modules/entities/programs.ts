import {Action, createAction, handleActions} from 'redux-actions'

export const SET = 'PL/PROGRAMS/SET'

export type SetProgramsPayload = {
  program: ServerEntity.Program,
  index: number
}
const initialState: ReduxState.Programs = []

export default handleActions({
  [SET]: (state: ReduxState.Programs, action: Action<SetProgramsPayload>) => {
    let programsCopy = state.slice()
    if (action.payload.index) {
      programsCopy[action.payload.index] = action.payload.program
    } else {
      programsCopy.push(action.payload.program)
    }
    return programsCopy
  }
}, initialState)

export const setPrograms = createAction<SetProgramsPayload>(SET)
