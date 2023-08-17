import { IAnaliseAutomaticaRepository } from '../interfaces/IAnaliseAutomaticaRepository';

class ListAnaliseAutomaticaByCar {
  constructor(private AnaliseAutomaticaRepository: IAnaliseAutomaticaRepository) {}

  public async execute(numeroCar: string) {
    const analiseAutomatica = await this.AnaliseAutomaticaRepository.listByCar(numeroCar);
    return analiseAutomatica;
  }
}

export { ListAnaliseAutomaticaByCar };