import { Propriedade } from '@prisma/client';

export interface IPropriedadeRepository {
  listByCar(numeroCar: string): Promise<Propriedade[]>;
}