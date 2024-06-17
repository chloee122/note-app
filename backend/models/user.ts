import mongoose from "mongoose";

interface IUser {
  username: string;
  name: string;
  passwordHash: string;
    notes: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: String,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
