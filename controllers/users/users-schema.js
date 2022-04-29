import mongoose from "mongoose";
const usersSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: String,
    firstName: String,
    lastName: String,
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  { collection: "users" }
);
export default usersSchema;
