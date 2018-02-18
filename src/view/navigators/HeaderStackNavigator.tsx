import * as React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {grid} from '../../utils/grid'
import {colors} from '../../utils/colors'

type IProps = {
  navigation: any
}

type IState = {}

class HeaderStackNavigator extends React.PureComponent<IProps, IState> {

  static navigationOptions = ({ navigation }: any) => ({
    title: navigation.state.params.title,
    headerLeft: <TouchableOpacity style={styles.container} onPress={() => { navigation.goBack() } }>
      <Icon name="arrow-back" size={grid.navIcon} color={colors.base} style={styles.icon}/>
      <Text style={styles.text}>Back</Text></TouchableOpacity>,
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
  })
}

export default HeaderStackNavigator

const styles = StyleSheet.create({
  container: {
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
