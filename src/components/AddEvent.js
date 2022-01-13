import React, { useState } from "react";
import facade from "../apiFacade";
import ErrorToDisplay from "./ErrorToDisplay";
import SuccesToDisplay from "./SuccessToDisplay";
function AddEvent() {
  const [dinnerEvent, setDinnerEvent] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChange = (evt) => {
    setDinnerEvent({
      ...dinnerEvent,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //check if some inputs are empty. If yes --> error
    facade
      .addDinnerEvent(dinnerEvent)
      .then((res) => {
        console.log(res);
        setSuccess("The event is now added!");
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        if (err.status) {
          err.fullError.then((e) => {
            console.log(e.code + ": " + e.message);
            setError("Have you filled in all fields?");
            setSuccess(null);
          });
        } else {
          console.log("Network error");
        }
      });

    //redirects user to home page
  };
  return (
    <div className="form-container">
      <h1 className="text-center mt-3">Register a new event</h1>
      <form onChange={onChange} class="register-form">
        <label>Location</label>
        <input id="location" className="form-field" type="text" required />

        <label>Dish</label>
        <input id="dish" className="form-field" type="text" required />

        <label>Price Per Person</label>
        <input
          id="pricePerPerson"
          className="form-field"
          type="text"
          required
        />
        <button
          onClick={handleSubmit}
          className="form-field btn-dark"
          type="submit"
        >
          Add Event
        </button>
      </form>
      {error && <ErrorToDisplay errorMsg={error} />}
      {success && <SuccesToDisplay msg={success} />}
    </div>
  );
}

export default AddEvent;
