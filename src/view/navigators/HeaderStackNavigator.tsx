import * as React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

type IProps = {
  navigation: any
}

type IState = {}

class HeaderStackNavigator extends React.PureComponent<IProps, IState> {

  static navigationOptions = ({ navigation }: any) => ({
    title: navigation.state.params.title,
    headerLeft: <TouchableOpacity style={styles.container} onPress={() => { navigation.goBack() } }>
      <Icon name="arrow-back" size={22} color="#445878" style={styles.icon}/>
      <Text style={styles.text}>Back</Text></TouchableOpacity>,
    headerStyle: {
      height: 52,
      backgroundColor: '#F7F7F8',
      paddingLeft: 16,
      paddingRight: 16,
      borderBottomColor: '#445878',
      borderBottomWidth: 0.5
    },
    headerTitleStyle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 14,
      color: '#445878'
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
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: '#445878'
  },
  icon: {
    paddingRight: 10
  }
})
