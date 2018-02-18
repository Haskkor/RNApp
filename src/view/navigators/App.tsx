import * as React from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import MainDrawerNav from './MainDrawerNav'

type IProps = {}

type IState = {}

class App extends React.PureComponent<IProps, IState> {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <MainDrawerNav/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
