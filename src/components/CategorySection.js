import React, { useEffect, useState } from "react";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken, setBasket } from "../features/userSlice";

// REACT-ROUTER
import { useHistory } from "react-router-dom";

// REACT-LAZY-LOAD-IMAGE-COMPONENT
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";

// ANIMATION ON SCROLL
import Aos from "aos";
import "aos/dist/aos.css";

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// NOTISTACK
import { useSnackbar } from "notistack";

// CSS
import "../css/categorySection.css";

function CategorySection({ category, scrollPosition }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [quantity, setQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const headerConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  const addProductToBasket = (productId) => {
    if (user && token) {
      axios
        .post(`${user._id}/add/${productId}`, { quantity }, headerConfig)
        .then(({ data }) => {
          dispatch(setBasket(data));
          enqueueSnackbar("Product added to basket", {
            variant: "success",
            autoHideDuration: 3000,
          });
        })
        .catch((err) => {
          enqueueSnackbar("Product not added to basket", {
            variant: "error",
            autoHideDuration: 3000,
          });
          console.log(err);
        });
    } else history.push("/signin");
  };

  const MenuItems = () => {
    const menuItems = [];
    for (let i = 1; i <= 100; i++) {
      menuItems.push(
        <MenuItem value={i} key={i}>
          {i}
        </MenuItem>
      );
    }
    return menuItems;
  };

  return (
    <div className="categorySection">
      <h2 className="categorySection__title">{category.promoText}</h2>
      {category.products.map((product, index) => (
        <div key={index} data-aos="fade-up" className="productContent">
          <div className="productContent__left">
            <h3 className="product__title">
              <span className="product__name">{product.name}</span>
            </h3>

            <div className="product__promoWrapper">
              <p className="product__promo">{product.promoText}</p>
            </div>

            <div className={`product__colors `}>
              {product.colors.map((color) => (
                <div key={color} className={`product__color ${color}`}></div>
              ))}
            </div>
            <ul className="product__characteristics">
              {product.description.map((description, index) => (
                <li key={index} className="product__characteristic">
                  {description}
                </li>
              ))}
            </ul>
            <p className="product__paragraphPrice">
              <span className="product__spanPrice">&#x24;{product.price}</span>
            </p>
            <div className="product__addToBasket">
              {product.stock > 0 ? (
                <button
                  className="product__buy product__inStock"
                  onClick={() => addProductToBasket(product._id)}
                >
                  Add to Basket
                </button>
              ) : (
                <button className="product__buy" disabled>
                  Out of Stock
                </button>
              )}

              <FormControl>
                <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {MenuItems()}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="productConten__right">
            <LazyLoadImage
              alt="beats flex"
              effect="blur"
              scrollPosition={scrollPosition}
              src={product.image}
              className="product__image"
            />
          </div>
        </div>
      ))}
      <div className="separate__categories"></div>
    </div>
  );
}

export default trackWindowScroll(CategorySection);
