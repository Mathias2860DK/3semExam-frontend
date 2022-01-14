import { Table } from "react-bootstrap";
import facade from "../apiFacade";
function EventTable({ list, setEventId, setShow }) {
  return (
    <Table striped bordered hover>
      {
        <>
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Dish</th>
              <th>pricePerPerson</th>
              {facade.validateAccess() === "admin" ? <th>Action</th> : ""}
            </tr>
          </thead>
          <tbody>
          
            {list.map((event, index) => (
              <tr key={index}>
                <td>
                  {facade.validateAccess() === "user" ? (
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        setEventId(event.id);
                        setShow(true);
                      }}
                    >
                      {event.id}
                    </button>
                  ) : (
                    <td>{event.id}</td>
                  )}
                </td>
                <td>{event.location}</td>
                <td>{event.dish}</td>
                <td>{event.pricePerPerson}</td>
                {facade.validateAccess() === "admin" ? (
                  <>
                    <td>
                      <button
                        className="btn btn-warning mb-2"
                        onClick={() => {
                          setEventId(event.id);
                          setShow(true);
                        }}
                      >
                        {console.log(event.id)}
                        Update Members
                      </button>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </>
      }
    </Table>
  );
}

export default EventTable;
