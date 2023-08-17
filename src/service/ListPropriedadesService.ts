import { IPropriedadeRepository } from '../interfaces/IPropriedadeRepository';

class ListPropriedadesService {
  constructor(private PropriedadeRepository: IPropriedadeRepository) {}

  public async execute(numeroCar: string) {
    const propriedade = await this.PropriedadeRepository.list(numeroCar);
    return propriedade;
  }
}

export { ListPropriedadesService };