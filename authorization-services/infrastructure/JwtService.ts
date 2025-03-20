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
}
