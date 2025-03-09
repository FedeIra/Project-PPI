// External Dependencies:
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Internal Dependencies:
import { TokenCacheService } from './PPITokenCacheService';
import { PPI_BASE_URL, PPI_BASE_ACCOUNT_URL } from '../../config/constants';
import { LoginResponsePPI } from '../../domain/entities/account/LoginResponsePPI';
import { logger } from '../../utils/LogBuilder';

// Retry configuration:
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

// Service for PPI Token:
export class PPITokenService {
  // Get PPI token:
  public static async getToken(): Promise<string> {
    if (TokenCacheService.isTokenValid()) {
      return TokenCacheService.getToken() as string;
    }

    // Refresh token:
    if (TokenCacheService.getRefreshToken()) {
      return await this.refreshToken();
    }

    // Request new token:
    return await this.requestNewToken();
  }

  // Request new token from PPI:
  private static async requestNewToken(): Promise<string> {
    const tokenInfo: LoginResponsePPI = await this.fetchToken();

    // Store token:
    this.storeToken(tokenInfo);
    return tokenInfo.accessToken;
  }

  // Refresh PPI token:
  private static async refreshToken(): Promise<string> {
    try {
      const refreshToken: string | null = TokenCacheService.getRefreshToken();

      if (!refreshToken) {
        return await this.requestNewToken();
      }

      // Refresh PPI token:
      const response = await axios.post(
        `${PPI_BASE_URL.SANDBOX}${PPI_BASE_ACCOUNT_URL.ACCOUNT}RefreshToken`,
        { refreshToken },
        {
          headers: {
            AuthorizedClient: process.env.PPI_AUTHORIZED_CLIENT!,
            ClientKey: process.env.PPI_CLIENT_KEY!,
            'Content-Type': 'application/json',
          },
        }
      );

      const tokenInfo: LoginResponsePPI = response.data;
      // Store token in cache:
      this.storeToken(tokenInfo);
      return tokenInfo.accessToken;
    } catch (error: any) {
      logger.error('Error refreshing token, requesting new token.', { error });
      return await this.requestNewToken();
    }
  }

  // Fetch token from PPI:
  private static async fetchToken(): Promise<LoginResponsePPI> {
    try {
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

      const tokenInfo: LoginResponsePPI = response.data;

      return tokenInfo;
    } catch (error: any) {
      logger.error('PPITokenService.fetchToken: Error occurred:', {
        error,
      });
      throw new Error(
        `Error getting token: ${error.response?.data || error.message}`
      );
    }
  }

  // Store token in cache:
  private static storeToken(tokenInfo: LoginResponsePPI) {
    const expirationTimeMs: number = tokenInfo.expires * 1000;

    TokenCacheService.setToken(tokenInfo.accessToken, expirationTimeMs);
    TokenCacheService.setRefreshToken(tokenInfo.refreshToken);
  }
}
