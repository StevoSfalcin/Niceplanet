import { Request, Response } from 'express';
import { ListPropriedadesService } from '../service/ListPropriedadesService';
import { PropriedadeRepository } from '../repositories/PropriedadeRepository';
import { CreateOrUpdateAnaliseAutomaticaService } from '../service/CreateOrUpdateAnaliseAutomaticaService';
import { AnaliseAutomaticaRepository } from '../repositories/AnaliseAutomaticaRepository';

export default {
  async listPropriedades(request: Request, response: Response) {
    try {
      const { numeroCar } = request.params;

      const listPropriedades = new ListPropriedadesService(new PropriedadeRepository());

      const propriedades = await listPropriedades.execute(numeroCar);

      if (propriedades.length === 0) {
        return response.json({
          error: false,
          message: 'Nenhuma propriedade encontrada',
          propriedades
        });
      }

      propriedades.forEach(propriedade => {

        const createOrUpdateAnalise = new CreateOrUpdateAnaliseAutomaticaService(new AnaliseAutomaticaRepository());

        createOrUpdateAnalise.execute(propriedade);
      });

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