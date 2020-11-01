import React, { useEffect, useState } from "react";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken, setBasket } from "../features/userSlice";

// REACT-IMAGE-MAGNIFIERS
import {
  MagnifierContainer,
  MagnifierPreview,
  MagnifierZoom,
} from "react-image-magnifiers";

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

// NOTISTACK
import { useSnackbar } from "notistack";

// CSS
import "../css/productCard.css";

function ProductCard({ productId, quantity }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [productData, setProductData] = useState({
    description: [],
  });
  const [removeQuantity, setRemoveQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const headerConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchProductData = async () => {
      axios
        .get(`/products/${productId}`)
        .then(({ data }) => {
          setProductData(data);
        })
        .catch((err) => console.log(err));
    };
    fetchProductData(productData);
  }, [productId]);

  const removeQuantityFromBasket = (productName) => {
    axios
      .post(
        `/${user._id}/remove/${productId}`,
        { quantity: removeQuantity },
        headerConfig
      )
      .then(({ data }) => {
        dispatch(setBasket(data));
        enqueueSnackbar(
          `Removed ${removeQuantity} ${productName} from basket`,
          {
            variant: "success",
            autoHideDuration: 3000,
          }
        );
      })
      .catch((err) => {
        enqueueSnackbar("Product not added to basket", {
          variant: "error",
          autoHideDuration: 3000,
        });
        console.log(err);
      });
  };

  const MenuItems = () => {
    const menuItems = [];
    for (let i = 1; i <= quantity; i++) {
      menuItems.push(
        <MenuItem value={i} key={i}>
          {i}
        </MenuItem>
      );
    }
    return menuItems;
  };

  return (
    <div className="productCard">
      {productData.image ? (
        <MagnifierContainer className="productCard__magnifierContainer">
          <div className="productCard__image">
            <MagnifierPreview imageSrc={productData.image} />
          </div>
          <MagnifierZoom
            className="productCard__magnifierZoom"
            imageSrc={productData.image}
          />
        </MagnifierContainer>
      ) : null}

      <div className="productCard__details">
        <h2 className="productCard__name">{productData.name}</h2>

        <ul className="productCard__description">
          {productData.description.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <span>Quantity: {quantity}</span>
        <span>Price: {productData.price}</span>
        <div className="productCard__removeQuantity">
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Remove Quantity
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={removeQuantity}
              onChange={(e) => setRemoveQuantity(e.target.value)}
            >
              {MenuItems()}
            </Select>
          </FormControl>
          <Button
            onClick={() => removeQuantityFromBasket(productData.name)}
            className="productCard__removeButton"
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
