import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import ColorEx from './demos/ColorEx'
import ZoomEx from './demos/ZoomEx'
import Viewer from './scrolly-components/Viewer'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/'>
          <ColorEx />
        </Route>
        <Route path='/zoom'>
          <ZoomEx />
        </Route>
        <Route path='/viewer'>
          <Viewer />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
