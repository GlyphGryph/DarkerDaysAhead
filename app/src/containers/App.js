import React from 'react'
import { connect } from 'react-redux'
import CurrentGrid from '../containers/CurrentGrid'
import { newGrid } from '../actions'

class App extends React.Component{
 constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    this.props.keyPressAction(event.keyCode);
  }

  componentDidMount() {
     document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
     document.removeEventListener('keypress', this.handleKeyPress);
  }

  render(){
    return (
      <div>
        <CurrentGrid />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    keyPressAction: keyCode => {
      dispatch(newGrid(40,40))
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
