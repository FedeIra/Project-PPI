// External Dependencies:
import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';

// Internal Dependencies:
import { AuthorizerUseCase } from './application/usecases/AuthorizerUseCase';
import { JwtService } from './infrastructure/JwtService';

const jwtService = new JwtService();
const authorizerUseCase = new AuthorizerUseCase(jwtService);

export const authorizer = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  return authorizerUseCase.execute(event);
};
