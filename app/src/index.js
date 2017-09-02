import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './components/App'
import { newGrid } from './actions'

const store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

const logState = ()=>{
  let state = store.getState()
  console.log(state);
  console.log("Columns count:"+state.grid.columns.length);
  console.log("Rows count:"+state.grid.columns[0].rows.length);
  console.log("Cell colors count:"+state.grid.columns[0].rows[0].colorCode);
};

let unsubscribe = store.subscribe(logState)

store.dispatch(newGrid())

unsubscribe()
