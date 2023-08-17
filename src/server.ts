import Express from 'express';
import PropriedadeController from './controllers/PropriedadeController';

const app = Express();
app.use(Express.json());
const PORT = 8000;

app.get('/propriedades/:numeroCar', PropriedadeController.listPropriedades);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});