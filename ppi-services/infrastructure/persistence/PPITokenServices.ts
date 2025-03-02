import { PPI_BASE_URL } from '../../config/constants';
import axios from 'axios';

export class PPITokenService {
  public static async getToken(user: string, password: string): Promise<void> {
    await this.fetchToken(user, password);
  }

  private static async fetchToken(
    user: string,
    password: string
  ): Promise<void> {
    try {
      const response = await axios.get(`${PPI_BASE_URL.ACCOUNT}/LoginApi`, {
        auth: {
          username: user,
          password: password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'text',
      });

      const token: string = response.data;
    } catch (error: any) {
      throw new Error(`Error al obtener el token: ${error.response.data}`);
    }
  }
}
