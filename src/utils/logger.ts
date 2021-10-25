import * as winston from 'winston';
import { Request, Response } from 'express';
import { performance } from 'perf_hooks';
// import validator from 'validator';

type LogPredicate = () => string;

export function getDuration(startTime: any): string {
    return (performance.now() - startTime).toFixed(0);
}

export function logHttpRequest(req: Request, requestId: string): void {
    NoContextLogger.info(() => `[REQ] [${requestId}] ${req.method} ${req.originalUrl}`);
    NoContextLogger.debug(() => `[REQ] [${requestId}] Request body: ${JSON.stringify(req.body)}`);
}

export function logHttpResponse(req: Request, res: Response, body: any): void {
    // const xrequestId: string = res.locals.xrequestid || ContextUtils.xRequestId || res.get('X-Request-ID');
    const startTime: any = res.locals.startTime;
    const duration = getDuration(startTime);
    // NoContextLogger.info(() => `[RES] [${xrequestId}] [${res.statusCode} ${res.statusMessage}] for ${req.method} ${req.originalUrl}`);
    // NoContextLogger.debug(() => `[RES] [${xrequestId}] Duration: ${duration}, Response body: ${JSON.stringify(body)}`);
    NoContextLogger.info(() => `[RES] [${res.statusCode} ${res.statusMessage}] for ${req.method} ${req.originalUrl}`);
    NoContextLogger.debug(() => `[RES] Duration: ${duration}, Response body: ${JSON.stringify(body)}`);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const prettify = (value: {}): string => JSON.stringify(value, null, 2);

export class WinstonLogger {
    private static _executePredicate(messageOrPredicate: string | LogPredicate): NonNullable<string> {
        switch (typeof messageOrPredicate) {
            case 'string': return messageOrPredicate;
            case 'function': return messageOrPredicate();
            default: return '';
        }
    }

    constructor(
        private readonly _winston: winston.Logger,
        private readonly _useContext = true
    ) { }

    get levels() {
        return this._winston.levels;
    }

    get level() {
        return this._winston.level;
    }

    set level(level: string) {
        this._winston.level = level;
    }

    // private getXRequestId(): string {
    //     if (this._useContext) {
    //         return ContextUtils.getInstance()?.tryGetXrequestIdFromCtx?.() ?? 'no-x-requestId';
    //     } else {
    //         return 'no-x-requestId';
    //     }
    // }

    private _format(messageOrPredicate: string | LogPredicate): string {
        const message: string = WinstonLogger._executePredicate(messageOrPredicate);
        // const xRequestId: string = this.getXRequestId();
        // const formatted = `[${xRequestId}] ${message}`;
        const formatted = `[MOOV] ${message}`;
        // const noCRLF = validator.blacklist(formatted, '\r\n');
        // return validator.escape(noCRLF);
        return formatted;
    }

    private get _isDebugEnabled(): boolean {
        return this._winston.levels[this._winston.level] >= this._winston.levels.debug
    }

    private get _isInfoEnabled(): boolean {
        return this._winston.levels[this._winston.level] >= this._winston.levels.info;
    }

    private get _isWarnEnabled(): boolean {
        return this._winston.levels[this._winston.level] >= this._winston.levels.warn;
    }

    private get _isErrorEnabled(): boolean {
        return this._winston.levels[this._winston.level] >= this._winston.levels.error;
    }

    debug(messageOrPredicate: string | LogPredicate): void {
        if (this._isDebugEnabled) {
            const formattedMessage = this._format(messageOrPredicate);
            this._winston.debug(formattedMessage);
        }
    }

    info(messageOrPredicate: string | LogPredicate, _?: any): void {
        if (this._isInfoEnabled) {
            const formattedMessage = this._format(messageOrPredicate);
            this._winston.info(formattedMessage);
        }
    }

    warn(messageOrPredicate: string | LogPredicate): void {
        if (this._isWarnEnabled) {
            const formattedMessage = this._format(messageOrPredicate);
            this._winston.warn(formattedMessage);
        }
    }

    error(messageOrPredicate: string | LogPredicate, err?: Error): void {
        if (this._isErrorEnabled) {
            if (err) {
                this._winston.error(`${err.name}: ${err.message}`);
                if (this._isDebugEnabled && err?.stack) {
                    this._winston.debug(err.stack);
                }
            }
            const formattedMessage = this._format(messageOrPredicate);
            this._winston.error(formattedMessage);
        }
    }

    silence(): void {
        this._winston.transports.forEach((t) => t.silent = true);
    }
}

/** @deprecated - unsafe, use XaafLogger or NoContextLogger instead for output sanitation */
export const _logger: winston.Logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.json(),
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss.ssss' }),
        winston.format.printf(({ level, timestamp, message }) => `[${level.toUpperCase()}] [${timestamp}]\t${message}`)
    ),
    level: process.env.WINSTON_LOG_LEVEL || 'info',
    transports: [new winston.transports.Console()]
});

// export const MoovLogger = new WinstonLogger(_logger, true);
export const MoovLogger = new WinstonLogger(_logger, false);
export const NoContextLogger = new WinstonLogger(_logger, false);

/** @deprecated - unsafe, use XaafLogger or NoContextLogger instead for output sanitation */
// export const logger = NoContextLogger;
