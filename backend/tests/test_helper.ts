// const Note = require("../models/note");
// const User = require("../models/user");
import User from "../models/user";
import Note from "../models/note";

const initialNotes = [
	{
		content: "HTML is easy",
		important: false,
	},
	{
		content: "Browser can execute only JavaScript",
		important: true,
	},
];

const nonExistingId = async () => {
	const note = new Note({ content: "willremovethissoon" });
	await note.save();
	await note.deleteOne();

	return note._id.toString();
};

const notesInDb = async () => {
	const notes = await Note.find({});
	return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

// module.exports = {
// 	nonExistingId,
// 	notesInDb,
// 	initialNotes,
// 	usersInDb,
// };

export default {
	nonExistingId,
	notesInDb,
	initialNotes,
	usersInDb,
};
