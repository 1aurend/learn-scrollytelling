import React from 'react'
import ReactDOM from 'react-dom'
// import Scrolly from './Scrolly'
// import StatelessScrolly from './Scrolly-no-state'
import CenterScrolly from './CenterScrolly'
import MockAnim from './demos/MockAnim'
import steps from './demos/textSteps'
import reportWebVitals from './reportWebVitals'
import { Box } from 'rebass'

ReactDOM.render(
  <React.StrictMode>
    <Box
      height='75%'
      id='top-padding'
      >
    </Box>
    <CenterScrolly id='one' steps={steps}>
      <MockAnim />
    </CenterScrolly>
    <Box
      height='75%'
      id='middle-padding'
      >
    </Box>
    <CenterScrolly id='two' steps={steps} textBoxColor='#76a9ee'>
      <MockAnim />
    </CenterScrolly>
    <Box
      height='75%'
      id='bottom-padding'
      >
    </Box>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
