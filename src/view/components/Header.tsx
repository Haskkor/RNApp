import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

type IProps = {
  navigation: any
  textColor: string
  colorHeader: string
  colorBorder: string
  title: string
}

type IState = {}

class Header extends React.PureComponent<IProps, IState> {
  render() {
    const {navigation, textColor, colorBorder, colorHeader, title} = this.props
    return (
      <View style={[styles.header, {borderColor: colorBorder, backgroundColor: colorHeader}]}>
        <View style={[styles.viewFlex, {marginLeft: 20}]}>
          <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
            <Icon name="fitness-center" size={22} color={textColor}/>
          </TouchableOpacity>
        </View>
        <View style={styles.viewFlex}>
          <Text style={[styles.title, {color: textColor}]}>{title}</Text>
        </View>
        <View style={styles.viewFlex}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0.5,
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: 'row'
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600'
  },
  pickerItem: {
    fontSize: 18
  },
  viewFlex: {
    flex: 1
  }
})

export default Header
