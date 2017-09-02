import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CurrentGrid from '../containers/CurrentGrid'

class App extends React.Component{

  render(){
    return (
      <div>
        <CurrentGrid />
      </div>
    )
  }
}

export default connect()(App)
