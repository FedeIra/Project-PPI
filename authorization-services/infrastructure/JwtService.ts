// External Dependencies:
import jwt from 'jsonwebtoken';

// Internal Dependencies:
import { environment } from '../config/environment';

export class JwtService {
  private secretKey: string;

  constructor() {
    this.secretKey = environment.JWT_SECRET;
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.secretKey);
  }
}
