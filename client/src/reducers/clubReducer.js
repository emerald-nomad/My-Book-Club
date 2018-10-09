import { GET_CLUBS, CLUBS_LOADING } from "../actions/types";

const initialState = {
  club: null,
  clubs: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLUBS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CLUBS:
      return {
        ...state,
        clubs: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
