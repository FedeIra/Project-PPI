// Internal Dependencies:
import { IUserRepository } from '../../application/interfaces/IUserRepository';
import { CONFIG } from '../../config/constants';

export class HardcodedUserRepository implements IUserRepository {
  async validateCredentials(email: string, password: string): Promise<boolean> {
    const validEmail = CONFIG.USER_DATA.EMAIL;
    const validPassword = CONFIG.USER_DATA.PASSWORD;

    return email === validEmail && password === validPassword;
  }
}
