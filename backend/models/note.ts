// const mongoose = require("mongoose");
import mongoose from "mongoose";


interface INote {
	content: string,
	important: boolean
	user: mongoose.Types.ObjectId;
}

const noteSchema = new mongoose.Schema<INote>({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},
	important: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
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
