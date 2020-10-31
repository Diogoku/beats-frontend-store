import React, { useState } from "react";

// REACT-REDUX
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../features/userSlice";

// REACT-ROUTER-DOM
import { useHistory, Prompt } from "react-router-dom";

// REACT-HOOK-FORM
import { useForm } from "react-hook-form";

// VALIDATION
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../validation/user";

// COMPONENTS
import ErrorMessage from "../components/ErrorMessage";

// UTILS
import { pageVariants } from "../utils";

// AXIOS
import axios from "../axios";

// FRAMER-MOTION
import { motion } from "framer-motion";

// MATERIAL-UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

// CSS
import "../css/userForms.css";

function SignInPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [blockChangePage, setBlockChangePage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerFailMesasge, setRegisterFailMessage] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = (data) => {
    setBlockChangePage(false);
    axios
      .post(`/signin`, data)
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        history.push("/");
        setRegisterFailMessage(null);
      })
      .catch((error) => {
        // Error
        if (error.response) {
          setRegisterFailMessage(error.response.data.err);
        } else if (error.request) console.log(error.request);
        else console.log("Error", error.message);
        console.log(error.config);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="Page"
    >
      <Prompt
        when={blockChangePage}
        message={(location) =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
      <Card elevation={3}>
        <img
          src="https://1920x1080hdwallpapers.com/image/201612/brands/7330/monster-beats-red-black.jpg"
          alt="Beats by Dr. Dre Logo"
          className="form__image"
        ></img>
        <CardContent>
          <h2 className="form__title">Sign In</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                labelWidth={70}
                inputRef={register}
                name="email"
                onChange={(event) => {
                  setBlockChangePage(event.target.value.length > 0);
                }}
              />
              {errors.email ? (
                <ErrorMessage text={errors.email.message} />
              ) : null}
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                inputRef={register}
                name="password"
                onChange={(event) => {
                  setBlockChangePage(event.target.value.length > 0);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              {errors.password ? (
                <ErrorMessage text={errors.password.message} />
              ) : null}
            </FormControl>
            <Button variant="contained" color="primary" type="submit">
              Sign In
            </Button>
            {registerFailMesasge ? (
              <ErrorMessage text={registerFailMesasge} />
            ) : null}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SignInPage;
