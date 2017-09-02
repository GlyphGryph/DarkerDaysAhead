import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from '../components/App'
import { newGrid } from '../actions'

const store = configureStore()
store.dispatch(newGrid(10,20))

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
