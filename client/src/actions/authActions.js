import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/register", userData)
    .then(() => {
      // Clear Errors
      dispatch({ type: CLEAR_ERRORS });
      history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/user/login", userData)
    .then(res => {
      const { token } = res.data;

      // Set token to local storage
      localStorage.setItem("jwtToken", token);

      // Set token to auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));

      // Clear Errors
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem("jwtToken");

  // Remove the auth header for future requests
  setAuthToken(false);

  // Set the current user {} which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
