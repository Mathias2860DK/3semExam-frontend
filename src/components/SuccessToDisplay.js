import { Alert } from "react-bootstrap";

function SuccessToDisplay({ msg }) {
  return (
    <div>
      <Alert className="mt-4" variant={"success"}>
        {/* Code: {errorCode}  : */}
        {msg}
      </Alert>
    </div>
  );
}

export default SuccessToDisplay;
