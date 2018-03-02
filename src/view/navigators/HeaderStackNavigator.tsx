import * as React from 'react'
import {Text, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {grid} from '../../utils/grid'
import {colors} from '../../utils/colors'

type IProps = {
  navigation: any
}

type IState = {}

class HeaderStackNavigator extends React.PureComponent<IProps, IState> {

  static navigationOptions = ({navigation}: any) => {
    // this.navigationOptions.
    console.log(navigation.state.params.rightButtonEnabled)
    const {rightButtonEnabled} = navigation.state.params
    return {
      title: navigation.state.params.title,
      headerLeft: <TouchableOpacity style={styles.container} onPress={() => {
        navigation.goBack()
      }}>
        <Icon name="arrow-back" size={grid.navIcon} color={colors.base} style={styles.icon}/>
        <Text style={styles.text}>Back</Text></TouchableOpacity>,
      headerRight: navigation.state.params.rightButtonText &&
      <TouchableHighlight disabled={!navigation.state.params.rightButtonEnabled}
                        style={
                          [
                            navigation.state.params.rightButtonEnabled ? styles.container : styles.containerDisabled,
                            {borderBottomWidth: 3, borderBottomColor:  rightButtonEnabled ? 'red' : 'blue'}
                          ]
                        }
                        onPress={() => navigation.state.params.rightButtonFunction()}>
        <Text style={styles.text}>{navigation.state.params.rightButtonText}</Text>
      </TouchableHighlight>,
      headerStyle: {
        height: grid.unit * 3.25,
        backgroundColor: colors.light,
        paddingLeft: grid.unit,
        paddingRight: grid.unit,
        borderBottomColor: colors.base,
        borderBottomWidth: grid.smallBorder
      },
      headerTitleStyle: {
        fontFamily: grid.fontBold,
        fontSize: grid.body,
        color: colors.base
      }
    }
  }
}

export default HeaderStackNavigator

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 1
  },
  containerDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: grid.lowOpacity
  },
  text: {
    fontSize: grid.caption,
    fontFamily: grid.fontBold,
    color: colors.base
  },
  icon: {
    paddingRight: grid.unit
  },
  iconRight: {
    paddingLeft: grid.unit
  }
})
