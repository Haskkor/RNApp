import { createAction, handleActions, handleAction, combineActions, Action } from 'redux-actions'

export const LOAD_QUESTION_START = 'OB/APP/LOAD_QUESTION/START'
export const LOAD_QUESTION_SUCCESS = 'OB/APP/LOAD_QUESTION/SUCCESS'
export const LOAD_QUESTION_FAIL = 'OB/APP/LOAD_QUESTION/FAIL'

export type LoadQuestionStartPayload = {
  id: string
}

export type LoadQuestionSuccessPayload = {
}

export type LoadQuestionFailPayload = {
}

const initialState: ReduxState.AppContainer = {
  mainControl: undefined,
  questionLoaded: false
}

export default handleActions({
  [LOAD_QUESTION_START]: (state: ReduxState.AppContainer, action: Action<LoadQuestionStartPayload>) => ({
    ...state
  }),
  [LOAD_QUESTION_SUCCESS]: (state: ReduxState.AppContainer, action: Action<LoadQuestionSuccessPayload>) => ({
    ...state,
    loaded: true
  }),
  [LOAD_QUESTION_FAIL]: (state: ReduxState.AppContainer, action: Action<LoadQuestionFailPayload>) => ({
    ...state,
    loaded: false
  })
}, initialState)

export const loadQuestionStart = createAction<LoadQuestionStartPayload>(LOAD_QUESTION_START)
export const loadQuestionSuccess = createAction<LoadQuestionSuccessPayload>(LOAD_QUESTION_SUCCESS)
export const loadQuestionFail = createAction<LoadQuestionFailPayload>(LOAD_QUESTION_FAIL)
