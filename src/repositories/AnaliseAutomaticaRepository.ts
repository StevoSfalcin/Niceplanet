import { AnaliseAutomatica, Propriedade } from '@prisma/client';
import { IAnaliseAutomaticaRepository } from '../interfaces/IAnaliseAutomaticaRepository';
import { prisma } from '../database';

class AnaliseAutomaticaRepository implements IAnaliseAutomaticaRepository {
  public async updateOrCreateByCar(propriedade: Propriedade): Promise<void> {
    // eslint-disable-next-line
    // @ts-ignore
    for (const vinculo of propriedade.produtores) {
      const analiseAutomatica = await prisma.analiseAutomatica.findFirst({
        where: { car: propriedade.numeroCar, produtorCpf: vinculo.produtor.registroIndividual },
      });

      if (!analiseAutomatica) {
        await prisma.analiseAutomatica.create({
          data: {
            produtorNome: vinculo.produtor.nomeProdutor || null,
            produtorCpf: vinculo.produtor.registroIndividual,
            propriedadeNome: propriedade.nomePropriedade || null,
            car: propriedade.numeroCar,
            uf: propriedade.uf || null,
            municipio: propriedade.municipio || null,
            status: propriedade.status || null,
            estadoMonitoramento: propriedade.liberado || null,
          },
        });
      } else {
        await prisma.analiseAutomatica.update({
          where: { id: analiseAutomatica.id },
          data: {
            produtorNome: vinculo.produtor.nomeProdutor || null,
            propriedadeNome: propriedade.nomePropriedade || null,
            uf: propriedade.uf || null,
            municipio: propriedade.municipio || null,
            status: propriedade.status || null,
            estadoMonitoramento: propriedade.liberado || null,
          },
        });
      }
    }
  }
  public async listByCar(carNumber: string): Promise<AnaliseAutomatica[]> {
    const analisesAutomaticas = await prisma.analiseAutomatica.findMany({
      where: {
        car: carNumber,
      },
    });

    return analisesAutomaticas;
  }
  public async deleteById(id: number): Promise<void> {
    await prisma.analiseAutomatica.delete({
      where: {
        id: id,
      },
    });
  }
}


export { AnaliseAutomaticaRepository };