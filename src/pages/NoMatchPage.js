import React from "react";

// REACT-ROUTER-DOM
import { Link } from "react-router-dom";

// FRAMER-MOTION
import { motion } from "framer-motion";

// UTILS
import { pageVariants } from "../utils";

// CSS
import "../css/noMatchPage.css";

function NoMatchPage() {
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="noMatchPage"
    >
      <h1 className="noMatchPage__HTTPErrorCode">404</h1>
      <h3>
        Sorry, we couldn't find this page. But don't worry, you can find <br />{" "}
        plenty of other things on our{" "}
        <Link to="/" className="noMatchPage__LinkHomePage">
          homepage
        </Link>
      </h3>
    </motion.div>
  );
}

export default NoMatchPage;
