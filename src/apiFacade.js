import jwt_decode from "jwt-decode";
import { URL } from "./Settings";

//URL = "https://www.theagns.com/CA2-Backend";
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function handleError(error, setError) {
  if (error.status) {
    error.fullError.then((data) => setError(data));
  } else {
    setError({ code: 500, message: "Some unknown error happened" });
  }
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  //Decode token

  const validateAccess = () => {
    var decoded = jwt_decode(getToken());
    const { roles } = decoded;
    console.log(roles);
    //  console.log(decoded);
    return roles;
  };

  const getUserName = () => {
    var decoded = jwt_decode(getToken());
    const { username } = decoded;
    console.log(username);
    //  console.log(decoded);
    return username;
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    /*TODO*/
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const registerUser = (registerCredentials) => {
    const options = makeOptions("POST", true, registerCredentials);
    console.log(registerCredentials);
    return fetch(URL + "/api/register", options)
      .then(handleHttpErrors)
      .then((res) => {});
  };



  

  const addDinnerEvent = (dinnerEvent) => {
    const options = makeOptions("POST", true, dinnerEvent);
    return fetch(URL + "/api/admin/addDinnerEvent", options).then(
      handleHttpErrors
    );
  };

  const getAllEvents = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/all/getAllEvents", options).then(handleHttpErrors);
  };
  const getAllTransactions = (userName) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(
      URL + "/api/all/getAllTransactionsById/" + userName,
      options
    ).then(handleHttpErrors);
  };

  //Add yourself
  const addMemberToEvent = (eventId, assignment) => {
    const options = makeOptions("PUT", true, assignment);
    return fetch(URL + "/api/all/addMemberToEvent/" + eventId, options).then(
      handleHttpErrors
    );
  };

  //add other members
  const addMembersToEvent = (eventId, assignment) => {
    const options = makeOptions("PUT", true, assignment);
    return fetch(URL + "/api/all/addMembersToEvent/" + eventId, options).then(
      handleHttpErrors
    );
  };

  const getAccountBalance = (userName) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/all/getAccountBalance/" + userName, options).then(
      handleHttpErrors
    );
  };

  //getAllEventsByUser
  const getAllEventsByUser = (userName) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/all/getAllEventsByUser/" + userName, options).then(
      handleHttpErrors
    );
  };

   const getAllMembersAssignedToEvent = (eventId) => {
     const options = makeOptions("GET", true);
     return fetch(
       URL + "/api/all/getAllMembersAssignedToEvent/" + eventId,
       options
     ).then(handleHttpErrors);
   };
  //getAllMembersAssignedToEvent

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }

    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    validateAccess,
    handleError,
    registerUser,
    addDinnerEvent,
    getAllEvents,
    addMemberToEvent,
    getUserName,
    getAllTransactions,
    getAccountBalance,
    getAllEventsByUser,
    addMembersToEvent,
    getAllMembersAssignedToEvent,
  };
}
const facade = apiFacade();
export default facade;
