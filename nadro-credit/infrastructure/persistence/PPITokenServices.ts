import { ATLAX_BASE_URI } from '../../config/constants';
import axios from 'axios';

export class PPITokenService {
  private static token: string | null = null;

  private static async fetchToken(
    user: string,
    password: string
  ): Promise<void> {
    try {
      const response = await axios.get(
        `${ATLAX_BASE_URI.WEBAPI}/webapi/Specific/webapiservicerest.svc/GetToken`,
        {
          params: {
            user: decodeURIComponent(user),
            password: decodeURIComponent(password),
          },
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'text',
        }
      );

      const token = response.data;
      if (token) {
        AtlaxTokenService.token = token;
      } else {
        throw new Error('No se pudo obtener el token: Respuesta vacía');
      }
    } catch (error: any) {
      throw new Error(`Error al obtener el token: ${error.response.data}`);
    }
  }
}
