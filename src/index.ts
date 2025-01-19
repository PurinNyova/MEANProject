import express, { Request, Response } from 'express';
import usersRouter from './routes/users';
import socialsRouter from  './routes/socials';
import testRouter from './routes/dbtest'
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import path from 'path';

dotenv.config();
const app = express();
const port = 3001

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/users", usersRouter)
app.use("/about/", socialsRouter)
app.use("/api/db", testRouter)

// Serve HTML file
app.get('/', express.static(path.join(__dirname, 'public')), (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
  