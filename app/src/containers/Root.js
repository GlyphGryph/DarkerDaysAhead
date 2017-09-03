import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { newStore } from '../store'

const store = newStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
