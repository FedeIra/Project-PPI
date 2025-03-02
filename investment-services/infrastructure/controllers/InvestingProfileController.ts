// External Dependencies:

// Internal Dependencies:
import { buildResponse } from '../utils/ResponseBuilder';
import { GetInvestmentProfileUseCase } from '../../application/usecases/GetInvestmentProfileUseCase';
import { PPIAccountRepository } from '../repositories/InvestingProfileRepository';

export const GetInvestingProfileController = {
  handle: async (event: any) => {

    const repository = new PPIAccountRepository();
    const useCase = new GetInvestmentProfileUseCase(repository);

    try {
      const data = await useCase.execute();

      return buildResponse({
        status: 'success',
        codeStatus: 200,
        data: {
          requestEmail: data,
        },
      });
    } catch (error) {
      return buildResponse({
        status: 'error',
        codeStatus: 500,
        errorMessage: `Internal error: ${error}`,
      });
    }
  },
};
