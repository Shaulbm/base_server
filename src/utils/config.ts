import * as path from 'path';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    const envFile = path.resolve(__dirname + '/../../../.env');
    dotenv.config({ path: envFile });
}

export default {
    port: process.env.serverPort || 8080,
    backendTimeout: process.env.backendTimeout,
    backendProtocol: process.env.backendProtocol,
    backendHost: process.env.backendHost,
    backendPort: process.env.backendPort
};