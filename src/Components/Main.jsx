import React, { Fragment, useState, useEffect } from "react";
import Form from "./Form";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PrivateRoute } from "../routers/PrivateRoute";
import { PublicRoute } from "../routers/PublicRoute";
import { DashBoardRoutes } from "../routers/DashBoardRoute";
const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const state = useSelector((state) => state.auth);
  useEffect(() => {
    if (state.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, state]);
  return (
    <Fragment>
      <Router>
        <Switch>
          <PublicRoute
            path="/auth/login"
            isAutenticated={isLoggedIn}
            component={Form}
          />
          <PrivateRoute
            path="/"
            isAutenticated={isLoggedIn}
            component={DashBoardRoutes}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default Main;
