import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({ experience }) => {
  return (
    <div class='profile-exp bg-white p-2'>
      <h2 class='text-primary'>Experience</h2>
      {experience.length > 0 ? (
        experience.map((exp) => (
          <div key={exp._id}>
            <h3 class='text-dark'>{exp.company}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
              {exp.to ? <Moment format='YYYY/MM/DD'>{exp.to}</Moment> : 'Now'}
            </p>
            {exp.position && (
              <p>
                <strong>Position: </strong>
                {exp.position}
              </p>
            )}
            {exp.description && (
              <p>
                <strong>Description: </strong>
                {exp.description}
              </p>
            )}
          </div>
        ))
      ) : (
        <h4>Experience record not provided yet</h4>
      )}
    </div>
  )
}

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ProfileExperience
