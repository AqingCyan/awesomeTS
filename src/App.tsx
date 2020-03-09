import React from 'react'
import { HashRouter , Route, Switch } from 'react-router-dom'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'

export default () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </HashRouter>
    </div>
  )
}
