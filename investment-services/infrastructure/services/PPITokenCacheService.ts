// External Dependencies:
import fs from 'fs';

// Token cache service:
export class TokenCacheService {
  private static token: string | null = null;
  private static tokenExpiration: number | null = null;
  private static refreshToken: string | null = null;
  private static cacheFilePath = './token_cache.json';

  // Check token is cached and not expired:
  static isTokenValid(): boolean {
    // Cached token:
    if (!this.token || !this.tokenExpiration) {
      return this.loadTokenFromFile();
    }

    // Expiration token:
    const remainingTime: number = this.tokenExpiration - Date.now();
    if (remainingTime <= 0) {
      return false;
    }

    return true;
  }

  // Get token from memory or cache:
  static getToken(): string | null {
    if (!this.token) {
      this.loadTokenFromFile();
    }
    return this.token;
  }

  // Set token in cache:
  static setToken(token: string, expiresInMs: number) {
    this.token = token;
    this.tokenExpiration = Date.now() + (expiresInMs ?? 0);
    this.saveTokenToFile();
  }

  // Get refresh token from memory or cache:
  static getRefreshToken(): string | null {
    if (!this.refreshToken) {
      this.loadTokenFromFile();
    }
    return this.refreshToken;
  }

  // Set refresh token in cache:
  static setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
    this.saveTokenToFile();
  }

  // Store token in cache:
  private static saveTokenToFile() {
    fs.writeFileSync(
      this.cacheFilePath,
      JSON.stringify({
        token: this.token,
        expiration: this.tokenExpiration,
        refreshToken: this.refreshToken,
      })
    );
  }

  // Get cache token from file:
  private static loadTokenFromFile(): boolean {
    try {
      if (fs.existsSync(this.cacheFilePath)) {
        const data = fs.readFileSync(this.cacheFilePath, 'utf-8');
        const parsed = JSON.parse(data);
        this.token = parsed.token;
        this.tokenExpiration = parsed.expiration;
        this.refreshToken = parsed.refreshToken;
        return (this.tokenExpiration ?? 0) > Date.now();
      }
    } catch (error) {
      console.error('Error loading cached token:', error);
    }
    return false;
  }
}
