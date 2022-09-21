import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import withNavigate from '../../utils/withNavigate'
import PropTypes from 'prop-types'
import { addExperience } from '../../actions/profile'
import { connect } from 'react-redux'

const AddExperience = ({ addExperience, navigate }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  })

  const { title, company, location, from, to, current, description } = formData

  const onChange = (e) => {
    console.log(e.target.type)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addExperience(formData, navigate)
  }

  return (
    <Fragment>
      <h1 class='large text-primary'>Add An Experience</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class='form' onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            onChange={(e) => onChange(e)}
            value={title}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            onChange={(e) => onChange(e)}
            value={company}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={(e) => onChange(e)}
            value={location}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              onChange={(e) => {
                setFormData({
                  ...formData,
                  current: !current,
                })
              }}
              value={current}
              checked={current}
            />{' '}
            Current Job
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            onChange={(e) => onChange(e)}
            value={to}
            disabled={current}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            onChange={(e) => onChange(e)}
            value={description}
            cols='30'
            rows='5'
            placeholder='Job Description'
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withNavigate(AddExperience))
