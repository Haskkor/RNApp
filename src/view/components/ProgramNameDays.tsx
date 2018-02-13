import * as React from 'react'
import {ActionSheetIOS, Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

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
    this.buttonNextEnabled = this.buttonNextEnabled.bind(this)
  }

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
        title: 'Conflict: please select a value',
        options: ['Selected days', 'Number of days', 'Cancel'],
        cancelButtonIndex: 2
      },
      (buttonIndex) => {
        if (buttonIndex === 0) console.log('test1')
        else if (buttonIndex === 1) console.log('test2')
      })
  }

  buttonNextEnabled = () => {
    const {name, numberOfDays, weekdays} = this.state
    return name !== '' && (numberOfDays !== '' || weekdays.some((elem) => {
      return elem.training
    }))
  }

  render() {
    const {name, numberOfDays, weekdays} = this.state
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false} extraHeight={90}>
        <StatusBar barStyle="dark-content"/>
        <Text style={[styles.text, styles.elementsSeparator]}>Enter a name for the program:</Text>
        <TextInput
          style={[styles.textInput, styles.sectionSeparator, {width: 200}]}
          onChangeText={(text: string) => this.setState({name: text})}
          placeholder={'Type here'}
          value={name}
        />
        <Text style={[styles.text, styles.elementsSeparator]}>Select training days:</Text>
        <View style={styles.wrapperDay}>
          {weekdays.map((day: Day, index: number) => {
            return (
              <TouchableOpacity
                key={day.name}
                style={[styles.box, day.training ? styles.dayTrained : styles.dayOff,
                  index === weekdays.length - 1 && styles.sectionSeparator]}
                onPress={() => {
                  let weekdaysCopy = weekdays.slice()
                  weekdaysCopy[index] = {name: day.name, training: !day.training}
                  this.setState({weekdays: weekdaysCopy})
                }}>
                <Text style={styles.text}>{day.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <Text style={[styles.text, styles.elementsSeparator]}>Or enter a number of days trained:</Text>
        <TextInput
          style={[styles.textInput, styles.sectionSeparator, {width: 100}]}
          onChangeText={(text: string) => this.setState({numberOfDays: text})}
          placeholder={'Type here'}
          value={numberOfDays}
          keyboardType={'numeric'}
        />
        <TouchableOpacity
          style={[styles.buttons, styles.shadow]}
          disabled={!this.buttonNextEnabled()}
          onPress={() => {
            if ((numberOfDays !== '' && weekdays.some((elem) => {
                return elem.training
              }))) this.showActionSheet()
            else this.props.navigation.navigate('ProgramExercises', {title: 'Exercises'})
          }}
        >
          <Text style={[styles.text, !this.buttonNextEnabled() && styles.textDisabled]}>Next</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  },
  textDisabled: {
    color: '#CBCDCB'
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
    margin: 2,
    borderWidth: 2,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    width: Dimensions.get('window').width / 2.7,
    height: 'auto',
    minHeight: 40,
    justifyContent: 'center',
    padding: 5
  },
  wrapperDay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
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
  },
  sectionSeparator: {
    marginBottom: 40
  }
})

export default ProgramNameDays
