import axios from "axios";
import {
  GET_ERRORS,
  GET_CLUBS,
  CLUBS_LOADING,
  GET_CLUB,
  UPDATE_POST,
  CLEAR_ERRORS,
  CLUB_UPDATED
} from "./types";

// Create club
export const createClub = (clubData, history) => dispatch => {
  axios
    .post("/api/club", clubData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      history.push("/my-clubs");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Get club by id
export const getClub = clubId => dispatch => {
  dispatch({ type: CLUBS_LOADING });

  axios
    .get(`/api/club/${clubId}`)
    .then(res => dispatch({ type: GET_CLUB, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Get all clubs
export const getClubs = () => dispatch => {
  dispatch({ type: CLUBS_LOADING });

  axios
    .get("/api/club/all")
    .then(res => dispatch({ type: GET_CLUBS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add post to club
export const addPost = (clubId, postData) => dispatch => {
  axios
    .post(`/api/club/post/${clubId}`, postData)
    .then(res => {
      dispatch({ type: UPDATE_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete a post
export const deletePost = (clubId, postId) => dispatch => {
  axios
    .delete(`/api/club/post/${clubId}/${postId}`)
    .then(res => {
      dispatch({ type: UPDATE_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Like a post
export const likePost = (clubId, postId) => dispatch => {
  axios
    .post(`/api/club/post/${clubId}/${postId}/like`)
    .then(res => {
      dispatch({ type: UPDATE_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Unlike a post
export const unlikePost = (clubId, postId) => dispatch => {
  axios
    .post(`/api/club/post/${clubId}/${postId}/unlike`)
    .then(res => {
      dispatch({ type: UPDATE_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Post a comment
export const addComment = (clubId, postId, postData) => dispatch => {
  axios
    .post(`/api/club/post/${clubId}/${postId}/comment`, postData)
    .then(res => {
      dispatch({ type: UPDATE_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add book to bookshelf
export const addToClubBookshelf = (
  type,
  clubId,
  time,
  bookData,
  history
) => dispatch => {
  axios
    .post(`/api/${type}/${clubId}/book_${time}`, bookData)
    .then(res => history.push(`/bookshelf/${clubId}`))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Move book from future to current
export const clubFutureToCurrent = (clubId, bookId) => dispatch => {
  axios
    .post(`/api/club/${clubId}/book_future-current/${bookId}`)
    .then(res => dispatch({ type: CLUB_UPDATED, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Move book from current to past
export const clubCurrentToPast = (clubId, bookId) => dispatch => {
  axios
    .post(`/api/club/${clubId}/book_past/${bookId}`)
    .then(res => dispatch({ type: CLUB_UPDATED, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
