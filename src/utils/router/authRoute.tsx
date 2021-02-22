import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken, getUserId } from '../auth'

interface IProps {
  component: typeof Component;
  path: string;
  exact?: boolean;
}

function authRoute (props: IProps) {
  const logged = getToken() && getUserId()

  return logged ? <Route exact={props.exact} path={props.path} component={props.component} /> : <Redirect to='/ucenter' />
}

export default authRoute
