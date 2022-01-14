import { Table } from "react-bootstrap";
import TransactionTable from "./TransactionTable";
import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import ErrorToDisplay from "./ErrorToDisplay";
import SuccesToDisplay from "./SuccessToDisplay";
function Account({ list, setBoatId, setShow }) {

      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(null);

      const defaultTransactions = [];
      const [accountBalance, setAccountBalance] = useState(0);
     const [transactions, setTransactions] = useState(...[defaultTransactions]);

      useEffect(() => {
          const userName = facade.getUserName();
        facade
          .getAllTransactions(userName)
          .then((res) => {
               
            setTransactions(res);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            if (err.status) {
              err.fullError.then((e) => {
                console.log(e.code + ": " + e.message);
                setSuccess(false);
                setError(e.message);
              });
            } else {
              console.log("Network error");
            }
          });

          facade
            .getAccountBalance(userName)
            .then((res) => {
             // setAccountBalance(res);
             const obj = res;
             setAccountBalance(obj)
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              if (err.status) {
                err.fullError.then((e) => {
                  console.log(e.code + ": " + e.message);
                  setSuccess(false);
                  setError(e.message);
                });
              } else {
                console.log("Network error");
              }
            });

      }, []);
  return (
    <div>
        <h2 className="text-center mb-3 mt-3">Account overview</h2>
      <TransactionTable list={transactions} />
      <h2 className="text-center">Account balance: <strong>{accountBalance.accountBalance}</strong> DKK</h2>
    </div>
  );
}

export default Account;
