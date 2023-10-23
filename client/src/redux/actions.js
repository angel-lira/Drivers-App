import axios from "axios";

export const getDrivers = () => {
  return async (dispatch) => {
    try {
      const endpoint = "/drivers";
      const response = await axios.get(endpoint);

      return dispatch({
        type: "GET_DRIVERS",
        payload: response.data,
      });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
export const getTeams = () => {
  return async (dispatch) => {
    try {
      const endpoint = "/teams";
      const response = await axios.get(endpoint);

      return dispatch({
        type: "GET_TEAMS",
        payload: response.data,
      });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
export const searchDrivers = (name) => {
  return async (dispatch) => {
    try {
      const endpoint = "/drivers/name?q=";
      const response = await axios.get(`${endpoint}${name}`);

      return dispatch({
        type: "SEARCH_DRIVERS",
        payload: response.data,
      });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
export const orderDrivers = (orderType) => {
  return {
    type: "ORDER",
    payload: orderType,
  };
};
export const filterOrigin = (origin) => {
  return {
    type: "FILTER_ORIGIN",
    payload: origin,
  };
};
export const filterTeams = (team) => {
  return { type: "FILTER_TEAMS", payload: team };
};
export const resetFilterOrder = () => {
  return {
    type: "RESET",
  };
};
export const setError = (message) => ({
  type: "SET_ERROR",
  payload: message,
});
export const resetError = () => ({
  type: "RESET_ERROR",
});
