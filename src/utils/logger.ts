export default class Logger {
  static log(message, ...args): void {
    console.log(message, ...args);
  }

  static info(message, ...args): void {
    console.log(message, ...args);
  }

  static warn(message, ...args): void {
    console.log(message, ...args);
  }

  static error(message, ...args): void {
    console.error(message, ...args);
  }
}
