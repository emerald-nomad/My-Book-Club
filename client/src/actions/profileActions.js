import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  PROFILE_UPDATED,
  CLEAR_ERRORS
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

// Create or Edit Profile
export const postToProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      history.push("/my-profile");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add book to bookshelf
export const addToBookshelf = (type, time, bookData, history) => dispatch => {
  axios
    .post(`/api/${type}/book_${time}`, bookData)
    .then(res => history.push("/bookshelf"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Move book from future to current
export const profileFutureToCurrent = bookId => dispatch => {
  axios
    .post(`/api/profile/book_future-current/${bookId}`)
    .then(res => dispatch({ type: PROFILE_UPDATED, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Move book from current to past
export const profileCurrentToPast = bookId => dispatch => {
  axios
    .post(`/api/profile/book_past/${bookId}`)
    .then(res => dispatch({ type: PROFILE_UPDATED, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add club to user's profile
export const addClubToProfile = (clubId, history) => dispatch => {
  axios
    .post("/api/profile/club", { clubId })
    .then(res => history.push("/my-profile"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Set profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
