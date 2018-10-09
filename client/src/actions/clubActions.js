import axios from "axios";
import { GET_ERRORS, GET_CLUBS, CLUBS_LOADING } from "./types";

// Create club
export const createClub = (clubData, history) => dispatch => {
  axios
    .post("/api/club", clubData)
    .then(res => history.push("/my-clubs"))
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
