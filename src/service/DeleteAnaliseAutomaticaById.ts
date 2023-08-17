import { IAnaliseAutomaticaRepository } from '../interfaces/IAnaliseAutomaticaRepository';

class DeleteAnaliseAutomaticaById {
  constructor(private AnaliseAutomaticaRepository: IAnaliseAutomaticaRepository) {}

  public async execute(id: number) {
    const analiseAutomatica = await this.AnaliseAutomaticaRepository.deleteById(id);
    return analiseAutomatica;
  }
}

export { DeleteAnaliseAutomaticaById };