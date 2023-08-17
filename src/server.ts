import Express from 'express';
import PropriedadeController from './controllers/PropriedadeController';
import AnaliseAutomaticaController from './controllers/AnaliseAutomaticaController';

const app = Express();
app.use(Express.json());
const PORT = 8000;

app.get('/propriedades/:numeroCar', PropriedadeController.listPropriedades);
app.get('/analiseAutomaticas/:numeroCar', AnaliseAutomaticaController.listAnaliseAutomaticaByCar);
app.delete('/analiseAutomaticas/:id', AnaliseAutomaticaController.deleteAnaliseAutomaticaById);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});