import {  IPPIAccountRepository } from '../interfaces/IGetInvestmentProfileRepository';

export class GetInvestmentProfileUseCase {
  private repository: IPPIAccountRepository;

  constructor(repository: IPPIAccountRepository) {
    this.repository = repository;
  }

  async execute(): Promise<string> {
   return await this.repository.getInvestingProfile();
  }
}
