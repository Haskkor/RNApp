import * as React from 'react'
import {Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Header from './Header'
import * as SortableListView from 'react-native-sortable-listview'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as LottieView from 'lottie-react-native'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import {grid} from '../../utils/grid'
import {colors} from '../../utils/colors'
import {HeaderStatus} from '../../core/enums'
import {connect, Dispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ProgramsActions from '../../core/modules/entities/programs'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
  programs: ServerEntity.Program[]
  setPrograms: typeof ProgramsActions.setPrograms
}

type IState = {
  progressAnimation: Animated.Value
}

class Programs extends React.PureComponent<IProps, IState> {
  order: string[]
  animation: any

  constructor() {
    super()
    this.state = {progressAnimation: new Animated.Value(0)}
    this.saveProgram = this.saveProgram.bind(this)
  }

  componentDidMount() {
    this.order = Object.keys(this.props.programs)
    if (this.props.programs.length === 0) this.animation.play()
  }

  saveProgram = (program: ServerEntity.Program, index: number) => {
    this.props.setPrograms({index: index, program: program})
  }

  render() {
    const {progressAnimation} = this.state
    const {programs} = this.props
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Header
          navigation={this.props.navigation}
          colorBorder={colors.headerBorderLight}
          colorHeader={colors.headerLight}
          textColor={colors.base}
          status={HeaderStatus.drawer}
          title="Programs"
          secondaryIcon="add"
          secondaryFunction={() => this.props.navigation.navigate('ProgramNameDays', {
            title: 'Name and Days',
            saveProgram: this.saveProgram
          })}
        />
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
          <View style={styles.viewTextNoProgram}>
            <Icon name="error-outline" size={26} color={colors.base} style={styles.iconNoProgram}/>
            <Text style={styles.textNoProgram}>You have no programs created yet</Text>
          </View>
          <View style={styles.viewAnimationNoProgram}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ProgramNameDays', {
                title: 'Name and Days',
                saveProgram: this.saveProgram
              })}>
              <LottieView
                ref={(ref: any) => this.animation = ref}
                loop={true}
                speed={0.6}
                style={{
                  width: grid.unit * 3,
                  height: grid.unit * 3
                }}
                progress={progressAnimation}
                source={require('../../../assets/lottie/add_button.json')}
              />
            </TouchableOpacity>
          </View>
        </View>}
      </View>
    )
  }
}

const mapStateToProps = (rootState: ReduxState.RootState) => {
  return {
    programs: rootState.entities.programs
  }
}

const mapDispatchToProps =
  (dispatch: Dispatch<any>) => bindActionCreators({
    setPrograms: ProgramsActions.setPrograms
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Programs)

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
    flexDirection: 'column'
  },
  iconNoProgram: {
    marginRight: grid.unit * 1.5
  },
  viewTextNoProgram: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textNoProgram: {
    fontFamily: grid.font,
    color: colors.base
  },
  viewAnimationNoProgram: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: grid.unit * 2.5
  }
})
