import React from "react";

// REACT-ROUTER-DOM
import { useHistory } from "react-router-dom";

// UTILS
import { pageVariants } from "../utils";

// MATERIAL-UI
import Button from "@material-ui/core/Button";

// MATERIAL-UI ICONS
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

// FRAMER-MOTION
import { motion } from "framer-motion";

// CSS
import "../css/paymentFailPage.css";

function PaymentFailPage() {
  const history = useHistory();

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="paymentFailPage"
    >
      <SentimentVeryDissatisfiedIcon />
      <h1>Oh no, payment failed.</h1>
      <h4>
        Please ensure that the debit/credit card you provided is correct.
        <br />
        Alternatively, please try a different payment method .
      </h4>
      <div className="paymentFailPage__pageOptions">
        <Button
          variant="contained"
          className="paymentFailPage__pageOption"
          onClick={() => history.push("/")}
        >
          Back to Home Page
        </Button>
        <Button
          variant="contained"
          className="paymentFailPage__pageOption"
          onClick={() => history.push("/basket")}
        >
          Basket Page
        </Button>
      </div>
    </motion.div>
  );
}

export default PaymentFailPage;
