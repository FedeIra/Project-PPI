import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET ?? 'default-secret-key',
};
