import * as React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import SearchList from '@unpourtous/react-native-search-list'

type IProps = {}

type IState = {
  dataSource: ItemList[]
}

type ItemList = {'searchStr': string}

class ModalSearch extends React.PureComponent<IProps, IState> {

  constructor () {
    super()
    this.state = {
      dataSource: [
        {'searchStr': 'A1'},
        {'searchStr': 'B1'},
        {'searchStr': 'A2'},
        {'searchStr': 'C1'},
        {'searchStr': 'Linder'},
        {'searchStr': '林林'},
        {'searchStr': '王五'},
        {'searchStr': '张三'},
        {'searchStr': '张二'},
        {'searchStr': '李四'}]
    }
  }

  renderRow (item: ItemList, rowID: string) {
    return (
      <View key={rowID} style={{flex: 1, marginLeft: 40, height: 40, justifyContent: 'center'}}>
        <Text>{item.searchStr}</Text>
      </View>
    )
  }

  emptyContent (searchStr: string) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 50
      }}>
        <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> No Result For <Text
          style={{color: '#171a23', fontSize: 18}}>{searchStr}</Text></Text>
        <Text style={{color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10}}>Please search again</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#efefef',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}>
        <SearchList
          data={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          emptyContent={this.emptyContent.bind(this)}
          cellHeight={40}
          title='Search List'
          searchPlaceHolder='Search'
          customSearchBarStyle={{
            fontSize: 14
          }}
          onClickBack={() => {}}
          leftButtonStyle={{justifyContent: 'flex-start'}}
          backIconStyle={{width: 8.5, height: 17}}
          activeSearchBarColor='#fff'
          showActiveSearchIcon
          searchBarActiveColor='#171a23'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default ModalSearch
