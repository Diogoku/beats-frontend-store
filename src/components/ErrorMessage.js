import React from "react";

// MATERIAL-UI
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

// CSS
import "../css/errorMessage.css";

function ErrorMessage({ text }) {
  return (
    <div className="errorMesage">
      <ReportProblemIcon />
      <p>{text}</p>
    </div>
  );
}

export default ErrorMessage;
