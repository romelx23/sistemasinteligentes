import React from "react";
import { Redirect, Route } from "react-router";

export const PublicRoute = ({
  isAutenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAutenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
