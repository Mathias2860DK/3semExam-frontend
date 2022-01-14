import { Table } from "react-bootstrap";
function TransactionTable({ list}) {
  return (
    <Table striped bordered hover>
      {
        <>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {list.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.amount} DKK</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </>
      }
    </Table>
  );
}

export default TransactionTable;
