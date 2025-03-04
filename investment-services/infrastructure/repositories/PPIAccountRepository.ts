// External Dependencies:
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Internal Dependencies:
import { PPI_BASE_URL, PPI_BASE_ACCOUNT_URL } from '../../config/constants';
import { IPPIAccountRepository } from '../../application/interfaces/IGetAvailableBalanceRepository';
import { PPITokenService } from '../services/PPITokenServices';
import { AccountBalanceResponsePPI } from '../../domain/entities/account/AccountBalanceResponsePPI';
import { logger } from '../../utils/LogBuilder';

// PPI Account repository:
export class PPIAccountRepository implements IPPIAccountRepository {
  // Constructor with axios retry configuration:
  constructor() {
    axiosRetry(axios, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        return (
          axiosRetry.isNetworkError(error) ||
          error.response?.status === 500 ||
          error.response?.status === 503
        );
      },
    });
  }
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
      logger.error(
        'PPIAccountRepository.getAvailableBalance: Error occurred:',
        {
          error,
        }
      );
      throw new Error(`Error getting balance: ${error.message}`);
    }
  }
}
