import {Action, createAction, handleActions} from 'redux-actions'

export const SET = 'PL/PROGRAMS/SET'

export type SetProgramsPayload = {
  program: ServerEntity.Program,
  index: number
}
const initialState: ReduxState.Programs = {}

export default handleActions({
  [SET]: (state: ReduxState.Programs, action: Action<SetProgramsPayload>) => ({
    ...state
  })
}, initialState)

export const set = createAction<SetProgramsPayload>(SET)
