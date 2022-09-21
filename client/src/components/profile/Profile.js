import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import {
  getProfileById,
  getGithubRepos,
  setLoading,
} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({
  getProfileById,
  getGithubRepos,
  setLoading,
  profile: { profile, loading, repos },
  auth,
}) => {
  const { id } = useParams()

  useEffect(() => {
    if (profile === null) {
      setLoading()
      getProfileById(id)
    }
  }, [profile])

  return loading ? (
    <Spinner />
  ) : profile !== null ? (
    <Fragment>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
          </Link>
        )}
      <div className='profile-grid my-1'>
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileExperience experience={profile.experience} />
        <ProfileEducation education={profile.education} />
        {profile.githubusername && (
          <ProfileGithub
            getRepos={getGithubRepos}
            username={profile.githubusername}
            repos={repos}
          />
        )}
      </div>
    </Fragment>
  ) : (
    <Fragment>Profile not found</Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  getProfileById,
  getGithubRepos,
  setLoading,
})(Profile)
