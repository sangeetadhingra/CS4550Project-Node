import mongoose from "mongoose";
import usersSchema from "./users-schema.js";
const userModel = mongoose.model("UserModel", usersSchema);
export default userModel;
