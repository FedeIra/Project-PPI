export class TokenCacheService {
  private static token: string | null = null;
  private static tokenExpiration: number | null = null;

  static isTokenValid(): boolean {
    return !!this.token && this.tokenExpiration !== null && Date.now() < this.tokenExpiration;
  }

  static getToken(): string | null {
    return this.token;
  }

  static setToken(token: string, expiresIn: number) {
    this.token = token;
    this.tokenExpiration = Date.now() + expiresIn;
  }
}
