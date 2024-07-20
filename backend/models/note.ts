import mongoose from "mongoose";

interface INote {
  id: string;
  content: string;
  important: boolean;
  userId: mongoose.Types.ObjectId;
}

const noteSchema = new mongoose.Schema<INote>({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Note = mongoose.model<INote>("Note", noteSchema);
export default Note;
