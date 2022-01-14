import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import ErrorToDisplay from "./ErrorToDisplay";
import SuccesToDisplay from "./SuccessToDisplay";
function AssignMemberModal({ setShow, show, eventId, changeSubmit }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [assignNewMember, setAssignNewMember] = useState(null);
  const [userId, setUserId] = useState(null);

 

  useEffect(() => {}, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const obj = [{
        "id": userId.id, 
        "assignmentId": eventId
    }]
    
    facade
      .addMembersToEvent(eventId, obj)
      .then((res) => {
        console.log(res);
        setSuccess("The assignemnt is now submitted!");
        setError(null);
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
   
    }



  const onChange = (evt) => {
    setUserId({
      ...userId,
      [evt.target.id]: evt.target.value,
    });

  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center">Assign members</h3>
          <form onChange={onChange} class="register-form">
            <p>
              Normally you would have to get the members confirmation. This is
              only proof of concept.
            </p>
            <label>Add user to assignment by user name</label>

            <input id="id" className="form-field" type="text" required />
            <button
              onClick={handleSubmit}
              className="form-field btn-dark"
              type="submit"
            >
              Add User to assignment
            </button>
          </form>
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
export default AssignMemberModal;
