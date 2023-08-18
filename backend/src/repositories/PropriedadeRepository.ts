import { Propriedade } from '@prisma/client';
import { IPropriedadeRepository } from '../interfaces/IPropriedadeRepository';
import { prisma } from '../database';


class PropriedadeRepository implements IPropriedadeRepository {
  public async listByCar(numeroCar: string): Promise<Propriedade[]> {
    const propriedades = await prisma.propriedade.findMany({
      where: { numeroCar },
      include: {
        produtores: {
          include: {
            produtor: true
          }
        }
      }
    });
    return propriedades;
  }
}

export { PropriedadeRepository };