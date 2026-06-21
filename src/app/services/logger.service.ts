import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
  None = 4,
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: unknown;
  source?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logLevel: LogLevel = LogLevel.Debug;
  private enableConsoleLogging = true;
  private enableRemoteLogging = false;
  private logs: LogEntry[] = [];
  private maxLogSize = 100;

  constructor() {
    this.setLogLevel(this.getEnvironmentLogLevel());
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  debug(message: string, data?: unknown, source?: string): void {
    this.log(LogLevel.Debug, message, data, source);
  }

  info(message: string, data?: unknown, source?: string): void {
    this.log(LogLevel.Info, message, data, source);
  }

  warn(message: string, data?: unknown, source?: string): void {
    this.log(LogLevel.Warn, message, data, source);
  }

  error(message: string, data?: unknown, source?: string): void {
    this.log(LogLevel.Error, message, data, source);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter((entry) => entry.level === level);
  }

  clearLogs(): void {
    this.logs = [];
  }

  private log(level: LogLevel, message: string, data?: unknown, source?: string): void {
    if (level < this.logLevel) return;

    const entry: LogEntry = { level, message, timestamp: new Date(), data, source };

    // cap in-memory log size
    if (this.logs.length >= this.maxLogSize) {
      this.logs.shift();
    }
    this.logs.push(entry);

    if (this.enableConsoleLogging) {
      this.writeToConsole(entry);
    }

    if (this.enableRemoteLogging) {
      this.sendToRemote(entry);
    }
  }

  private writeToConsole(entry: LogEntry): void {
    const prefix = entry.source ? `[${entry.source}]` : '';
    const timestamp = entry.timestamp.toISOString();
    const args: unknown[] = [`${timestamp} ${prefix} ${entry.message}`];
    if (entry.data !== undefined) args.push(entry.data);

    switch (entry.level) {
      case LogLevel.Debug: console.debug(...args); break;
      case LogLevel.Info:  console.info(...args);  break;
      case LogLevel.Warn:  console.warn(...args);  break;
      case LogLevel.Error: console.error(...args); break;
    }
  }

  private sendToRemote(_entry: LogEntry): void {
    // TODO: send to a remote logging endpoint (e.g. POST /api/logs)
  }

  private getEnvironmentLogLevel(): LogLevel {
    return environment.production ? LogLevel.Warn : LogLevel.Debug;
  }
}