import * as React from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {}

class ProgramNameDays extends React.PureComponent<IProps, IState> {


  static navigationOptions = HeaderStackNavigator.navigationOptions

  render() {
    console.log(this.props.navigation)
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

export default ProgramNameDays
