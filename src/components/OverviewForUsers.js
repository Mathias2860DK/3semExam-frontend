import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import AssignMemberModal from "./AssignMemberModal";
import EventTable from "./EventTable";
import OverviewModalForUsers from "./OverviewModalForUsers";

function OverviewForUsers() {
  const defaultEvents = [];
  const defaultEventsByUser = [];
  let userList = [1, 2, 3];
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //state for all events
  const [events, setEvents] = useState(...[defaultEvents]);
  //state for all events assigned to current user
   const [eventsByUser, setEventsByUser] = useState(...[defaultEventsByUser]);
  const [eventId, setEventId] = useState(-1);

  const [show, setShow] = useState(false);
   const [showAssignMember, setShowAssignMember] = useState(false);

  useEffect(() => {
    facade
      .getAllEvents()
      .then((res) => {
        setEvents(res);
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

      const userName = facade.getUserName();
      facade
        .getAllEventsByUser(userName)
        .then((res) => {
          setEventsByUser(res);
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

  const changeSubmit = () => {
    //TBD
  };

  return (
    <>
      <h1 className="mt-4 mb-4 text-center">Overview of all Events</h1>
      <EventTable list={events} setEventId={setEventId} setShow={setShow} />
      {show ? (
        <OverviewModalForUsers
          eventId={eventId}
          setShow={setShow}
          show={show}
          changeSubmit={changeSubmit}
        />
      ) : (
        ""
      )}
      <h1 className="mt-4 mb-4 text-center">Events that I am assigned to</h1>
      <EventTable
        list={eventsByUser}
        setEventId={setEventId}
        setShow={setShowAssignMember}
      />
      {showAssignMember ? (
        <AssignMemberModal
          eventId={eventId}
          setShow={setShowAssignMember}
          show={showAssignMember}
          changeSubmit={changeSubmit}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default OverviewForUsers;
