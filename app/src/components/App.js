import React from 'react'
import CurrentGrid from '../containers/CurrentGrid'

const App = (store) => (
  <div>
    <CurrentGrid grid={store}/>
  </div>
)

export default App
