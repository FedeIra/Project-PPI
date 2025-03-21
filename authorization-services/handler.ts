// External Dependencies:
import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
  APIGatewayEvent,
} from 'aws-lambda';

// Internal Dependencies:
import { AuthorizerUseCase } from './application/usecases/AuthorizerUseCase';
import { JwtService } from './infrastructure/JwtService';
import { LoginController } from './infrastructure/controllers/LoginController';

// All dependencies:
const jwtService = new JwtService();
const authorizerUseCase = new AuthorizerUseCase(jwtService);
const loginController = new LoginController();

// Authorizer Handler:
export const authorizer = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  return authorizerUseCase.execute(event);
};

// Login Handler:
export const login = async (event: APIGatewayEvent) => {
  return loginController.handle(event);
};
