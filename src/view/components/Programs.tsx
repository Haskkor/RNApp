import * as React from 'react'
import {Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Header from './Header'
import * as SortableListView from 'react-native-sortable-listview'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as LottieView from 'lottie-react-native'
import {NavigationAction, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import {grid} from '../../utils/grid'
import {colors} from '../../utils/colors'

type IProps = {
  navigation: NavigationScreenProp<NavigationRoute<any>, NavigationAction>
}

type IState = {
  programs: any[] // todo fix when programs will have a shape
  progressAnimation: Animated.Value
}

class Programs extends React.PureComponent<IProps, IState> {
  order: string[]
  animation: any

  constructor() {
    super()
    this.state = {programs: [], progressAnimation: new Animated.Value(0)}
    this.order = Object.keys(this.state.programs)
  }

  componentDidMount() {
    this.animation.play()
  }

  render() {
    const {programs, progressAnimation} = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Header
          navigation={this.props.navigation}
          colorBorder={colors.headerBorderLight}
          colorHeader={colors.headerLight}
          textColor={colors.base}
          title="Programs"
          secondaryIcon="add"
          secondaryFunction={() => this.props.navigation.navigate('ProgramNameDays', {title: 'Name and Days'})}
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
              onPress={() => this.props.navigation.navigate('ProgramNameDays', {title: 'Name and Days'})}>
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

export default Programs
