import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './components/App'
import { newGrid } from './actions'

const store = createStore(reducer);
window.store = store

const logState = ()=>{
  let state = store.getState()
  console.log(state);
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

let unsubscribe = store.subscribe(logState)

store.dispatch(newGrid())

unsubscribe()
