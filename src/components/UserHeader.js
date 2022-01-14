import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import NoMatch from "./NoMatch";
import AddEvent from "./AddEvent";
import Overview from "./Overview";
import OverviewForUsers from "./OverviewForUsers";
import Account from "./Account";

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

        {validateAccess === "user" ? (
          <Route path="/all-events">
            <OverviewForUsers />
          </Route>
        ) : (
          ""
        )}
        {validateAccess === "user" ? (
          <Route path="/account">
            <Account />
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
