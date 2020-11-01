import React, { useState, Fragment } from "react";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken, logout } from "../features/userSlice";

// REACT-ROUTER-DOM
import { NavLink } from "react-router-dom";

// MATERIAL-UI
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Badge from "@material-ui/core/Badge";

// MATERIAL-UI ICONS
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

function HeaderDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(!openDrawer);
  };

  const logoutFunc = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const list = (
    <div role="presentation">
      <List>
        {!token || !user ? (
          ["signup", "signin"].map((text, index) => (
            <ListItem button key={text}>
              <NavLink
                className="navLink__menu"
                activeClassName="activeRoute__menu"
                to={`/${text}`}
              >
                {text}
              </NavLink>
            </ListItem>
          ))
        ) : (
          <Fragment>
            <ListItem button>
              <NavLink
                className="navLink__menu"
                activeClassName="activeRoute__menu"
                to="/payments"
              >
                Payments
              </NavLink>
            </ListItem>
            <ListItem button>
              <NavLink
                className="navLink__menu"
                to="/"
                onClick={() => logoutFunc()}
              >
                Logout
              </NavLink>
            </ListItem>
          </Fragment>
        )}
      </List>
    </div>
  );

  return (
    <div className="headerDrawer">
      {!token || !user ? (
        <Fragment>
          <span className="header__username">{user.name}</span>
          <NavLink activeClassName="activeRoute__menu" to="/basket">
            <Badge
              color="secondary"
              badgeContent={
                user
                  ? user.basketProducts.reduce(
                      (prev, product) => (prev += product.quantity),
                      0
                    )
                  : 0
              }
              max={99}
              showZero
            >
              <ShoppingBasketIcon />
            </Badge>
          </NavLink>
        </Fragment>
      ) : null}

      <Button onClick={toggleDrawer()}>
        <MenuIcon />
      </Button>
      <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer()}>
        {list}
      </Drawer>
    </div>
  );
}

export default HeaderDrawer;
