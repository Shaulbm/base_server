
const jwt = require('jsonwebtoken');

export async function verify(token: string, publicKey: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        return jwt.verify(token, publicKey, (err: any, decoded: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

export function generateJwtToken(payload: any, privateKey: string, options: any): StringResponse {
    try {
        return {value: jwt.sign(payload, privateKey, options), error: undefined};
    } catch (error) {
        return {value: undefined, error: `generateJwtToken failed. ERROR=${error}`};
    }
}

export interface TokenOptions {
    issuer: string;
    subject: any;
    expiresIn?: string;
    algorithm: string;
}


export interface StringResponse {
    value?: string;
    error?: string;
    data?: any;
}

