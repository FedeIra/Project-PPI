// External Dependencies:
import axios from 'axios';

// Internal Dependencies:
import { PPI_BASE_URL } from '../../config/constants';
import { IPPIAccountRepository } from '../../application/interfaces/IGetInvestmentProfileRepository';
import { PPITokenService } from '../services/PPITokenServices';

export class PPIAccountRepository implements IPPIAccountRepository {
async getInvestingProfile(
): Promise<any> {
  try {

    const token: string = await PPITokenService.getToken();

    const response = await axios.get(`${PPI_BASE_URL.ACCOUNT}/InvestingProfile?accountNumber=${process.env.PPI_ACCOUNT_NUMBER}`, {
      headers: {
        AuthorizedClient: process.env.PPI_AUTHORIZED_CLIENT,
        ClientKey: process.env.PPI_CLIENT_KEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Error trying to obtain investing profile: ${error.response.data}`);
  }
}
}
