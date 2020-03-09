import React from 'react'
import { HashRouter , Route, Switch } from 'react-router-dom'
import LoginPage from './pages/Login'

export default () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </HashRouter>
    </div>
  )
}
