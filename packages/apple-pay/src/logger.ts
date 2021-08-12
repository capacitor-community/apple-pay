export class Logger {
  private static _instance: Logger | undefined;
  private isEnabled = false;

  public static instance(): Logger {
    if (!Logger._instance) {
      Logger._instance = new Logger();
    }
    return Logger._instance;
  }

  public set enabled(enabled: boolean) {
    if (typeof enabled === 'boolean') {
      this.isEnabled = enabled;
    } else {
      /** Coerce value to boolean */
      this.isEnabled = enabled != null && `${enabled}` !== 'false';
    }
  }

  public log(...args: any[]): void {
    if (this.isEnabled) {
      console.log(...args);
    }
  }

  public error(...args: any[]): void {
    if (this.isEnabled) {
      console.error(...args);
    }
  }
}
