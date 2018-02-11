import * as React from 'react'
import {ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {
  name: string
  numberOfDays: string
  weekdays: Day[]
}

type Day = {
  name: string,
  training: boolean
}

class ProgramNameDays extends React.PureComponent<IProps, IState> {

  static navigationOptions = HeaderStackNavigator.navigationOptions

  constructor() {
    super()
    this.state = {
      name: '',
      numberOfDays: '',
      weekdays: [
        {name: 'Monday', training: false},
        {name: 'Tuesday', training: false},
        {name: 'Wednesday', training: false},
        {name: 'Thursday', training: false},
        {name: 'Friday', training: false},
        {name: 'Saturday', training: false},
        {name: 'Sunday', training: false}
      ]
    }
  }

  render() {
    const {name, numberOfDays, weekdays} = this.state
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Text style={styles.text}>Enter a name for the program</Text>
        <TextInput
          style={{borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text: string) => this.setState({name: text})}
          placeholder={'Type here'}
          value={name}
        />
        <Text style={styles.text}>Select training days:</Text>
        {weekdays.map((day: Day, index: number) => {
          return (
            <TouchableOpacity
              style={day.training ? styles.dayTrained : styles.dayOff}
              onPress={() => {
                let weekdaysCopy = weekdays.slice()
                weekdaysCopy[index] = {name: day.name, training: !day.training}
                this.setState({weekdays: weekdaysCopy})
              }}>
              <Text>{day.name}</Text>
            </TouchableOpacity>
          )
        })}
        <Text style={styles.text}>Or enter a number of days trained:</Text>
        <TextInput
          style={{borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text: string) => this.setState({numberOfDays: text})}
          placeholder={'Type here'}
          value={numberOfDays}
          keyboardType={'numeric'}
        />
        <TouchableOpacity style={[styles.buttons, styles.shadow]}>
          <Text>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  },
  dayTrained: {

  },
  dayOff: {

  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30
  },
  shadow: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
})

export default ProgramNameDays
