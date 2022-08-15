import React from 'react';
import { Route as ReactDOMRoute } from 'react-router-dom';
import MemberLayout from '../layout/member';

const Route = ({
  isPrivate = false,
  canRedirect = false,
  component: Component,
  ...rest
}) => {

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return (
          <MemberLayout>
            <Component />
          </MemberLayout>
        )}}
    />
  )
}

export default Route;