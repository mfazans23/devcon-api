import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_REPOS,
  SET_LOADING,
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      }
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }

    default:
      return state
  }
}
