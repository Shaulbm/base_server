/**
 * http://www.jsonrpc.org/specification#error_object
 */
export interface ErrorObject {
    message: string;
    name: string;
    errorCode: string;
    data: any;
}


export const codes = {
    SESSION_EXPIRED: '401-1',
    UNAUTHORIZED_REFRESH_TOKEN_REQUEST: '401-5',
    PAGE_ERROR: '404-3',
    INVALID_PARAMS: '422',
    AUTHENTICATION_ERROR: '401-9000',
    AUTHORIZATION_ERROR: '403-9000',
    GENERAL_ERROR: '500-9000'
};

function generate(message: string, error: any, code: string, data: any): ErrorObject {
    return {
        message: message || 'Invalid Request',
        name: error || 'InvalidRequest',
        errorCode: code == null ? codes.GENERAL_ERROR : code,
        data
    };
}

function isTokenExpiredError(err: Error) {
    if (typeof err.message === 'string' && err.message.includes('TokenExpiredError')) {
        return true;
    }
    if (typeof err.name === 'string' && err.name.includes('TokenExpiredError')) {
        return true;
    }
    return false;
}

const types = {
    session_expired: (data: any) => {
        return generate('User session has expired', 'Session_Expired', codes.SESSION_EXPIRED, data);
    },

    invalidParams: (data: any) => {
        if (!Array.isArray(data)) {
            data = [data];
        }

        return generate('Invalid parameters', 'InvalidParameters', codes.INVALID_PARAMS, { errors: data });
    },


    generalError: (data: any) => {
        return generate('General Error', 'GeneralError', codes.GENERAL_ERROR, data);
    },

    authenticationError: (data: any) => {
        return generate('Authentication Error', 'AuthenticationError', codes.AUTHENTICATION_ERROR, data);
    },

    authorizationError: (data: any) => {
        return generate('Authorization Error', 'AuthorizationError', codes.AUTHORIZATION_ERROR, data);
    },

    slackError: (data: any) => {
        return generate('Slack Error', 'SlackError', codes.GENERAL_ERROR, data);
    },

    readinessError: (data: any) => {
        return generate('error with readiness endpoint', 'readinessError', codes.GENERAL_ERROR, data);
    },

    healthzError: (data: any) => {
        return generate('error with healthz endpoint', 'healthzError', codes.GENERAL_ERROR, data);
    },
    unauthorizedRefreshTokenError: (data: any) => {
        return generate(
            'unauthorizedRefreshTokenError!',
            'unauthorizedRefreshTokenError',
            codes.UNAUTHORIZED_REFRESH_TOKEN_REQUEST,
            data
        );
    },

    getPageError: (data: any) => {
        return generate('getPageError!', 'getPageError', codes.PAGE_ERROR, data);
    },

};

export const errors = {
    codes,
    types,
    generate,

    parse: (error: any) => {
        switch (error.name) {
            case 'SequelizeValidationError':
            case 'SequelizeUniqueConstraintError':
                return types.invalidParams(
                    error.errors.map((invalidError: any) => {
                        return { message: invalidError.message, path: invalidError.path };
                    })
                );
            default:
                return error;
        }
    },

    fromJwtError: (err: Error) => {
        // https://github.com/auth0/node-jsonwebtoken#errors--codes

        /*if (!isErrorObject(err)) { // not part of hot fix
            return types.generalError('expected to recieve typeof error object to determine JWT error type. Instead got unknown error type.');
        }*/
        const validErrorMessage = !err || (!err.message && !err.name);
        if (validErrorMessage) {
            return types.generalError('error object is undefined');
        }

        if (isTokenExpiredError(err)) {
            return types.session_expired('Session expired');
        } else {
            return types.authenticationError('Authentication Error');
        }
    }
};
