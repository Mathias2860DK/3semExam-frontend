import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import EventTable from "./EventTable";


function Overview() {
  const defaultEvents = [];
  let userList = [1, 2, 3];
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [events, setEvents] = useState(...[defaultEvents]);
  const [eventId, setEventId] = useState(-1);

  const [show, setShow] = useState(false);

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
  }, []);

  const changeSubmit = () => {
      //TBD
  }

  let allInfoTest = { dummy1: 1, dummy2: "hej" };
  return (
    <>
      <EventTable list={events} setEventId={setEventId}setShow={setShow} />
      {/* {show ? (
        <OverviewModal
          item={allInfoTest}
          eventId={eventId}
          setShow={setShow}
          show={show}
          changeSubmit={changeSubmit}
        />
      ) : (
        ""
      )} */}
    </>
  );
}

export default Overview;
