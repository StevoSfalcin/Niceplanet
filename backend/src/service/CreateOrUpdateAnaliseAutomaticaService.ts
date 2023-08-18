import { Propriedade } from '@prisma/client';
import { IAnaliseAutomaticaRepository } from '../interfaces/IAnaliseAutomaticaRepository';

class CreateOrUpdateAnaliseAutomaticaService {
  constructor(private PropriedadeRepository: IAnaliseAutomaticaRepository) {}

  public async execute(propriedade: Propriedade) {
    const analiseAutonatica = await this.PropriedadeRepository.updateOrCreateByCar(propriedade);
    return analiseAutonatica;
  }
}

export { CreateOrUpdateAnaliseAutomaticaService };