import { createAction, handleActions } from 'redux-actions'

export const LOAD = 'OV/me/LOAD'
export const LOAD_SUCCESS = 'OV/me/LOAD_SUCCESS'
export const LOAD_FAIL = 'OV/me/LOAD_FAIL'

export default handleActions({
  [LOAD]: (state) => state,
  [LOAD_SUCCESS]: (state, action: any) => (
    {
      ...action.payload.normalized.result,
      loaded: true
    }
  ),
  [LOAD_FAIL]: (state) => state
}, { loaded: false }
)

export const load = createAction<null>(LOAD)

export const loadSuccess = createAction<any>(LOAD_SUCCESS)

export const loadFail = createAction<null>(LOAD_FAIL)

/* example of type guard

type Action1 = {
  type: 'Action1',
  payload: string
}

type Action2 = {
  type: 'Action2'
  payload: {
    b: string,
    a: number
  },
}

type myAction = Action1 | Action2

const a = (state: any, action: myAction) => {
  switch (action.type) {
    case 'Action2':
      const b = action.payload.b
      break
    case 'Action1':
      const a = action.payload
      break
  }
}

*/
