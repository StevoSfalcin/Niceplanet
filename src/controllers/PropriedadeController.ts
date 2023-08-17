import { Request, Response } from 'express';
import { ListPropriedadesService } from '../service/ListPropriedadesService';
import { PropriedadeRepository } from '../repositories/PropriedadeRepository';

export default {
  async listPropriedades(request: Request, response: Response) {
    try {
      const { numeroCar } = request.params;

      const listPropriedades = new ListPropriedadesService(new PropriedadeRepository());

      const propriedades = await listPropriedades.execute(numeroCar);

      return response.json({
        error: false,
        message: 'Propriedades listadas com sucesso',
        propriedades
      });

    } catch (errorMessage) {
      return response.json({ error: true, message: errorMessage });
    }
  }

};