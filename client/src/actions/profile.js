import axios from 'axios'
import { setAlert } from './alert'
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  SET_LOADING,
} from './types'

export const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  })
}

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
        },
      }

      const res = await axios.post('/api/profile', formData, config)

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      )

      if (!edit) navigate('/dashboard')
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }

// Add experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
    },
  }
  const body = JSON.stringify(formData)
  try {
    const res = await axios.put('/api/profile/experience', body, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Experience added', 'success'))
    navigate('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.statusText,
        status: err.status,
      },
    })
  }
}

// Add education
export const addEducation = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
    },
  }
  const body = JSON.stringify(formData)
  try {
    const res = await axios.put('/api/profile/education', body, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Education added', 'success'))
    navigate('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.statusText,
        status: err.status,
      },
    })
  }
}

// Delete experience
export const deleteExperience = (exp_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${exp_id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Experience removed', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.statusText,
        status: err.status,
      },
    })
  }
}

// Delete education
export const deleteEducation = (edu_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${edu_id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    setAlert('Education removed', 'success')
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.statusText,
        status: err.status,
      },
    })
  }
}

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm('Are you sure? Your account will be deleted permanently')
  ) {
    try {
      await axios.delete('/api/profile')

      dispatch({
        type: CLEAR_PROFILE,
      })
      dispatch({
        type: ACCOUNT_DELETED,
      })

      setAlert('Your account has been deleted permanently', 'success')
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.statusText,
          status: err.status,
        },
      })
    }
  }
}

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile')

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get github repositories
export const getGithubRepos = (githubUsername) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${githubUsername}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
