import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly apiUrl = environment.apiUrl;
  public readonly production = environment.production;
  public readonly cognito = environment.cognito;
  public readonly enableDebugLogs = environment.enableDebugLogs;
  public readonly apiTimeout = environment.apiTimeout;

  constructor() {
    if (this.enableDebugLogs) {
      console.log('🚀 App running in:', this.production ? 'PRODUCTION' : 'DEVELOPMENT');
      console.log('🔗 API URL:', this.apiUrl);
    }
  }

  public log(...args: any[]): void {
    if (this.enableDebugLogs) {
      console.log('[DEBUG]', ...args);
    }
  }

  public warn(...args: any[]): void {
    if (this.enableDebugLogs) {
      console.warn('[WARN]', ...args);
    }
  }

  public error(...args: any[]): void {
    console.error('[ERROR]', ...args);
  }
}
