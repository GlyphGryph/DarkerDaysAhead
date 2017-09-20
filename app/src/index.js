import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import './styles/animations.css'
import Perf from 'react-addons-perf'
window.Perf = Perf

render(
  <Root />,
  document.getElementById('root')
)
