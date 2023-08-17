import Express from 'express';

const app = Express();
app.use(Express.json());
const PORT = 8000;

app.get('/', (request, response) => {
  response.send('Hello world!');
  return response.send({message: 'Hello world!'});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});