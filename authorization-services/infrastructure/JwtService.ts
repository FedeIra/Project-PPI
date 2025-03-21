// External Dependencies:
import jwt from 'jsonwebtoken';

// Internal Dependencies:
import { CONFIG } from '../config/constants';

export class JwtService {
  private secretKey: string;

  constructor() {
    this.secretKey = CONFIG.JWT_SECRET;
  }

  // JWT token verification:
  verifyToken(token: string) {
    return jwt.verify(token, this.secretKey);
  }

  // JWT token generation:
  generateToken(email: string, password: string) {
    // Check if the email and password are correct:
    if (
      email !== CONFIG.USER_DATA.EMAIL ||
      password !== CONFIG.USER_DATA.PASSWORD
    ) {
      throw new Error('Unauthorized.');
    }
    // Generate a new token:
    return jwt.sign({ email, password }, CONFIG.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}
