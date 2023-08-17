import { AnaliseAutomatica, Propriedade } from '@prisma/client';

export interface IAnaliseAutomaticaRepository {
  updateOrCreateByCar(propriedade: Propriedade): Promise<void>;
  listByCar(carNumber: string): Promise<AnaliseAutomatica[]>;
  deleteById(id: number): Promise<void>;
}