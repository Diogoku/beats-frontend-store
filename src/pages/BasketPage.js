import React, { useState, Fragment, Suspense, lazy } from "react";

// REACT-REDUX
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../features/userSlice";

// REACT-LAZY-LOAD-IMAGE-COMPONENT
import {
  LazyLoadComponent,
  trackWindowScroll,
} from "react-lazy-load-image-component";

// UTILS
import { pageVariants } from "../utils";

// FRAMER-MOTION
import { motion } from "framer-motion";

// ROUND-TO
import roundTo from "round-to";

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import Button from "@material-ui/core/Button";

// CSS
import "../css/basketPage.css";

// REACT-STRIPE
import { loadStripe } from "@stripe/stripe-js";

// COMPONENTS
import ProductCard from "../components/ProductCard";
const Footer = lazy(() => import("../components/Footer"));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);

function BasketPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const totalPrice = user.basketProducts.reduce(
    (accumulator, currentProduct) =>
      (accumulator += currentProduct.price * currentProduct.quantity),
    0
  );

  const totalItems = user.basketProducts.reduce(
    (accumulator, currentProduct) => (accumulator += currentProduct.quantity),
    0
  );

  const headerConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const checkout = async (event) => {
    // get Stripe.js instance
    const stripe = await stripePromise;

    // request backend to create the checkout session
    const response = await axios.post(
      `/payments/${user._id}/create-checkout-session`,
      { line_items: user.basketProducts },
      headerConfig
    );

    const { data } = await response;
    console.log(response, "fdx");
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      setErrorMessage(result.error.message);
    }
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="basketPage"
    >
      <div className="basketPage__products">
        {user.basketProducts.map((product, index) => {
          return (
            <LazyLoadComponent key={index + "new"}>
              <ProductCard
                productId={product.id}
                quantity={product.quantity}
                key={index}
              />
            </LazyLoadComponent>
          );
        })}
      </div>
      {errorMessage ? <p>{errorMessage}</p> : null}

      {user.basketProducts.length > 0 ? (
        <Fragment>
          <div className="basketPage__total">
            <span>
              Total &#40; {totalItems} items &#41;: {roundTo(totalPrice, 2)}
            </span>
          </div>
          <Button
            className="basketPage__checkoutButton"
            role="link"
            variant="contained"
            onClick={checkout}
          >
            Checkout
          </Button>
        </Fragment>
      ) : (
        <div className="basketPage__total">
          <span>At the moment, there are no products in the basket.</span>
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </motion.div>
  );
}

export default trackWindowScroll(BasketPage);
