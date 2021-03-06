import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Container>
        <Row className="rows">
          <Col xs={2} className="columns"></Col>
          <Col className="columns">
            <h1 className="text-center mt-3">Communal dinning club</h1>
            <br></br>
            <h3>
              <strong>Functionalities</strong>
            </h3>
            
            <p>
              <strong>User</strong> : Home, Account, All Events and
              Logout
            </p>
            <p>
              <strong>Admin</strong>: Home, Add Event, Overview and
              Logout
            </p>
            <br></br>
            <h3>
              <strong>Usernames And Passwords</strong>
            </h3>
            <p>
              <strong>user: </strong> username: "user" password: "test1"
            </p>
            <p>
              <strong>admin: </strong> username: "admin" password: "test2"
            </p>
          </Col>
          <Col xs={2} className="columns"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
