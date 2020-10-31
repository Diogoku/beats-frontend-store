import React from "react";

// REACT-ROUTER-DOM
import { Redirect, Route } from "react-router-dom";

// REACT-REDUX
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../features/userSlice";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin" }} />
        )
      }
    />
  );
};
