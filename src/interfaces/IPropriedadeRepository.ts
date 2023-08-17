import { Propriedade } from '@prisma/client';

export interface IPropriedadeRepository {
  list(numeroCar: string): Promise<Propriedade[]>;
}