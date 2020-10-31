import React, { useEffect } from "react";

// REACT-REDUX
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken, setUser } from "../features/userSlice";

// REACT-ROUTER-DOM
import { useHistory } from "react-router-dom";

// UTILS
import { pageVariants } from "../utils";

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import Button from "@material-ui/core/Button";

// MATERIAL-UI ICONS
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

// FRAMER-MOTION
import { motion } from "framer-motion";

// CSS
import "../css/paymentSuccessfulPage.css";

function PaymentSuccessfulPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const headerConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .post(`/payments/${user._id}/successful-payment`, null, headerConfig)
      .then(({ data }) => {
        dispatch(setUser(data));
        localStorage.setItem("user", JSON.stringify(data));
      });
  }, [dispatch, headerConfig, user._id]);

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="paymentSuccessfulPage"
    >
      <CheckCircleOutlineRoundedIcon />
      <h1>
        Thank you!
        <br /> Your Payment was successful.
      </h1>
      <Button
        variant="contained"
        className="paymentSuccessfulPage__pageOption"
        onClick={() => history.push("/")}
      >
        Back to Home Page
      </Button>
    </motion.div>
  );
}

export default PaymentSuccessfulPage;
