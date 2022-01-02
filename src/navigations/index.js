import React from 'react'
import { useRecoilValue } from 'recoil'
import createBrowserHistory from 'history/createBrowserHistory'
import {Router, Switch, Route, Redirect } from 'react-router-dom'

import { isAdmin } from '../recoil'
import NotFound from '../pages/NotFound'
import Footer from '../components/Footer'
import ControlBoard from '../pages/Admin'
import Signup from '../pages/auth/Signup'
import NavBar from '../components/NavBar'
import MainNavBar from '../components/AppBar'
import Login from '../pages/Admin/auth/login'
import RootContainer from '../components/RootContainer'
import ForgotPassword from '../pages/auth/ForgotPassword'

export default function AuthExample() {
  const history = createBrowserHistory()
  return (
    <Router history={history}>
      <MainNavBar />
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <RootContainer />
        </Route>
        <Route path='/Login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/forgotPassword'>
          <ForgotPassword />
        </Route>
        <Route path='/404'>
          <NotFound />
        </Route>
        <PrivateRoute path='/admin'>
          <ControlBoard />
        </PrivateRoute>
      </Switch>
      <Footer />
    </Router>
  )
}

function PrivateRoute({ children, ...rest }) {
  const auth = useRecoilValue(isAdmin)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
