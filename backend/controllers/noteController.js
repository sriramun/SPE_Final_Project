const Note = require('../models/noteModel')

const winston = require('winston');

const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const logger = winston.createLogger({
  level: level(),
  format: format,
  transports: [new winston.transports.Console()],
});

const mongoose = require('mongoose')
// get all notes
const getNotes = async (req, res) => {
  const user_id = req.user._id

  const notes = await Note.find({user_id}).sort({createdAt: -1})

  res.status(200).json(notes)
}

// get a single note
const getNote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such note'})
  }

  const note = await Note.findById(id)

  if (!note) {
    return res.status(404).json({error: 'No such note'})
  }
  
  res.status(200).json(note)
}


// create new note
const createNote = async (req, res) => {
  logger.info('Successfully Note created!');
  const {title,notetext,priority} = req.body
  console.log(title)
  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!notetext) {
    emptyFields.push('notetext')
  }
  if(!priority) {
    emptyFields.push('priority')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const note = await Note.create({title, notetext,priority,user_id})
    console.info('New note created!')
    res.status(200).json(note)
  } catch (error) {
    console.error("Error encountered creating note")
    res.status(400).json({error: error.message})
  }
}

// delete a note
const deleteNote = async (req, res) => {
  logger.info('Successfully Note Deleted!');

  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such note'})
  }

  const note = await Note.findOneAndDelete({_id: id})

  if (!note) {
    return res.status(400).json({error: 'No such note'})
  }

  console.info('Deleting note!')
  res.status(200).json(note)
}

// update a note
const updateNote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such note'})
  }

  const note = await Note.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!note) {
    return res.status(400).json({error: 'No such note'})
  }

  console.info('Updating note!')
  res.status(200).json(note)
}


module.exports = {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote
}