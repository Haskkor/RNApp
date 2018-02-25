import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import {grid} from '../../utils/grid'
import {colors} from '../../utils/colors'
import {HeaderStatus} from '../../core/enums'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
  textColor: string
  colorHeader: string
  colorBorder: string
  title: string
  secondaryIcon?: string
  secondaryFunction?: () => void
  status: HeaderStatus
}

type IState = {}

class Header extends React.PureComponent<IProps, IState> {
  render() {
    const {navigation, textColor, colorBorder, colorHeader, title, secondaryFunction, secondaryIcon, status} = this.props
    return (
      <View style={[styles.header, {borderColor: colorBorder, backgroundColor: colorHeader}]}>
        <View style={[styles.viewSemiFlex, {marginLeft: grid.unit * 1.25}]}>
          {status === HeaderStatus.drawer &&
          <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
            <Icon name="fitness-center" size={grid.navIcon} color={textColor}/>
          </TouchableOpacity> || status === HeaderStatus.editExercise &&
          <TouchableOpacity style={styles.containerButtonBack} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={grid.navIcon} color={colors.base} style={styles.icon}/>
            <Text style={styles.text}>Back</Text></TouchableOpacity>}
        </View>
        <View style={styles.viewFlex}>
          <Text style={[styles.title, {color: textColor}]}>{title}</Text>
        </View>
        <View style={[styles.viewSemiFlex, styles.secondaryIconView]}>
          {secondaryIcon && <TouchableOpacity onPress={() => secondaryFunction()}>
            <Icon name={secondaryIcon} size={grid.navIcon} color={textColor}/>
          </TouchableOpacity>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: grid.smallBorder,
    paddingTop: grid.unit * 2,
    paddingBottom: grid.unit,
    flexDirection: 'row'
  },
  title: {
    fontFamily: grid.fontBold,
    color: colors.base,
    alignSelf: 'center'
  },
  pickerItem: {
    fontSize: grid.subHeader
  },
  viewFlex: {
    flex: 1
  },
  viewSemiFlex: {
    flex: 0.5
  },
  secondaryIconView: {
    marginRight: grid.unit * 1.25,
    alignItems: 'flex-end'
  },
  containerButtonBack: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: grid.caption,
    fontFamily: grid.fontBold,
    color: colors.base
  },
  icon: {
    paddingRight: grid.unit
  }
})

export default Header
