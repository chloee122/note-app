import mongoose from "mongoose";

export interface INote {
  id: string;
  title: string;
  htmlContent: string;
  plainTextContent: string;
  userId: mongoose.Types.ObjectId;
}

const noteSchema = new mongoose.Schema<INote>({
  title: { type: String, required: true },
  htmlContent: {
    type: String,
  },
  plainTextContent: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Note = mongoose.model<INote>("Note", noteSchema);
export default Note;
