import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import {
  addComment,
  getPostById,
  deleteComment,
  setLoading,
} from '../../actions/post'
import Spinner from '../layout/Spinner'

const Post = ({
  getPostById,
  addComment,
  setLoading,
  deleteComment,
  post: { post, loading },
  auth: { user },
}) => {
  const { id } = useParams()
  useEffect(() => {
    setLoading()
    getPostById(id)
  }, [])

  const [comment, setComment] = useState('')

  const onChange = (e) => {
    setComment(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addComment(id, comment)
    setComment('')
  }

  return loading ? (
    <Spinner />
  ) : (
    post !== null && (
      <Fragment>
        <Link to='/posts' className='btn'>
          Back To Posts
        </Link>
        <div className='post bg-white p-1 my-1'>
          <div>
            <Link to={`/profile/${post.user}`}>
              <img className='round-img' src={post.avatar} alt='' />
              <h4>{post.name}</h4>
            </Link>
          </div>
          <div>
            <p className='my-1'>{post.text}</p>
          </div>
        </div>

        <div className='post-form' onSubmit={(e) => onSubmit(e)}>
          <div className='bg-primary p'>
            <h3>Leave A Comment</h3>
          </div>
          <form className='form my-1'>
            <textarea
              name='text'
              cols='30'
              rows='5'
              placeholder='Comment on this post'
              value={comment}
              onChange={(e) => onChange(e)}
              required
            ></textarea>
            <input type='submit' className='btn btn-dark my-1' value='Submit' />
          </form>
        </div>

        <div className='comments'>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div className='post bg-white p-1 my-1' key={comment._id}>
                <div>
                  <Link to={`/profile/${comment.user}`}>
                    <img className='round-img' src={comment.avatar} alt='' />
                    <h4>{comment.name}</h4>
                  </Link>
                </div>
                <div>
                  <p className='my-1'>{comment.text}</p>
                  <p className='post-date'>
                    Posted on{' '}
                    <Moment format='DD-MM-YYYY'>{comment.date}</Moment>
                  </p>
                  {user._id === comment.user && (
                    <button
                      type='button'
                      class='btn btn-danger'
                      onClick={async (e) => {
                        await deleteComment(post._id, comment._id)
                        getPostById(post._id)
                      }}
                    >
                      <i class='fas fa-times'></i>
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className='post bg-white p-1 my-1'>
              <h4>No comment yet</h4>
            </div>
          )}
        </div>
      </Fragment>
    )
  )
}

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  getPostById,
  addComment,
  setLoading,
  deleteComment,
})(Post)
