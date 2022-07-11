import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import { RoutePaths } from '../utils/enum';


const PrivateRoute = ({ component, path }) => {
  const authContext = useAuthContext();
  if (!authContext.user.id) {
    return <Redirect to={RoutePaths.Login} />;
  }

  return <Route  component={component} path={path} />;
};

export default PrivateRoute;