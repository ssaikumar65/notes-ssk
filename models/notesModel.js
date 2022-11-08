import mongoose from 'mongoose';

const notesSchema = mongoose.Schema(
  {
    notes: {
      type: String,
      required: [true,"Please add a note"]
    },
    user: {
      type: String,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

const Notes =  mongoose.model('notes', notesSchema);

export default Notes;
