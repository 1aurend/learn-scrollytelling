import React from 'react'
import ReactDOM from 'react-dom'
import Scrolly from './Scrolly'
import StatelessScrolly from './Scrolly-no-state'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <Scrolly>
      <p>what do we get if I do this?</p>
    </Scrolly>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
