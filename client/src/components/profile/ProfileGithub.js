import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const ProfileGithub = ({ getRepos, username, repos }) => {
  useEffect(() => {
    getRepos(username)
  }, [])
  return (
    <div class='profile-github'>
      <h2 class='text-primary my-1'>
        <i class='fab fa-github'></i> Github Repos
      </h2>
      {repos.length > 0 ? (
        repos.map((repo) => (
          <div class='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li class='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li class='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li class='badge badge-light'>Forks: {repo.forks}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <h4>Github repo not found</h4>
      )}
    </div>
  )
}

ProfileGithub.propTypes = {
  getRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string,
}

export default ProfileGithub
