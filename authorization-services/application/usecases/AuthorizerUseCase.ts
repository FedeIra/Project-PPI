// External Dependencies:
import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';

// Internal Dependencies:
import { JwtService } from '../../infrastructure/JwtService';
import { AuthPolicy } from '../domain/AuthPolicy';

export class AuthorizerUseCase {
  private jwtService: JwtService;

  constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  async execute(
    event: APIGatewayTokenAuthorizerEvent
  ): Promise<APIGatewayAuthorizerResult> {
    if (!event.authorizationToken) {
      throw new Error('Unauthorized');
    }

    const token = event.authorizationToken.replace('Bearer ', '');

    try {
      this.jwtService.verifyToken(token);

      return AuthPolicy.generatePolicy('user', 'Allow', event.methodArn);
    } catch (error) {
      return AuthPolicy.generatePolicy('user', 'Deny', event.methodArn);
    }
  }
}
