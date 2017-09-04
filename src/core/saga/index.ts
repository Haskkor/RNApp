import axios, * as Axios from 'axios'
import { call, fork, put, select, take, all, takeLatest } from 'redux-saga/effects'
import config from '../../utils/config'
import * as meDuck from '../modules/me'
import * as appDuck from '../modules/container/App'
import { responseSchemasTypes } from '../middlewares/NormalizrMiddleware'
import {Action} from 'redux-actions'

function* loadQuestions (action: Action<appDuck.LoadQuestionStartPayload>) {
  try {
    const response: Axios.AxiosResponse = yield axios({ // Fixme 'any'
      method: 'get',
      url: `${config.serverApi}/form/${action.payload.id}`
    })
    console.log('response', response)
    yield put(appDuck.loadQuestionSuccess({
      data: response.data
    }))
  } catch (err) {
    console.warn('me failed', err)
    yield put(appDuck.loadQuestionFail(err))
  }
}

function* root () {
  yield takeLatest(appDuck.LOAD_QUESTION_START, loadQuestions)
}

export default root
