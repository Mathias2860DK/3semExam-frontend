import facade from "../apiFacade";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

function AddEvent() {
  //const intialValue = { fact: "", length: "" };
  const [data, setData] = useState({});


  //If you want a catFact right away uncomment this code:
  //   useEffect(() => {
  //     getAlotData();
  //   }, []);
  return (
    <div>
      <Container>
        <Row className="rows">
          <Col xs={2} className="columns"></Col>
          <Col className="columns text-center">
            <h1 className="text-center mt-3">
              Get a lot of random Facts from 4 API's!
            </h1>
            <br></br>

            
          </Col>
          <Col xs={2} className="columns"></Col>
        </Row>
        
      </Container>
   
    </div>
  );
}

export default AddEvent;
