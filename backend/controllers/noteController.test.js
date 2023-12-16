const mongoose = require('mongoose');

const {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote
} = require('../controllers/noteController.js'); // Replace 'yourController' with the actual file path of your controller

jest.mock('../models/noteModel'); // Assuming the model is using mongoose

const Note = require('../models/noteModel');

describe('Notes Controller Tests', () => {
  const sampleUserId = mongoose.Types.ObjectId();
  const sampleNoteId = mongoose.Types.ObjectId();

  const sampleNote = {
    _id: sampleNoteId,
    title: 'Test Note',
    notetext: 'This is a test note.',
    priority: 1,
    user_id: sampleUserId,
    createdAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getNote', () => {
    it('should get a single note by ID', async () => {
      const req = { params: { id: sampleNoteId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Note.findById.mockResolvedValueOnce(sampleNote);

      await getNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(sampleNote);
    });

    it('should return 404 if the note ID is invalid', async () => {
      const req = { params: { id: 'invalidId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getNote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No such note' });
    });

    it('should return 404 if the note is not found', async () => {
      const req = { params: { id: mongoose.Types.ObjectId() } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Note.findById.mockResolvedValueOnce(null);

      await getNote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No such note' });
    });
  });

  describe('createNote', () => {
    it('should create a new note', async () => {
      const req = {
        user: { _id: sampleUserId },
        body: { title: 'New Note', notetext: 'This is a new note.', priority: 2 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Note.create.mockResolvedValueOnce(sampleNote);

      await createNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(sampleNote);
    });

    it('should return 400 if any required field is missing', async () => {
      const req = { user: { _id: sampleUserId }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createNote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Please fill in all the fields',
        emptyFields: ['title', 'notetext', 'priority']
      });
    });
  });

  describe('deleteNote', () => {
    it('should delete a note by ID', async () => {
      const req = { params: { id: sampleNoteId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Note.findOneAndDelete.mockResolvedValueOnce(sampleNote);

      await deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(sampleNote);
    });

    it('should return 404 if the note ID is invalid', async () => {
      const req = { params: { id: 'invalidId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No such note' });
    });
  });

  describe('updateNote', () => {
    it('should update a note by ID', async () => {
      const req = { params: { id: sampleNoteId }, body: { title: 'Updated Note' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Note.findOneAndUpdate.mockResolvedValueOnce(sampleNote);

      await updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(sampleNote);
    });

    it('should return 404 if the note ID is invalid', async () => {
      const req = { params: { id: 'invalidId' }, body: { title: 'Updated Note' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No such note' });
    });
  });
});
