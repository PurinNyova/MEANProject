import express, { json, Request, response, Response } from 'express';
import usersRouter from './routes/users';
import cdnRouter from  './routes/cdn';
import testRouter from './routes/dbtest';
import AdminSchema from './models/admin.model';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import crypto from 'crypto'
import { compare } from 'bcryptjs'

dotenv.config();

const PORT: string = process.env.PORT ?? 'default'
const MONGO_URI: string = process.env.MONGO_URI ?? 'default'
const app = express();

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}

const sessionMiddleware = session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/main_database', collectionName: 'sessions'}
  ),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
});


var cors = require('cors')
app.use(express.json());
app.use(cors())
app.use("/api/users", usersRouter)
app.use("/api/cdn", sessionMiddleware, cdnRouter)
app.use("/api/db", testRouter)


// Serve HTML file
app.get('/', /*sessionMiddleware,*/ (req: Request, res: Response) => {
  /*if (req.session.user) {
    res.status(200).json({type: 'session', success: true})
  } else {*/
  res.status(200).json({success: true})
});

app.get('/login', sessionMiddleware, async (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({type: 'session', success: true})
  } else {
      const {username, email, password} = req.body
      const adminQuery = await AdminSchema.findOne(
        {$or : [{email: email}, {name: username}]},
        function (err: any, docs: any) {
        if (err){ console.error(err)}
    });

    if (adminQuery) {
      const check = await compare(password, adminQuery.password)
      if (check) {
        req.session.user = 'username'
      }
    }
  }


})

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
  