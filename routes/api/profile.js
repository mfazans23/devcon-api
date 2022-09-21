const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { body, validationResult } = require('express-validator')
const request = require('request')
const config = require('config')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

// @route  GET api/profile/me
// @desc   Get logged in user profile
// @access Public
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    )
    if (!profile) {
      return res.status(400).json({ msg: "There's no profile for this user" })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      body('status', 'Status is required').not().isEmpty(),
      body('skills', 'Skill is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
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
    } = req.body

    // Build profile object
    const profileFields = {}
    profileFields.user = req.user.id

    if (company !== null) profileFields.company = company
    if (website !== null) profileFields.website = website
    if (location !== null) profileFields.location = location
    if (bio !== null) profileFields.bio = bio
    if (status !== null) profileFields.status = status
    if (githubusername !== null) profileFields.githubusername = githubusername
    if (skills !== null) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim())
    }
    // Build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }

      // Create profile
      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])

    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route  GET api/profile/user/:user_id
// @desc   Get user profile by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ errors: { msg: 'Profile not found' } })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ errors: { msg: 'Profile not found' } })
    }
    res.status(500).send('Server error')
  }
})

// @route  DELETE api/profile
// @desc   Delete profile, user, and post
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // Delete posts
    await Post.deleteMany({ user: req.user.id })
    // Delete profile
    await Profile.findOneAndRemove({ user: req.user.id })
    // Delete user
    await User.findOneAndRemove({ _id: req.user.id })
    res.json({ msg: 'User removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route  PUT api/profile/experience
// @desc   Add profil experience
// @access Private
router.put(
  '/experience',
  [
    auth,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('company', 'Company is required').not().isEmpty(),
      body('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, company, location, from, to, current, description } =
      req.body
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.experience.unshift(newExp)

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route  DELETE /api/profile/experience
// @desc   Delete experience
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })
    const removedIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id)

    profile.experience.splice(removedIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message)
  }
})

// @route  PUT api/profile/education
// @desc   Add profil education
// @access Private
router.put(
  '/education',
  [
    auth,
    [
      body('school', 'School is required').not().isEmpty(),
      body('degree', 'Degree is required').not().isEmpty(),
      body('fieldOfStudy', 'Field of study is required').not().isEmpty(),
      body('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { school, degree, fieldOfStudy, from, to, current, description } =
      req.body
    const newExp = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.education.unshift(newExp)

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route  DELETE /api/profile/education
// @desc   Delete education
// @access Private
router.delete('/education/:ed_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })
    const removedIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.ed_id)

    profile.education.splice(removedIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message)
  }
})

// @route  GET /api/profile/github/:username
// @desc   Get user's repos from github
// @access Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sore=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
      },
    }

    request(options, (error, response, body) => {
      if (error) console.error(error)
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No github account found' })
      }

      res.json(JSON.parse(body))
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
