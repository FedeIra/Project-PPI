// Internal Dependencies:
import { JwtService } from '../../infrastructure/JwtService';

// Get available balance use case:
export class LoginUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(email: string, password: string): Promise<string> {
    const token: string = this.jwtService.generateToken(email, password);
    return token;
  }
}
