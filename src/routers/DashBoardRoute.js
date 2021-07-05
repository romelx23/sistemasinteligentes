import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../Components/Home";
import Nav from "../Components/Nav";
import Report from "../Components/Report";
import Quiz from "../Components/Quiz";
import FormUser from "../Components/FormUser";
export const DashBoardRoutes = () => {
  return (
    <>
      <Nav />
      <div className="container">
        <Switch>
          <Route exact path="/report" component={Report} />
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={FormUser} />
          <Redirect to="/home" />
        </Switch>
      </div>
    </>
  );
};
