import axios, { AxiosInstance } from 'axios';
import http = require('http');
import https = require('https');

export class AxiosProvider {
    private static instance: AxiosInstance | undefined;

    static getInstance(timeout?: number): AxiosInstance {
        if (!AxiosProvider.instance) {
            AxiosProvider.instance = axios.create({
                timeout: Number(timeout),
                httpAgent: new http.Agent({
                    keepAlive: true,
                    maxSockets: 100,
                    maxFreeSockets: 256,
                    timeout: 60000
                }),
                httpsAgent: new https.Agent({
                    keepAlive: true,
                    maxSockets: 100,
                    maxFreeSockets: 256,
                    timeout: 60000
                }),
                maxRedirects: 10,
                maxContentLength: 50 * 1000
            });
        }
        return AxiosProvider.instance;
    }
}
