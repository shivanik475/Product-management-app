// Simple console logger with colors
const logger = {
  info(message, data = {}) {
    console.log(
      `%c[INFO]%c ${message}`,
      'color: #007bff; font-weight: bold; background: #e3f2fd; padding: 2px 6px; border-radius: 3px;',
      'color: #333;',
      data
    );
  },

  warn(message, data = {}) {
    console.warn(
      `%c[WARN]%c ${message}`,
      'color: #ff9800; font-weight: bold; background: #fff3e0; padding: 2px 6px; border-radius: 3px;',
      'color: #333;',
      data
    );
  },

  error(message, data = {}) {
    console.error(
      `%c[ERROR]%c ${message}`,
      'color: #f44336; font-weight: bold; background: #ffebee; padding: 2px 6px; border-radius: 3px;',
      'color: #333;',
      data
    );
  },

  debug(message, data = {}) {
    console.debug(
      `%c[DEBUG]%c ${message}`,
      'color: #9c27b0; font-weight: bold; background: #f3e5f5; padding: 2px 6px; border-radius: 3px;',
      'color: #333;',
      data
    );
  },

  success(message, data = {}) {
    console.log(
      `%c[SUCCESS]%c ${message}`,
      'color: #4caf50; font-weight: bold; background: #e8f5e8; padding: 2px 6px; border-radius: 3px;',
      'color: #333;',
      data
    );
  }
};

// Export the logger
export { logger };
export default logger;