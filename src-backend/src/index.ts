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
import rateLimit from 'express-rate-limit';

dotenv.config();

const PORT: string = process.env.PORT ?? 'default'
const MONGO_URI: string = process.env.MONGO_URI ?? 'default'
const app = express();

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP
  message: { type: 'error', message: 'Too many login attempts, please try again later' },
});

const sessionMiddleware = session({
  secret: 'didYouKnowThatVaporeon?',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/main_database', collectionName: 'sessions'}
  ),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  }
});



app.use(express.json());

const allowedOrigins = ['https://prod.purinnova.online', 'https://dev.purinnova.online', 'http://localhost:3002'];

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

app.post('/login', loginLimiter, express.urlencoded({ extended: true }), async (req: Request, res: Response) => {
    if (req.session.user) {
      res.status(200).json({ type: 'session', success: true, username: req.session.user });
      return
    }

    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      res.status(400).json({ type: 'error', message: 'Missing required fields' });
      return
    }

    try {
      const adminQuery = await AdminSchema.findOne({ $and: [{ email }, { name }] });

      if (!adminQuery) {
        res.status(401).json({ type: 'login', success: false, message: 'Invalid credentials' });
        return
      }

      const check = await compare(password, adminQuery.password);
      if (check) {
        req.session.user = name;
        res.status(201).json({ type: 'login', success: true });
        return 
      } else {
        res.status(401).json({ type: 'login', success: false, message: 'Invalid credentials' });
        return 
      }
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ type: 'error', message: 'Server error' });
      return 
    }
  }
);

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
  