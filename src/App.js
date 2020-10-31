import React from "react";

// REACT-ROUTER
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// COMPONENTS
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

// PAGE COMPONENTS
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import BasketPage from "./pages/BasketPage";
import PaymentSuccessfulPage from "./pages/PaymentSuccessfulPage";
import PaymentFailPage from "./pages/PaymentFailPage";
import PaymentsHistoryPage from "./pages/PaymentsHistoryPage";
import NoMatchPage from "./pages/NoMatchPage";

// PRIVATE ROUTE
import { PrivateRoute } from "./routes/PrivateRoute";

// PAGES LAYOUT
import PagesLayout from "./components/PagesLayout";

// FRAMER-MOTION
import { AnimatePresence } from "framer-motion";

// MATERIAL-UI-ICONS
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

// NOTISTACK
import { SnackbarProvider } from "notistack";

// CSS
import "./css/App.css";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      iconVariant={{
        success: <CheckCircleOutlineRoundedIcon />,
        error: <HighlightOffRoundedIcon />,
      }}
      color="white"
      dense
    >
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <PagesLayout>
            <AnimatePresence exitBeforeEnter>
              <Switch>
                <Route path="/signin">
                  <SignInPage />
                </Route>
                <Route path="/signup">
                  <SignUpPage />
                </Route>
                <PrivateRoute path="/basket" component={BasketPage} />
                <PrivateRoute
                  path="/payment/successful"
                  component={PaymentSuccessfulPage}
                />
                <PrivateRoute
                  path="/payment/fail"
                  component={PaymentFailPage}
                />
                <PrivateRoute
                  path="/payments"
                  component={PaymentsHistoryPage}
                />
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="*">
                  <NoMatchPage />
                </Route>
              </Switch>
            </AnimatePresence>
          </PagesLayout>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
