import * as React from 'react'
import {LayoutAnimation, StyleSheet, TouchableOpacity} from 'react-native'
import { connect, Dispatch } from 'react-redux'
import * as meDuck from '../../core/modules/me'
import * as AppDuck from '../../core/modules/container/App'
import {
  View,
  Text
} from 'react-native'
import { bindActionCreators } from 'redux'

type IProps = {
  session: ReduxState.Session,
  container: ReduxState.AppContainer,
  loadMe: typeof meDuck.load,
  loadQuestion: typeof AppDuck.loadQuestionStart
}

type IOwnProps = {}

type IState = {}

const mapStateToProps = (rootState: ReduxState.RootState, ownProps: IOwnProps) => ({
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

  render () {
    const { container, session } = this.props;
    console.log('container', container)
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.loadQuestion}>
          <Text> Load Questions </Text>
        </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
