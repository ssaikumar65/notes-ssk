import asyncHandler from 'express-async-handler';
import Notes from '../models/notesModel.js';

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.status(200).json(notes);
})

// @desc    Set notes
// @route   POST /api/notes
// @access  Private
const setNotes = asyncHandler(async (req, res) => {
  if (!req.body.notes) {
    res.status(400);
    throw new Error('Please add a note');
  }
  
  const notes = await Notes.create({
    notes: req.body.notes,
    user: req.user.id,
  });

  res.status(200).json(notes);
})

// @desc    Update notes
// @route   PUT /api/notes/:id
// @access  Private
const updateNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.findById(req.params.id)

  if (!notes) {
    res.status(400)
    throw new Error('Note not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the notes user
  if (notes.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  const updateNotes = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
  });

  res.status(200).json(updateNotes);
})

// @desc    Delete notes
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.findById(req.params.id)

  if (!notes) {
    res.status(400)
    throw new Error('Notes not found')
  }

  //Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the logged in user matches the notes user
  if (notes.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await notes.remove()

  res.status(200).json({ id: req.params.id })
})

export {
  getNotes,
  setNotes,
  updateNotes,
  deleteNotes,
}
