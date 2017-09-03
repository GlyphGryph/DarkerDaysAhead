import React from 'react'
import { connect } from 'react-redux'
import CurrentGrid from '../containers/CurrentGrid'
import { newGrid, spawnCreature } from '../actions'

class App extends React.Component{
 constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    const ENTER = 13
    const SPACE = 32
    switch (event.which) {
      case ENTER:
        this.props.enterPressed(this.props.state, 20, 20)
        break;
      case SPACE:
        this.props.spacePressed();
        break;
      default:
        break;
    }
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

const mapStateToProps = state => {
  return {
    state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    spacePressed: ()=>{
      dispatch(newGrid(40,40))
    },
    enterPressed: (state, xx, yy)=>{
      console.log(state)
      dispatch(spawnCreature(state, xx, yy))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
