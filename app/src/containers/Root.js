import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { newDataStore, newDisplayStore } from '../store'

const dataStore = newDataStore()
window.dataStore = dataStore
const displayStore = newDisplayStore(dataStore)
window.displayStore = displayStore

export default class Root extends Component {
  render() {
    return (
      <Provider store={displayStore}>
        <App dataStore={dataStore} />
      </Provider>
    )
  }
}
