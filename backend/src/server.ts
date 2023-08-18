import express from 'express';
import AuthController from './controllers/AuthController';
import PropriedadeController from './controllers/PropriedadeController';
import AnaliseAutomaticaController from './controllers/AnaliseAutomaticaController';
import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
};
app.use(cors(corsOptions));
app.post('/validate-token', AuthController.validateToken);

app.post('/login', AuthController.login);

// Middleware para validar o token antes de permitir o acesso a rotas protegidas
app.use(AuthController.validateToken);

// Rotas protegidas que exigem token válido
app.get('/propriedades/:numeroCar', PropriedadeController.listPropriedades);
app.get('/analiseAutomaticas/:numeroCar', AnaliseAutomaticaController.listAnaliseAutomaticaByCar);
app.delete('/analiseAutomaticas/:id', AnaliseAutomaticaController.deleteAnaliseAutomaticaById);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});