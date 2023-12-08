const express = require('express')
const {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote
} = require('../controllers/noteController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getNotes)

//GET a single workout
router.get('/:id', getNote)

// POST a new workout
router.post('/', createNote)

// DELETE a workout
router.delete('/:id',deleteNote)

// UPDATE a workout
router.patch('/:id', updateNote)


module.exports = router