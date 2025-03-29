// External Dependencies:
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

// Internal Dependencies:
import { LoginUseCase } from '../../application/usecases/LoginUseCase';

// Login controller:
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

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

      const token = await this.loginUseCase.execute(email, password);

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
