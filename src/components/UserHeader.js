import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import FetchSingle from "./FetchSingle";
import FetchSequentially from "./FetchSequentially";
import FetchParallel from "./AddEvent";
import FetchParallelly from "./AddEvent";
import NoMatch from "./NoMatch";
import AddEvent from "./AddEvent";
import Overview from "./Overview";

function UserHeader(props) {
  const { loggedIn, logout, validateAccess } = props;
  return (
    <div>
      <Header
        validateAccess={validateAccess}
        logout={logout}
        loggedIn={loggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/fetch-single">
          <FetchSingle />
        </Route>

        {validateAccess === "user" ? (
          <Route path="/fetch-sequentially">
            <FetchSequentially />
          </Route>
        ) : (
          ""
        )}
        {validateAccess === "admin" ? (
          <Route path="/add-event">
            <AddEvent />
          </Route>
        ) : (
          ""
        )}
        {validateAccess === "admin" ? (
          <Route path="/overview">
            <Overview />
          </Route>
        ) : (
          ""
        )}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default UserHeader;
