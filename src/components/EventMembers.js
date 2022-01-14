import ErrorToDisplay from "./ErrorToDisplay";
import SuccesToDisplay from "./SuccessToDisplay";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import facade from "../apiFacade";

function EventMembers({ setShow, show, eventId }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

    //const defaultMembersAssigned = [];

const [membersAssigned, setmembersAssigned] = useState(null
);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
 useEffect(() => {
   facade
     .getAllMembersAssignedToEvent(eventId)
     .then((res) => {
       console.log(res);
       setmembersAssigned(res)
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
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The events assigned members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {membersAssigned !== null
            ? membersAssigned.map((item) => (
                <tr>
                  
                  <strong>
                    <p key={item.userName}>{item.userName}
                    <button onClick={() => {
                        console.log(item.userName)
                        alert("Not implemented yet");
                    }} className="btn btn-danger ml-2">Delete</button></p>{" "}
                  </strong>
                </tr>
              ))
            : ""}
        </Modal.Body>
        {error && <ErrorToDisplay errorMsg={error} />}
        {success && <SuccesToDisplay msg={success} />}
        <Modal.Footer>
          <button className="btn btn-grey" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventMembers;
