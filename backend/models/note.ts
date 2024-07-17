import mongoose from "mongoose";

interface INote {
  id: string;
  content: string;
  important: boolean;
}

const noteSchema = new mongoose.Schema<INote>({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model<INote>("Note", noteSchema);
export default Note;
