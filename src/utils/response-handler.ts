import { Request, Response } from 'express';
import { ErrorObject } from './errors';
import { logHttpResponse, MoovLogger } from './logger';

export function handleSuccessResponse(req: Request, res: Response, responseCode: number, body?: any) {

    // if (ContextUtils.xRequestId) {
    //     res.setHeader('X-Request-ID', ContextUtils.xRequestId);
    // }
    logHttpResponse(req, res, body);
    res.status(responseCode).json(body);
}
export function handleErrorResponse(req: Request, res: Response, responseCode: number, error: ErrorObject) {

    // if (ContextUtils.xRequestId) {
    //     res.setHeader('X-Request-ID', ContextUtils.xRequestId);
    // }
    logHttpResponse(req, res, error);
    sendHttpResponse(res, responseCode, error.errorCode, error.name, error.data, error.message, "-1"); // -1 stands for ContextUtils.xRequestId
}



export function handleErrorResponseWitoutMasking(
    req: Request,
    res: Response,
    responseCode: number,
    error: ErrorObject
) {
    // if (ContextUtils.xRequestId) {
    //     res.setHeader('X-Request-ID', ContextUtils.xRequestId);
    // }

    logHttpResponse(req, res, error);
    res.status(responseCode).json(error);
}

export function sendHttpResponse(
    res: Response,
    statusCode: number,
    errorCode: string,
    name: string,
    data: any,
    message: string,
    xrequestid: string
) {

    httpResponse(res, statusCode, errorCode, data, name, message);
    // getMasking(statusCode, errorCode, data, name, message, xrequestid).then(
    //     (maskingResponse) => {
    //         logger.debug(() => `Masking Response ${JSON.stringify(maskingResponse)}`);
    //         httpResponse(
    //             res,
    //             maskingResponse.statusCode,
    //             maskingResponse.errorCodeMasked,
    //             maskingResponse.data,
    //             maskingResponse.name,
    //             maskingResponse.message
    //         );
    //     },
    //     (maskingResponseError) => {
    //         logger.debug(() => `masking Response Error': ${maskingResponseError}`);
    //         httpResponse(
    //             res,
    //             maskingResponseError.statusCode,
    //             maskingResponseError.errorCodeMasked,
    //             maskingResponseError.data,
    //             maskingResponseError.name,
    //             maskingResponseError.message
    //         );
    //     }
    // );
}
export function httpResponse(
    res: Response,
    statusCode: number,
    errorCode: string,
    data?: any,
    name?: string,
    message?: string
) {
    res.status(statusCode).json({
        errorCode,
        data,
        name,
        message
    });
}
// export async function getMasking(
//     statusCode: number,
//     errorCode: string,
//     data: any,
//     name: string,
//     message: string,
//     xrequestid: string,
//     flagParams?: FlagParams
// ): Promise<MaskingCodeEntry> {
//     const msName = String(process.env.npm_package_name);
//     logger.debug(() =>
//         `${xrequestid}] Status Code: ${statusCode} data: ${data} name: ${name} message: ${message} application : ${msName}`
//     );
//     return MaskingService.getMaskingCode(statusCode, errorCode, data, name, message, xrequestid, msName, flagParams);
// }
