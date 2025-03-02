// External Dependencies:
import axios from 'axios';

// Internal Dependencies:
import { PPI_BASE_URL } from '../../config/constants';
import { LoginResponsePPI } from '../../domain/entities/account/LoginResponsePPI';

// Service for PPI Token:
export class PPITokenService {
  private static token: string | null = null
  private static tokenExpiration: number | null = null;

  public static async getToken(): Promise<string> {
    if (!PPITokenService.token || (PPITokenService.tokenExpiration && Date.now() >= PPITokenService.tokenExpiration)) {
      await PPITokenService.fetchToken();
    }
    return PPITokenService.token as string;
  }

  private static async fetchToken(
  ): Promise<void> {
    try {
      const response: LoginResponsePPI[] = await axios.post(`${PPI_BASE_URL.ACCOUNT}/LoginApi`, {
        headers: {
          AuthorizedClient: process.env.PPI_AUTHORIZED_CLIENT,
          ClientKey: process.env.PPI_CLIENT_KEY,
          'Content-Type': 'application/json',
          ApiKey: process.env.PPI_API_KEY,
          ApiSecret: process.env.PPI_API_SECRET,
        },
      });

      const token: string = response[0].accessToken;

      if (token) {
        PPITokenService.token = token;
        PPITokenService.tokenExpiration = Date.now() + 1000 * 60 * 60;
      } else {
        throw new Error('Error trying to obtain token.');
      }
    } catch (error: any) {
      throw new Error(`Error trying to obtain token: ${error.response.data}`);
    }
  }
}
