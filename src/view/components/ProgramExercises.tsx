import * as React from 'react'
import {ScrollView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import * as SortableListView from 'react-native-sortable-listview'
import {Day} from './ProgramNameDays'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {}

class ProgramExercises extends React.PureComponent<IProps, IState> {

  static navigationOptions = HeaderStackNavigator.navigationOptions

  render() {
    console.log(this.props.navigation.state.params.days)
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        {}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ProgramExercises
