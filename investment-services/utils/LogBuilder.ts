// External Dependencies:
import pino from 'pino';

// Internal Dependencies:
import { CONFIG } from '../config/constants';

export const logger = pino({
  level: 'info',
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  transport:
    CONFIG.ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            singleLine: false,
            errorLikeObjectKeys: ['err', 'error'],
            messageKey: 'msg',
          },
        }
      : undefined,
});
