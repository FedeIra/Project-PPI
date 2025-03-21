// External Dependencies:
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { JwtService } from '../../infrastructure/JwtService';
import { LoginUseCase } from '../../application/usecases/LoginUseCase';

// Internal Dependencies:

// Get available balance controller:
export class LoginController {
  private loginUseCase: LoginUseCase;

  constructor() {
    const jwtService = new JwtService();
    this.loginUseCase = new LoginUseCase(jwtService);
  }

  async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      const body = JSON.parse(event.body || '{}');
      const { email, password } = body;

      if (!email || !password) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Email and password are required.' }),
        };
      }

      const token: string = await this.loginUseCase.execute(email, password);

      return {
        statusCode: 200,
        body: JSON.stringify({ token }),
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: error.message || 'Unauthorized.' }),
      };
    }
  }
}
