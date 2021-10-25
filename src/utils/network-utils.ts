import { Request } from 'express';
import config from '../../utils/config'

export class NetworkUtils {

    static getRemoteClientIPAddress(req: Request): string {
        return req.get('X-Forwarded-For') || (req.ip === '::1' ? '127.0.0.1' : req.ip?.replace(/^.*:/, ''));
    }

    static getBackendUrl(): string {
        return `${config.backendProtocol}://${config.backendHost}:${config.backendPort}`;
    }
}
