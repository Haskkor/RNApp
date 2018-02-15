import * as React from 'react'
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {
  exercisesDay: any[] // fixme any
}

class ProgramExercises extends React.PureComponent<IProps, IState> {

  static navigationOptions = HeaderStackNavigator.navigationOptions

  renderHeaderSection = (day: string, index: number) => {
    return (
      <View style={{
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        backgroundColor: '#F7F7F8',
        borderBottomWidth: 1,
        borderTopWidth: index === 0 ? 1 : 0,
        borderColor: '#445878'
      }}>
        <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 12, color: '#445878'}}>{day}</Text>
      </View>
    )
  }

  renderSectionDay = (day: string, index: number) => {
    return (
      <View key={day}>
        {this.renderHeaderSection(day, index)}

      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        {this.props.navigation.state.params.days.map((day: string, index: number) => {
          return this.renderSectionDay(day, index)
        })}
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
