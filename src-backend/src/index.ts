import express, { Request, Response } from 'express';
import usersRouter from './routes/users';
import cdnRouter from  './routes/cdn';
import testRouter from './routes/dbtest';
import AdminSchema from './models/admin.model';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import { compare } from 'bcryptjs'
import path from "path"
import fs from "fs"

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
  secret: 'didYouKnowThatVaporeon?',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/main_database', collectionName: 'sessions'}
  ),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
});



app.use(express.json());

const allowedOrigins = ['https://prod.purinnova.online', 'https://dev.purinnova.online'];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}

var cors = require('cors')
app.use(cors(corsOptions))


app.use(sessionMiddleware)
app.use("/api/users", usersRouter)
app.use("/api/cdn", cdnRouter)
app.use("/api/db",testRouter)


app.get('/', (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({type: 'session', success: true})
  } else {
  res.status(200).json({success: true})
  }
});

app.get('/login', async (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({ type: 'session', success: true, username: req.session.user });
  } else {
    res.status(200).json({type: 'session', success: false})
  }
});

app.post('/login', express.urlencoded({ extended: true }), async (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({ type: 'session', success: true, username: req.session.user });
  } else {
    const { name, email, password } = req.body;
    
    try {
      const adminQuery = await AdminSchema.findOne({ $and: [{ email: email }, { name: name }] });
      
      if (adminQuery) {
        const check = await compare(password, adminQuery.password);
        
        if (check) {
          req.session.user = name;
          res.status(201).json({ type: 'login', success: true });
        } else {
          res.status(401).json({ type: 'login', success: false });
        }
      } else {
        res.status(401).json({ type: 'login', success: false, message: 'no user' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ type: 'error', message: 'An error occurred' });
    }
  }
});

app.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({success: false, type: 'logout'})
      return
    }
    res.status(200).json({success: true, type: 'logout'})
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at https://localhost:${PORT}`);
});
  