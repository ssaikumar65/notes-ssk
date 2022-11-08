import express from 'express';
import { getNotes, setNotes, updateNotes, deleteNotes } from '../controllers/notesController.js';
import protect from '../middleware/authMiddleware.js'

const router = express.Router();


router.route('/').get(protect, getNotes).post(protect, setNotes);
router.route('/:id').delete(protect, deleteNotes).put(protect, updateNotes);


export default router;