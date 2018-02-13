import * as React from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {}

class ProgramExercises extends React.PureComponent<IProps, IState> {

  static navigationOptions = HeaderStackNavigator.navigationOptions

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ProgramExercises
