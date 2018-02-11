import * as React from 'react'
import {Dimensions, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'
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
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Text style={[styles.text, styles.elementsSeparator]}>Enter a name for the program:</Text>
        <TextInput
          style={[styles.textInput, styles.elementsSeparator, {width: 200}]}
          onChangeText={(text: string) => this.setState({name: text})}
          placeholder={'Type here'}
          value={name}
        />
        <Text style={[styles.text, styles.elementsSeparator]}>Select training days:</Text>
        {weekdays.map((day: Day, index: number) => {
          return (
            <TouchableOpacity
              key={day.name}
              style={[styles.box, day.training ? styles.dayTrained : styles.dayOff,
                index === weekdays.length - 1 && styles.elementsSeparator]}
              onPress={() => {
                let weekdaysCopy = weekdays.slice()
                weekdaysCopy[index] = {name: day.name, training: !day.training}
                this.setState({weekdays: weekdaysCopy})
              }}>
              <Text style={styles.text}>{day.name}</Text>
            </TouchableOpacity>
          )
        })}
        <Text style={[styles.text, styles.elementsSeparator]}>Or enter a number of days trained:</Text>
        <TextInput
          style={[styles.textInput, styles.elementsSeparator, {width: 100}]}
          onChangeText={(text: string) => this.setState({numberOfDays: text})}
          placeholder={'Type here'}
          value={numberOfDays}
          keyboardType={'numeric'}
        />
        <TouchableOpacity style={[styles.buttons, styles.shadow]}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 30,
    marginTop: 30
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  },
  textInput: {
    fontSize: 14,
    padding: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    borderColor: '#171A23',
    borderWidth: 2,
    borderRadius: 20
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30
  },
  box: {
    backgroundColor: '#FFF',
    marginTop: 2,
    marginBottom: 2,
    borderWidth: 2,
    borderRadius: 4,
    overflow: 'hidden',
    width: Dimensions.get('window').width / 1.4,
    height: 'auto',
    minHeight: 40,
    justifyContent: 'center',
    padding: 5
  },
  dayTrained: {
    borderColor: '#EFC154'
  },
  dayOff: {
    borderColor: '#171A23'
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
  },
  elementsSeparator: {
    marginBottom: 20
  }
})

export default ProgramNameDays
