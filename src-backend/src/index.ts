import express, { Request, response, Response } from 'express';
import usersRouter from './routes/users';
import socialsRouter from  './routes/socials';
import testRouter from './routes/dbtest';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import path from 'path';
import UserSchema from './models/user.model';

dotenv.config();
const app = express();
const port = 3001

var cors = require('cors')
app.use(express.json());
app.use(cors())

app.use("/api/users", usersRouter)
app.use("/about/", socialsRouter)
app.use("/api/db", testRouter)

// Serve HTML file
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({success: true})
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
  