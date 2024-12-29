import express, { Request, Response } from 'express';
import usersRouter from './routes/users';
import socialsRouter from  './routes/socials';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/users", usersRouter)
app.use("/api/socials", socialsRouter)

// Serve HTML file
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
  