import { config } from 'dotenv';
config();

export type envKey = 'PORT';

export const envConfig = <T>(key: envKey): T => {
  const env = process.env[key];

  if (typeof env === 'undefined' && process.env.NODE_ENV === 'development') {
    throw new Error(`${key} is not defined`);
  }

  return env as T;
};

export const isLocalEnv = () => process.env.NODE_ENV === 'development';
