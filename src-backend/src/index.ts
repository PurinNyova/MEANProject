import express, { json, Request, response, Response } from 'express';
import usersRouter from './routes/users';
import cdnRouter from  './routes/cdn';
import testRouter from './routes/dbtest';
import AdminSchema from './models/admin.model';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import session from 'express-session'
import MongoStore from 'connect-mongo';
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
  secret: 'didYouKnowThatVaporeon?',
  resave: true,
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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://dev.purinnova.online:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use("/api/users", usersRouter)
app.use("/api/cdn", sessionMiddleware, cdnRouter)
app.use("/api/db", testRouter)


// Serve HTML file
app.get('/', sessionMiddleware, (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({type: 'session', success: true})
  } else {
  res.status(200).json({success: true})
  }
});

app.get('/login', sessionMiddleware, async (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({ type: 'session', success: true, username: req.session.user });
  } else {
    res.status(200).json({type: 'session', success: false})
  }
});

app.post('/login', sessionMiddleware, express.urlencoded({ extended: true }), async (req: Request, res: Response) => {
  console.log(req.session)
  if (req.session.user) {
    res.status(200).json({ type: 'session', success: true, username: req.session.user });
  } else {
    const { name, email, password } = req.body;
    console.log(req.body)
    
    try {
      const adminQuery = await AdminSchema.findOne({ $or: [{ email: email }, { name: name }] });
      
      if (adminQuery) {
        const check = await compare(password, adminQuery.password);
        
        if (check) {
          req.session.user = name;
          console.log(name)
          console.log(req.session.user)
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

app.post('/logout', sessionMiddleware, (req: Request, res: Response) => {
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
  console.log(`Server is running at http://localhost:${PORT}`);
});
  