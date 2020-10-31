import React from "react";

// MATERIAL-UI
import CheckIcon from "@material-ui/icons/Check";

// CSS
import "../css/successMessage.css";

function SuccessMessage({ text }) {
  return (
    <div className="successMessage">
      <CheckIcon />
      <p>{text}</p>
    </div>
  );
}

export default SuccessMessage;
