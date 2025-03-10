// Internal Dependencies:
import { TokenCacheService } from './PPITokenCacheService';
import { LoginResponsePPI } from '../../domain/entities/account/LoginResponsePPI';
import { logger } from '../../utils/LogBuilder';
import { axiosConfiguration } from '../../config/axiosConfiguration';
import { CONFIG } from '../../config/constants';

// External Dependencies:
import axios from 'axios';

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
  private static async refreshToken(): Promise<string | any> {
    try {
      // get tokens from cache
      const refreshToken: string | null = TokenCacheService.getRefreshToken();
      const previousToken: string | null = TokenCacheService.getToken();

      if (!refreshToken || !previousToken) {
        return await this.requestNewToken();
      }

      // Refresh PPI token:
      const response = await axiosConfiguration.post(
        `${CONFIG.PPI.BASE_URL}/Account/RefreshToken`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            AuthorizedClient: CONFIG.PPI.AUTHORIZED_CLIENT,
            ClientKey: CONFIG.PPI.CLIENT_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      const tokenInfo: LoginResponsePPI = response.data;

      // Store token in cache:
      this.storeToken(tokenInfo);
      return tokenInfo.accessToken;
    } catch (error) {
      logger.error('PPITokenService.refreshToken: Error occurred:', {
        error,
      });
      return this.requestNewToken();
    }
  }

  // Fetch token from PPI:
  private static async fetchToken(): Promise<LoginResponsePPI> {
    try {
      console.info(
        'Fetching new token from PPI',
        CONFIG.PPI.BASE_URL,
        CONFIG.PPI.AUTHORIZED_CLIENT,
        CONFIG.PPI.CLIENT_KEY,
        CONFIG.PPI.API_KEY,
        CONFIG.PPI.API_SECRET
      );
      const response = await axios.post(
        `${CONFIG.PPI.BASE_URL}/Account/LoginApi`,
        {},
        {
          headers: {
            AuthorizedClient: CONFIG.PPI.AUTHORIZED_CLIENT,
            ClientKey: CONFIG.PPI.CLIENT_KEY,
            ApiKey: CONFIG.PPI.API_KEY,
            ApiSecret: CONFIG.PPI.API_SECRET,
          },
        }
      );

      console.log('🚀 ~ PPITokenService ~ fetchToken ~ tokenInfo:', response);

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
