import {
    findAllUsers,
    findUserById,
    findUserByEmail,
    findUserByEmailPass,
    createUser,
    deleteUser,
    updateUser

  } from "./users/user-dao.js";

  const findUsers = async (req, res) => {
    const users = await findAllUsers()
    res.json(users)
  }
  const findAllUsersById = async (req, res) => {
    const userId = req.params['id']
    const user = await findUserById(userId)
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
    const user = await findUserByEmailPass(email, password)
    if(user) {
      res.sendStatus(200)
    } else {
      res.sendStatus(403)
    }
  }
  const createNewUser = async (req, res) => {
    const newUser = req.body
    const insertedUser = await createUser(newUser)
    res.json(insertedUser)
  }
  const deleteAUser = async (req, res) => {
    const userId = req.params.id
    const status = await deleteUser(userId)
    res.json(status)
  }
  const updateAUser = async (req, res) => {
    const userId = req.params.id
    const updatedUser = req.body
    const status = await updateUser(
      userId,
      updatedUser
    )
    res.json(status)
  }
  
  const signup = async (req, res) => {
    const newUser = req.body
    const alreadyRegistered = await findUserByEmail(newUser.email)
    if(alreadyRegistered) {
      res.sendStatus(403)
    } else {
      const actualUser = await createUser(newUser)
      req.session['currentUser'] = actualUser
      res.json(actualUser)
    }
  }
  
  const signin = async (req, res) => {
    const alreadyRegisteredUser = await findUserByEmailPass(req.body.email, req.body.password)
    console.log(alreadyRegisteredUser);
    if(alreadyRegisteredUser) {
      req.session['currentUser'] = alreadyRegisteredUser
      return res.send(alreadyRegisteredUser)
    } else {
      return res.sendStatus(503)
    }
  }
  
  const profile = (req, res) => {
    const loggedInUser = req.session['currentUser']
    if(loggedInUser) {
      res.json(loggedInUser)
    } else {
      res.sendStatus(503)
    }
  }
  
  const signout = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }

  
  export default (app) => {
  
    app.get('/api/users', findUsers) 
    app.get('/api/users/:id', findAllUsersById)
    app.get('/api/users/email/:email', getUserByEmail)
    app.post('/api/users/credentials', findUserByCreds)
    app.post('/api/users', createNewUser)
    app.delete('/api/users/:id', deleteAUser)
    app.put('/api/users/:id', updateAUser)
    app.post('/api/signup', signup)
    app.post('/api/signin', signin)
    app.post('/api/signout', signout)
    app.post('/api/profile', profile)
  }