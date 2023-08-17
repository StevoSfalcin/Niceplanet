import { Propriedade } from '@prisma/client';
import { IPropriedadeRepository } from '../interfaces/IPropriedadeRepository';
import { prisma } from '../database';


class PropriedadeRepository implements IPropriedadeRepository {
  public async list(numeroCar: string): Promise<Propriedade[]> {
    const propriedade = await prisma.propriedade.findMany({ where: { numeroCar } });
    return propriedade;
  }
}

export { PropriedadeRepository };