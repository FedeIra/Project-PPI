// External Dependencies:
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Internal Dependencies:
import { TokenCacheService } from './TokenCacheService';
import { PPI_BASE_URL, PPI_BASE_ACCOUNT_URL } from '../../config/constants';
import { LoginResponsePPI } from '../../domain/entities/account/LoginResponsePPI';
import { logger } from '../../utils/LogBuilder';

// Service for PPI Token:
export class PPITokenService {
  public static async getToken(): Promise<string> {
    if (TokenCacheService.isTokenValid()) {
      return TokenCacheService.getToken() as string;
    }

    const tokenInfo: LoginResponsePPI = await this.fetchToken();
    TokenCacheService.setToken(tokenInfo.accessToken, tokenInfo.expires);
    return tokenInfo.accessToken;
  }

  private static async fetchToken(): Promise<LoginResponsePPI> {
    try {
      axiosRetry(axios, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
      });

      const response = await axios.post(
        `${PPI_BASE_URL.SANDBOX}${PPI_BASE_ACCOUNT_URL.ACCOUNT}LoginApi`,
        {},
        {
          headers: {
            AuthorizedClient: process.env.PPI_AUTHORIZED_CLIENT!,
            ClientKey: process.env.PPI_CLIENT_KEY!,
            ApiKey: process.env.PPI_API_KEY!,
            ApiSecret: process.env.PPI_API_SECRET!,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      logger.error('PPITokenService.fetchToken: Error occurred:', {
        error,
      });
      throw new Error(
        `Error getting token: ${error.response?.data || error.message}`
      );
    }
  }
}
