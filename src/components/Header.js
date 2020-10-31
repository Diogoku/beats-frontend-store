import React, { Fragment } from "react";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken, logout } from "../features/userSlice";

// REACT-ROUTER-DOM
import { NavLink } from "react-router-dom";

// COMPONENTS
import HeaderDrawer from "./HeaderDrawer";

// CUSTOM HOOK
import useWindowWidth from "../hooks/useWindowWidth";

// MATERIAL-UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

// MATERIAL-UI ICONS
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

// CSS
import "../css/header.css";

function Header() {
  const trigger = useScrollTrigger();
  const { width } = useWindowWidth();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoutFunc = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="header">
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            <NavLink
              exact
              to="/"
              className="navLink"
              activeClassName="activeRoute"
            >
              <Avatar
                src="https://logodix.com/logo/75968.png"
                alt="Beats By Dre logo"
              />
            </NavLink>
            <div className="header__rightSide">
              {width > 700 ? (
                <Fragment>
                  <div className="header__search">
                    <SearchIcon />

                    <InputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </div>
                  <ul className="header__userOptions">
                    {!user || !token ? (
                      <Fragment>
                        {" "}
                        <NavLink
                          className="navLink"
                          to={`/signup`}
                          activeClassName="activeRoute"
                        >
                          SignUp
                        </NavLink>
                        <NavLink
                          className="navLink"
                          to={`/signin`}
                          activeClassName="activeRoute"
                        >
                          Signin
                        </NavLink>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className="header__username">{user.name}</span>
                        <NavLink
                          to="/basket"
                          className="navLink"
                          activeClassName="activeRoute"
                        >
                          <Badge
                            color="secondary"
                            badgeContent={user.basketProducts.reduce(function (
                              prev,
                              product
                            ) {
                              return prev + product.quantity;
                            },
                            0)}
                            max={99}
                            showZero
                          >
                            <ShoppingBasketIcon />
                          </Badge>
                        </NavLink>

                        <NavLink
                          className="navLink"
                          to="/payments"
                          activeClassName="activeRoute"
                        >
                          Payments
                        </NavLink>

                        <NavLink
                          className="navLink"
                          to="/"
                          onClick={() => logoutFunc()}
                        >
                          Logout
                        </NavLink>
                      </Fragment>
                    )}
                  </ul>
                </Fragment>
              ) : (
                <HeaderDrawer />
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Slide>
    </div>
  );
}

export default Header;
