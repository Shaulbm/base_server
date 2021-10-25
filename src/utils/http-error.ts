import { ErrorObject } from './errors';

export class HttpError extends Error {
    responseCode: number;
    errorObject: ErrorObject;

    constructor(responseCode: number, errorObject: ErrorObject) {
        super(errorObject.data);
        this.responseCode = responseCode;
        this.errorObject = errorObject;
    }
}
