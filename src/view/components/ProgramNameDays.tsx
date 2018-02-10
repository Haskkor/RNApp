import * as React from 'react'
import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import HeaderStackNavigator from '../navigators/HeaderStackNavigator'
import {Col, Row, Grid} from 'react-native-easy-grid'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {}

class ProgramNameDays extends React.PureComponent<IProps, IState> {

  static navigationOptions = HeaderStackNavigator.navigationOptions

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Grid style={styles.grid}>
          <Row size={10} style={styles.rows}>
            <Text>Enter a name for the program</Text>
          </Row>
          <Row size={10} style={styles.rows}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={() => console.log('test')}
              value={}
            />
          </Row>
          <Row size={35} style={styles.rows}>
            <Col size={75} style={styles.columns}>
            </Col>
          </Row>
        </Grid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  grid: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    marginRight: 20,
    marginLeft: 20
  },
  columns: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rows: {
    margin: 10
  }
})

export default ProgramNameDays
