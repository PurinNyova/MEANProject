import express from 'express';
import usersRouter from './routes/users';
const app = express();
const PORT: number = 3000;
app.use(express.json());

app.get('/', (request, response) => {
  response.status(200).send('index.html')
});

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})