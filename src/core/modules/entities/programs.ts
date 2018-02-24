import {Action, createAction, handleActions} from 'redux-actions'

export const GET = 'PL/PROGRAMS/GET'
export const SET = 'PL/PROGRAMS/SET'

export type SetProgramsPayload = {}

const initialState: ReduxState.Programs = {}

export default handleActions({
  [GET]: (state: ReduxState.Programs, action: Action<null>) => ({
    ...state
  }),
  [SET]: (state: ReduxState.Programs, action: Action<SetProgramsPayload>) => ({
    ...state
  })
, initialState)

export const get = createAction<null>(GET)
export const set = createAction<SetProgramsPayload>(SET)
