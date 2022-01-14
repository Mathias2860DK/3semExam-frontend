import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import ErrorToDisplay from "./ErrorToDisplay";
import SuccesToDisplay from "./SuccessToDisplay";
function OverviewModalForUsers({ setShow, show, eventId, changeSubmit }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

  //const [submitModal, setSubmitModal] = useState(false);

  const [assignment, setAssignment] = useState({
      familyName: "",
      contactInfo: "",
  });
  const member = useState({
      userName : "",
      assignment: {
          familyName: "",
          contactInfo: ""
      }
  })



  useEffect(() => {

  }, []);

  const handleSubmit = (evt) => {
       evt.preventDefault();
      const userName = facade.getUserName();
    const memberToAsign = {
        userName: userName,
        assignment: {
            familyName: assignment.familyName,
            contactInfo: assignment.contactInfo
        }
    }
    facade
      .addMemberToEvent(eventId, memberToAsign)
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
  };
  const onChange = (evt) => {
    setAssignment({
      ...assignment,
      [evt.target.id]: evt.target.value,
    });

    console.log(assignment);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Event Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center">Assignment</h3>
          <form onChange={onChange} class="register-form">
            <label>Family Name</label>
            <input
              id="familyName"
              className="form-field"
              type="text"
              required
            />

            <label>ContactInfo</label>
            <input
              id="contactInfo"
              className="form-field"
              type="text"
              required
            />

            <button
              onClick={handleSubmit}
              className="form-field btn-dark"
              type="submit"
            >
              Add Assignment
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
export default OverviewModalForUsers;