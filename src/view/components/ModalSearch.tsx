import * as React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Modal, StatusBar} from 'react-native'
import SearchList from '@unpourtous/react-native-search-list'
import {ExerciseMuscle, MuscleGroups} from '../../core/types'

type IProps = {
  exercises: MuscleGroups[]
  closeModal: (close: boolean) => void
  selectExercise: (exercise: string, muscle: string) => void
}

type IState = {
  dataSource: ItemList[]
}

type ItemList = { searchStr: string, exercise: string, muscle: string }

class ModalSearch extends React.PureComponent<IProps, IState> {

  constructor() {
    super()
    this.state = {dataSource: []}
  }

  componentDidMount() {
    const dataSource = this.props.exercises.map((m: MuscleGroups) =>
      m.exercises.map((e: ExerciseMuscle) => {
        return {searchStr: `${e.name} (${e.equipment}) - ${m.muscle}`, exercise: e.name, muscle: m.muscle}
      })
    )
    this.setState({dataSource: [].concat.apply([], dataSource)})
  }

  renderRow(item: ItemList, rowID: string) {
    return (
      <View key={rowID} style={styles.row}>
        <TouchableOpacity onPress={() => this.props.selectExercise(item.exercise, item.muscle)}>
          <Text style={styles.itemListText}>{item.searchStr}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  emptyContent(searchStr: string) {
    return (
      <View style={styles.emptyContentView}>
        <Text style={styles.emptyContentText}> No result for <Text
          style={styles.emptyContentTextBold}>{searchStr}</Text></Text>
        <Text style={styles.emptyContentSearchAgain}>Please search again</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.searchListView}>
        <StatusBar barStyle="light-content"/>
        <Modal
          onRequestClose={() => console.log('close')}
          visible={true}
          transparent={true}
          animationType="slide">
          <SearchList
            data={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            emptyContent={this.emptyContent.bind(this)}





            sectionHeaderHeight={16}

            renderSectionHeader={}



            cellHeight={40}
            title="Search List"
            searchPlaceHolder="Search"
            customSearchBarStyle={{fontSize: 14}}
            onClickBack={() => {
              this.props.closeModal(true)
            }}
            leftButtonStyle={{justifyContent: 'flex-start'}}
            backIconStyle={{width: 8.5, height: 17}}
            activeSearchBarColor="#fff"
            showActiveSearchIcon
            searchBarActiveColor="#171a23"
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchListView: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  row: {
    flex: 1,
    marginLeft: 40,
    height: 40,
    justifyContent: 'center'
  },
  emptyContentView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  emptyContentText: {
    fontFamily: 'Montserrat-Regular',
    color: '#979797',
    fontSize: 18,
    paddingTop: 20
  },
  emptyContentTextBold: {
    fontFamily: 'Montserrat-Bold',
    color: '#171A23',
    fontSize: 18
  },
  emptyContentSearchAgain: {
    fontFamily: 'Montserrat-Regular',
    color: '#979797',
    fontSize: 18,
    alignItems: 'center',
    paddingTop: 10
  },
  itemListText: {
    fontFamily: 'Montserrat-Regular'
  }
})

export default ModalSearch
