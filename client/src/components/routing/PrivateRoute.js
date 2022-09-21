import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children, auth: { isAuthenticated, loading } }) {
  return (
    !loading && (
      <Fragment>
        {isAuthenticated ? children : <Navigate to='/login' />}
      </Fragment>
    )
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(PrivateRoute)
