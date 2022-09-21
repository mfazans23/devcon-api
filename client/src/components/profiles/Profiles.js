import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'

import ProfileItem from './ProfileItem'
import Spinner from '../layout/Spinner'
import { getProfiles, setLoading } from '../../actions/profile'

function Profiles({ getProfiles, setLoading, profile: { profiles, loading } }) {
  useEffect(() => {
    if (profiles.length === 0) setLoading()
    getProfiles()
  }, [getProfiles])

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'>
          {' '}
          Browse and connect with developer
        </i>
      </p>
      {profiles.length > 0 ? (
        <div className='profiles'>
          {profiles.map((profile) => (
            <ProfileItem key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <h4>No profile found</h4>
      )}
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles, setLoading })(Profiles)
