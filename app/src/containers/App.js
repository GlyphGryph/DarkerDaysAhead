import React from 'react'
import { connect } from 'react-redux'
import ViewContainer from '../containers/ViewContainer'
import StatusContainer from '../containers/StatusContainer'
import CurrentErrors from '../containers/CurrentErrors'
import { userInput } from '../actions'

class App extends React.Component{
 constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    this.props.dataStore.dispatch(userInput(event.key))
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  render(){
    return (
      <div>
        <ViewContainer />
        <StatusContainer />
        <CurrentErrors />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    keyPressed: (keyCode)=>{
      return dispatch(userInput(keyCode))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
