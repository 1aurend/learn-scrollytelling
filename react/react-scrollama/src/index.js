import React from 'react'
import ReactDOM from 'react-dom'
// import Scrolly from './basic-example/Scrolly'
// import StatelessScrolly from './basic-example/Scrolly-no-state'
import CenterScrolly from './scrolly-components/CenterScrolly'
import SideScrolly from './scrolly-components/SideScrolly'
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
    <SideScrolly id='two' steps={steps} textBoxColor='#76a9ee' right={false}>
      <MockAnim />
    </SideScrolly>
    <Box
      height='75%'
      id='middle-padding'
      >
    </Box>
    <SideScrolly
      id='three'
      steps={steps}
      textColumnWidth={0.3}
      stickyHeight='70vh'
      stickyWidth='50vw'
      topOffset={0.15}
      bottomOffset={0.85}
      >
      <MockAnim />
    </SideScrolly>
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
