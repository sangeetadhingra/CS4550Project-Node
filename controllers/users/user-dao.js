import userModel from "./user-model.js";

export const createUser = (user) => {
  return userModel.create(user);
};

export const deleteUser = (userID) => {
  return userModel.deleteOne({ _id: userID });
};

export const updateUser = (userID, userUpdated) => {
  return userModel.updateOne({ _id: userID }, { $set: userUpdated });
};

export const findAllUsers = () => {
  return userModel.find();
};

export const findUserById = (userID) => {
  return userModel.findById(userID);
};

export const findUserByEmailPass = (email, password) => {
  return userModel.findOne({ email, password });
};

export const findUserByEmail = (email) => {
  return userModel.findOne({ email });
};
