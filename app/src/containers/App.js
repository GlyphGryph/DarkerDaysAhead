import React from 'react'
import { connect } from 'react-redux'
import CurrentGrid from '../containers/CurrentGrid'
import CurrentErrors from '../containers/CurrentErrors'
import { userInput } from '../actions'

class App extends React.Component{
 constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    this.props.keyPressed(event.key)
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
        <CurrentGrid />
        <CurrentErrors />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    keyPressed: (keyCode)=>{
      return dispatch(userInput(keyCode))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
