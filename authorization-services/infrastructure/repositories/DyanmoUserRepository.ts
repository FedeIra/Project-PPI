// External dependencies:
import { DynamoDB } from 'aws-sdk';
import bcrypt from 'bcrypt';

// Internal dependencies:
import { IUserRepository } from '../../application/interfaces/IUserRepository';

const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = 'UserCredentials';

export class DynamoUserRepository implements IUserRepository {
  async validateCredentials(email: string, password: string): Promise<boolean> {
    try {
      const result = await dynamoDb
        .get({
          TableName: TABLE_NAME,
          Key: { email },
        })
        .promise();

      const user = result.Item;
      if (!user || !user.password) return false;

      const isPasswordValid = await bcrypt.compare(password, user.password);
      return isPasswordValid;
    } catch (error) {
      return false;
    }
  }
}
