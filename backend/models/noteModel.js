const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  notetext: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Note', noteSchema)