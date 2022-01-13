import { Table } from "react-bootstrap";
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
            </tr>
          </thead>
          <tbody>
            {list.map((event, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setEventId(event.id);
                      setShow(true);
                    }}
                  >
                    {event.id}
                  </button>
                </td>
                <td>{event.location}</td>
                <td>{event.dish}</td>
                <td>{event.pricePerPerson}</td>
              </tr>
            ))}
          </tbody>
        </>
      }
    </Table>
  );
}

export default EventTable;
