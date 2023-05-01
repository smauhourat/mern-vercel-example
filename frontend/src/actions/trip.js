import api from '../utils/api';

import {
  CLEAR_TRIPS,
  GET_TRIPS,
  TRIPS_ERROR,
  DELETETRIP_SUCCESS,
  DELETETRIP_FAIL,
  ADDTRIP_SUCCESS,
  ADDTRIP_FAIL,
  UPDATETRIP_SUCCESS,
  UPDATETRIP_FAIL,
  CLEAR_TRIP,
  GET_TRIP,
  TRIP_ERROR,
  ADDIMAGE_BEGIN,
  ADDIMAGE_SUCCESS,
  ADDIMAGE_FAIL,
  DELETEIMAGE_SUCCESS,
  DELETEIMAGE_FAIL
} from './types';

// Get trips
export const getTrips = (query) => async (dispatch) => {
  dispatch({ type: CLEAR_TRIPS });
  try {
    const res = await api.get(`/trips/?${query}`);
    //console.log(query);
    dispatch({
      type: GET_TRIPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRIPS_ERROR,
      payload: { msg: err.response?.statusText, status: err.response?.status }
    });
  }
}

export const clearTrip = () => async (dispatch) => {
  dispatch({ type: CLEAR_TRIP });
}
