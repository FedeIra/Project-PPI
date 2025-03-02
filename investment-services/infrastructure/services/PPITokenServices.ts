// External Dependencies:
import axios from 'axios';

// Internal Dependencies:
import { PPI_BASE_URL, PPI_BASE_ACCOUNT_URL } from '../../config/constants';
import { LoginResponsePPI } from '../../domain/entities/account/LoginResponsePPI';

// Service for PPI Token:
export class PPITokenService {
  private static token: string | null = null;
  private static tokenExpiration: number | null = null;
  private static tokenPromise: Promise<void> | null = null;

  public static async getToken(): Promise<string> {
    if (
      !PPITokenService.token ||
      (PPITokenService.tokenExpiration &&
        Date.now() >= PPITokenService.tokenExpiration)
    ) {
      if (!PPITokenService.tokenPromise) {
        PPITokenService.tokenPromise = PPITokenService.fetchToken();
      }
      await PPITokenService.tokenPromise;
      PPITokenService.tokenPromise = null;
    }
    return PPITokenService.token as string;
  }
  private static async fetchToken(): Promise<void> {
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

      if (tokenInfo) {
        PPITokenService.token = tokenInfo.accessToken;
        PPITokenService.tokenExpiration = Date.now() + tokenInfo.expires;
      } else {
        throw new Error('Error trying to obtain token.');
      }
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
