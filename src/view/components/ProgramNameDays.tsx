import * as React from 'react'
import {ActionSheetIOS, Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as loDash from 'lodash'
import {grid} from '../../utils/grid'
import {colors} from '../../utils/colors'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {
  name: string
  numberOfDays: string
  weekdays: Day[]
}

export type Day = {
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
        if (buttonIndex === 0) {
          this.props.navigation.navigate('ProgramExercises', {
            title: 'Exercises',
            days: this.state.weekdays.filter((day: Day) => {
              if (day.training) return day.name
            }).map((day: Day) => day.name)
          })
        } else if (buttonIndex === 1) {
          this.props.navigation.navigate('ProgramExercises', {
            title: 'Exercises',
            days: loDash.range(+this.state.numberOfDays).map((value: number) => value.toString())
          })
        }
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
          style={[styles.textInput, styles.sectionSeparator, {width: grid.unit * 12.5}]}
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
              }))) {
              this.showActionSheet()
            } else {
              this.props.navigation.navigate('ProgramExercises', {
                title: 'Exercises',
                days: numberOfDays === '' ? weekdays.filter((day: Day) => {
                    if (day.training) return day.name
                  }).map((day: Day) => day.name) :
                  loDash.range(+numberOfDays).map((value: number) => (value + 1).toString())
              })
            }
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
    fontSize: grid.body,
    color: colors.base
  },
  textDisabled: {
    color: colors.textDisabled
  },
  textInput: {
    fontSize: grid.body,
    padding: grid.unit * 0.75,
    fontFamily: grid.font,
    color: colors.base,
    borderColor: colors.base,
    borderWidth: grid.heavyBorder,
    borderRadius: grid.radiusTextInput
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: grid.unit * 2
  },
  box: {
    backgroundColor: colors.white,
    margin: 2,
    borderWidth: grid.heavyBorder,
    borderRadius: grid.radiusBox,
    overflow: 'hidden',
    alignItems: 'center',
    width: Dimensions.get('window').width / 2.7,
    height: 'auto',
    minHeight: grid.unit * 2.5,
    justifyContent: 'center',
    padding: grid.unit / 4
  },
  wrapperDay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  dayTrained: {
    borderColor: colors.orange
  },
  dayOff: {
    borderColor: colors.base
  },
  shadow: {
    backgroundColor: colors.white,
    borderRadius: grid.unit / 4,
    padding: grid.unit / 2,
    borderWidth: grid.regularBorder,
    borderColor: colors.lightAlternative,
    borderBottomWidth: 0,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: grid.highOpacity,
    shadowRadius: grid.unit / 8,
    elevation: 1
  },
  elementsSeparator: {
    marginBottom: grid.unit * 1.25
  },
  sectionSeparator: {
    marginBottom: grid.unit * 2.5
  }
})

export default ProgramNameDays
