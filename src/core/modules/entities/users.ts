import { createAction, handleActions } from 'redux-actions'

export const GET = 'OV/USERS/GET'
export const GET_SUCCESS = 'OV/USERS/GET_SUCCESS'
export const GET_FAIL = 'OV/USERS/GET_FAIL'

export default handleActions({
  [GET]: (state) => state,
  [GET_SUCCESS]: (state, action: any) => {
      return (
    {
      ...action.payload,
      loaded: true
    }
  )},
  [GET_FAIL]: (state) => state
}, { loaded: false }
)

export const get = createAction<null>(GET)

export const getSuccess = createAction<any>(GET_SUCCESS)

export const getFail = createAction<null>(GET_FAIL)



