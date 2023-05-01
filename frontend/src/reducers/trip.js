import {
    GET_TRIP,
    TRIP_ERROR,
    CLEAR_TRIP,
    CLEAR_TRIPS,
    GET_TRIPS,
    TRIPS_ERROR,
} from '../actions/types';

const initialState = {
    loading: true,
    trips: {},
    selectedTrip: {},
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TRIP:
            return {
                ...state,
                selectedTrip: payload,
                loading: false
            };

        case TRIP_ERROR:
            return {
                ...state,
                error: payload,
                selectedTrip: {},
                loading: false,
            };

        case CLEAR_TRIP:
            return {
                ...state,
                selectedTrip: {}
            };

        case TRIPS_ERROR:
            return {
                ...state,
                error: payload,
                trips: null,
                loading: false,
            };

        case GET_TRIPS:
            return {
                ...state,
                trips: payload,
                loading: false
            };

        case CLEAR_TRIPS:
            return {
                ...state,
                trips: {},
                loading: true,
            };

        default:
            return state;
    }
}