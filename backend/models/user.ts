import mongoose from "mongoose";

interface IUser {
  username: string;
  name: string;
  passwordHash: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: String,
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
