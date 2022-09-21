import axios from 'axios'
import { setAlert } from './alert'
import {
  ADD_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  LIKE_POST,
  POST_ERROR,
  SET_LOADING,
  UNLIKE_POST,
} from './types'

export const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  })
}

// Get all posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts')

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get post by post id
export const getPostById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`)

    dispatch({
      type: GET_POST,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Create a post
export const createPost = (text) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    }

    const body = JSON.stringify({ text })
    const res = await axios.post('/api/posts', body, config)

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    })

    dispatch(setAlert('Post created', 'success', 3000))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const deletePostById = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`)
    dispatch({
      type: DELETE_POST,
      payload: res.data,
    })
    dispatch(setAlert('Post removed', 'danger'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const addComment = (id, comment) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    }
    const body = JSON.stringify({
      text: comment,
    })

    const res = await axios.post(`/api/posts/comment/${id}`, body, config)

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors.length > 0) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    })

    dispatch(setAlert('Comment removed', 'danger'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`)
    dispatch({
      type: LIKE_POST,
      payload: res.data,
    })
  } catch (err) {
    const msg = err.response.data.msg
    if (msg) {
      dispatch(setAlert(msg, 'danger'))
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const unlikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`)
    dispatch({
      type: UNLIKE_POST,
      payload: res.data,
    })
  } catch (err) {
    const msg = err.response.data.msg
    if (msg) {
      dispatch(setAlert(msg, 'danger'))
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
