import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {connect, Dispatch} from 'react-redux'
import * as meDuck from '../../core/modules/me'
import * as AppDuck from '../../core/modules/container/App'
import {bindActionCreators} from 'redux'
import StopWatch from '../components/StopWatch'

type IProps = {
  session: ReduxState.Session,
  container: ReduxState.AppContainer,
  loadMe: typeof meDuck.load,
  loadQuestion: typeof AppDuck.loadQuestionStart
}

type IState = {}

const mapStateToProps = (rootState: ReduxState.RootState) => ({
  session: rootState.session,
  container: rootState.container.App
})

const mapDispatchToProps =
  (dispatch: Dispatch<any>) => bindActionCreators({
    loadMe: meDuck.load,
    loadQuestion: AppDuck.loadQuestionStart
  }, dispatch)

class App extends React.PureComponent<IProps, IState> {
  loadQuestion = () => {
    this.props.loadQuestion({id: 'transactionOnly'})
  }

  render() {
    const {container} = this.props
    console.log('container', container)
    return (
      <View style={styles.container}>
        <StopWatch/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
