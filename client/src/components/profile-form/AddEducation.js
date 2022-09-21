import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import withNavigate from '../../utils/withNavigate'
import PropTypes from 'prop-types'
import { addEducation } from '../../actions/profile'
import { connect } from 'react-redux'

const AddEducation = ({ addEducation, navigate }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  })

  const { school, degree, fieldOfStudy, from, to, current, description } =
    formData

  const onChange = (e) => {
    console.log(e.target.type)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addEducation(formData, navigate)
  }
  return (
    <Fragment>
      <h1 class='large text-primary'>Add Your Education</h1>
      <p class='lead'>
        <i class='fas fa-graduation-cap'></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class='form' onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            onChange={(e) => onChange(e)}
            value={school}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            onChange={(e) => onChange(e)}
            value={degree}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldOfStudy'
            onChange={(e) => onChange(e)}
            value={fieldOfStudy}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            onChange={(e) => onChange(e)}
            value={from}
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
            Current School or Bootcamp
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
            placeholder='Program Description'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withNavigate(AddEducation))
