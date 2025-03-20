// External Dependencies:
import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';

// Internal Dependencies:
import { AuthorizerUseCase } from './application/usecases/AuthorizerUseCase';
import { JwtService } from './infrastructure/JwtService';

// All dependencies:
const jwtService = new JwtService();
const authorizerUseCase = new AuthorizerUseCase(jwtService);

// Handler:
export const authorizer = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  return authorizerUseCase.execute(event);
};
