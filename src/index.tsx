/// <reference path='./interfaces/index.d.ts'/>
import 'regenerator-runtime/runtime'
import * as React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import createStore from './core/create'
import {Provider} from 'react-redux'
import App from './view/navigators/App'

export const store = createStore();

(console as any).disableYellowBox = true // any is a hack

class OnBoardingApp extends React.Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <App/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('OnBoardingApp', () => OnBoardingApp)
