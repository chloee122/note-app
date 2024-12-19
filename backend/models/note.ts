import mongoose from "mongoose";

export interface INote {
  id: string;
  title: string;
  htmlContent: string;
  plainTextContent: string;
  userId: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    title: { type: String, required: true },
    htmlContent: {
      type: String,
    },
    plainTextContent: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

noteSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.createdAt = returnedObject.createdAt.toISOString();
    returnedObject.updatedAt = returnedObject.updatedAt.toISOString();
    returnedObject.userId = returnedObject.userId.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model<INote>("Note", noteSchema);
export default Note;
