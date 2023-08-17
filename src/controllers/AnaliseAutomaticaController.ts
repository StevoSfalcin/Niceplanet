import { Request, Response } from 'express';
import { ListAnaliseAutomaticaByCar } from '../service/ListAnaliseAutomaticaByCar';
import { AnaliseAutomaticaRepository } from '../repositories/AnaliseAutomaticaRepository';
import { DeleteAnaliseAutomaticaById } from '../service/DeleteAnaliseAutomaticaById';

export default {
  async listAnaliseAutomaticaByCar(request: Request, response: Response) {
    try {
      const { numeroCar } = request.params;

      const listAnaliseAutomaticaByCar = new ListAnaliseAutomaticaByCar(new AnaliseAutomaticaRepository());

      const analisesAutomaticas = await listAnaliseAutomaticaByCar.execute(numeroCar);

      if (analisesAutomaticas.length === 0) {
        return response.json({
          error: false,
          message: 'Nenhuma análise encontrada',
          analisesAutomaticas
        });
      }

      return response.json({
        error: false,
        message: 'Análises listadas com sucesso',
        analisesAutomaticas
      });

    } catch (errorMessage) {
      return response.json({ error: true, message: errorMessage });
    }
  },

  async deleteAnaliseAutomaticaById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deleteAnaliseAutomaticaById = new DeleteAnaliseAutomaticaById(new AnaliseAutomaticaRepository());

      await deleteAnaliseAutomaticaById.execute(Number(id));

      return response.json({
        error: false,
        message: 'Análise automática excluída com sucesso'
      });

    } catch (errorMessage) {
      return response.json({ error: true, message: errorMessage });
    }
  }
};