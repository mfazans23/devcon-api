import React, { useState, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getCurrentProfile, createProfile } from '../../actions/profile'
import { loadUser } from '../../actions/auth'
import withNavigate from '../../utils/withNavigate'
import { connect } from 'react-redux'

const EditProfile = ({
  profile: { profile, loading },
  getCurrentProfile,
  createProfile,
  navigate,
}) => {
  useEffect(() => {
    getCurrentProfile()
    setFormData({
      company: !loading && profile.company ? profile.company : '',
      website: !loading && profile.website ? profile.website : '',
      location: !loading && profile.location ? profile.location : '',
      status: !loading && profile.status ? profile.status : '',
      skills: !loading && profile.skills ? profile.skills.join(',') : '',
      githubusername:
        !loading && profile.githubusername ? profile.githubusername : '',
      bio: !loading && profile.bio ? profile.bio : '',
      twitter:
        !loading && profile.social !== undefined && profile.social.twitter
          ? profile.social.twitter
          : '',
      facebook:
        !loading && profile.social !== undefined && profile.social.facebook
          ? profile.social.facebook
          : '',
      youtube:
        !loading && profile.social !== undefined && profile.social.youtube
          ? profile.social.youtube
          : '',
      instagram:
        !loading && profile.social !== undefined && profile.social.instagram
          ? profile.social.instagram
          : '',
      linkedin:
        !loading && profile.social !== undefined && profile.social.linkedin
          ? profile.social.linkedin
          : '',
    })
    if (!loading && profile.social !== undefined) {
      toggleSocialInput(true)
    }
  }, [loading])

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    bio: '',
    status: '',
    githubusername: '',
    skills: '',
    youtube: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  })

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    linkedin,
    instagram,
  } = formData

  const [displaySocialInput, toggleSocialInput] = useState(false)

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createProfile(formData, navigate, true)
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select value={status} onChange={(e) => onChange(e)} name='status'>
            <option value=''>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>

            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            onChange={(e) => onChange(e)}
            value={company}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            onChange={(e) => onChange(e)}
            value={website}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={(e) => onChange(e)}
            value={location}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            onChange={(e) => onChange(e)}
            value={skills}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            onChange={(e) => onChange(e)}
            value={githubusername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            onChange={(e) => onChange(e)}
            value={bio}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='my-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => toggleSocialInput(!displaySocialInput)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInput && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                onChange={(e) => onChange(e)}
                value={twitter}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                onChange={(e) => onChange(e)}
                value={facebook}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                onChange={(e) => onChange(e)}
                value={youtube}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                onChange={(e) => onChange(e)}
                value={linkedin}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                onChange={(e) => onChange(e)}
                value={instagram}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, {
  loadUser,
  getCurrentProfile,
  createProfile,
})(withNavigate(EditProfile))
