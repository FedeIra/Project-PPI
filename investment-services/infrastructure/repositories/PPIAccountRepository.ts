// External Dependencies:
import axios from 'axios';

// Internal Dependencies:
import { PPI_BASE_URL, PPI_BASE_ACCOUNT_URL } from '../../config/constants';
import { IPPIAccountRepository } from '../../application/interfaces/IGetAvailableBalanceRepository';
import { PPITokenService } from '../services/PPITokenServices';
import { AccountBalanceResponsePPI } from '../../domain/entities/account/AccountBalanceResponsePPI';

// PPI Account repository:
export class PPIAccountRepository implements IPPIAccountRepository {
  // Get investing profile service:
  async getAvailableBalance(): Promise<AccountBalanceResponsePPI[]> {
    try {
      const token: string = await PPITokenService.getToken();

      const response = await axios.get(
        `${PPI_BASE_URL.SANDBOX}${PPI_BASE_ACCOUNT_URL.ACCOUNT}AvailableBalance?accountNumber=${process.env.PPI_ACCOUNT_NUMBER}`,
        {
          headers: {
            AuthorizedClient: process.env.PPI_AUTHORIZED_CLIENT,
            ClientKey: process.env.PPI_CLIENT_KEY,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error trying to obtain token: ${
          error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message
        }`
      );
    }
  }
}
