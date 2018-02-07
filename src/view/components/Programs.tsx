import * as React from 'react'
import {StatusBar, StyleSheet, Text, View} from 'react-native'
import Header from './Header'
import * as SortableListView from 'react-native-sortable-listview'
import Icon from 'react-native-vector-icons/MaterialIcons'

type IProps = {
  navigation: any
}

type IState = {
  programs: any[] // todo fix when programs will have a shape
}

class Programs extends React.PureComponent<IProps, IState> {
  order: string[]

  constructor() {
    super()
    this.state = {programs: []}
    this.order = Object.keys(this.state.programs)
  }

  render() {
    const {programs} = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Header
          navigation={this.props.navigation}
          colorBorder="#000"
          colorHeader="#F7F7F8"
          textColor="#000"
          title="Programs"/>
        {programs.length > 0 && <SortableListView
          style={styles.sortableList}
          data={programs}
          order={this.order}
          onRowMoved={(e: any) => {
            this.order.splice(e.to, 0, this.order.splice(e.from, 1)[0])
          }}
          renderRow={(row: any) => row && <View/> || <View/>}
        /> ||
        <View style={styles.viewNoPrograms}>
          <Icon name="error-outline" size={26} color="#000" style={styles.iconNoProgram}/>
          <Text style={styles.textNoProgram}>You have no programs created yet</Text>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sortableList: {
    flex: 1
  },
  viewNoPrograms: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconNoProgram: {
    marginRight: 20
  },
  textNoProgram: {
    fontFamily: 'Montserrat-Regular'
  }
})

export default Programs
