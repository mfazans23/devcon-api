import {
  CREATE_POST,
  GET_POST,
  GET_POSTS,
  DELETE_POST,
  POST_ERROR,
  ADD_COMMENT,
  SET_LOADING,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_COMMENT,
} from '../actions/types'

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      }
    case CREATE_POST:
      state.posts.unshift(payload)
      return state
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      }
    case DELETE_POST:
      const indexOfPost = state.posts.indexOf(payload)
      state.posts.splice(indexOfPost, 1)
      return state
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case ADD_COMMENT:
      state.post.comments = payload
      return {
        ...state,
      }
    case DELETE_COMMENT:
      const indexOfComment = state.post.comments.indexOf(payload)
      state.post.comments.splice(indexOfComment, 1)
      return state
    case LIKE_POST:
      state.post.likes = payload
      return state
    case UNLIKE_POST:
      state.post.likes = payload
      return state
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
