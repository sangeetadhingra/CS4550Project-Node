import express from "express";
import recipeController from "./controllers/recipes-controller.js";
import cors from "cors";
import mongoose from "mongoose";
import userController from "./controllers/user-controller.js";
import apiController from "./controllers/api-controller.js";
import CommentsController from "./controllers/ comments-controller.js";
import session from "express-session"

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/webdev";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());

const sess = {
  secret: 'keyboard cat', //  move this to environment variable !!!!
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) 
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

recipeController(app);
userController(app);
apiController(app);
CommentsController(app);
app.listen(process.env.PORT || 4000);
