import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the User model
const UserSchema: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: {type: String, required: true, unique: true}
  },
  {
    timestamps: true, 
  }
);

// Create and export the User model
const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
