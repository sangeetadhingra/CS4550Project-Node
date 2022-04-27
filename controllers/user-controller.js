import {
    createUser,
    deleteUser,
    updateUser,
    findAllUsers,
    findUserByEmail,
    findUserById,
    findUserByEmailPass,
  } from "./users/user-dao.js";

  const findUsers = async (req, res) => {
    const users = await usersDao.findAllUsers()
    res.json(users)
  }
  const findAllUsersById = async (req, res) => {
    const userId = req.params['id']
    const user = await usersDao.findUserById(userId)
    res.json(user)
  }
  const getUserByEmail = async (req, res) => {
    const email = req.params.email
    const user = await usersDao.findUserByEmail(email)
    res.json(user)
  }
  const findUserByCreds = async (req, res) => {
    const userCreds = req.body
    const email = userCreds.email
    const password = userCreds.password
    const user = await usersDao.findUserByEmailPass(email, password)
    if(user) {
      res.sendStatus(200)
    } else {
      res.sendStatus(403)
    }
  }
  const createNewUser = async (req, res) => {
    const newUser = req.body
    const insertedUser = await usersDao.createUser(newUser)
    res.json(insertedUser)
  }
  const deleteAUser = async (req, res) => {
    const userId = req.params.id
    const status = await usersDao.deleteUser(userId)
    res.json(status)
  }
  const updateAUser = async (req, res) => {
    const userId = req.params.id
    const updatedUser = req.body
    const status = await usersDao.updateUser(
      userId,
      updatedUser
    )
    res.json(status)
  }
  

  
  export default (app) => {
  
    app.get('/api/users', findUsers) 
    app.get('/api/users/:id', findAllUsersById)
    app.get('/api/users/email/:email', getUserByEmail)
    app.post('/api/users/credentials', findUserByCreds)
    app.post('/api/users', createNewUser)
    app.delete('/api/users/:id', deleteAUser)
    app.put('/api/users/:id', updateAUser)
  }