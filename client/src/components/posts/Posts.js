import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  unlikePost,
  deletePostById,
} from '../../actions/post'
import Spinner from '../layout/Spinner'

const Posts = ({
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  unlikePost,
  deletePostById,
  post: { posts, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getAllPosts()
  }, [])

  const [text, setText] = useState('')

  const onChange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await createPost(text)
    setText('')
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>

      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={text}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>

      <div className='posts'>
        {posts.map((post) => {
          const {
            _id,
            user: userId,
            name,
            avatar,
            text,
            date,
            likes,
            comments,
          } = post

          return (
            <div key={_id} className='post bg-white p-1 my-1'>
              <div>
                <Link to={`/profile/${userId}`}>
                  <img className='round-img' src={avatar} alt='' />
                  <h4>{name}</h4>
                </Link>
              </div>
              <div>
                <p className='my-1'>{text}</p>
                <p className='post-date'>
                  Posted on <Moment format='DD-MM-YYYY'>{date}</Moment>
                </p>
                <button
                  type='button'
                  className='btn btn-light'
                  onClick={async (e) => {
                    await getPostById(_id)
                    await likePost(_id)
                    getAllPosts()
                  }}
                >
                  <i className='fas fa-thumbs-up'></i>
                  <span> {likes.length > 0 && likes.length}</span>
                </button>
                <button
                  type='button'
                  className='btn btn-light'
                  onClick={async (e) => {
                    await getPostById(_id)
                    await unlikePost(_id)
                    getAllPosts()
                  }}
                >
                  <i className='fas fa-thumbs-down'></i>
                </button>
                <Link to={`/post/${_id}`} className='btn btn-primary'>
                  Discussion{' '}
                  <span className='comment-count'> {comments.length}</span>
                </Link>
                {user._id === userId && (
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={async (e) => {
                      await deletePostById(_id)
                      getAllPosts()
                    }}
                  >
                    <i className='fas fa-times'></i>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  createPost: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  getPostById: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  unlikePost,
  deletePostById,
})(Posts)
