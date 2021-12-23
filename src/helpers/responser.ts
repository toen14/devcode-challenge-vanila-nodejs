import {ServerResponse} from 'http';

import {BaseError} from '../errors-handler/base-error';

export function successRespon<T>(
  data: T,
  res: ServerResponse,
  statusCode = 200
) {
  console.log('res');
  res
    .writeHead(statusCode, {
      'Content-Type': 'application/json',
    })
    .end(
      JSON.stringify({
        status: 'Success',
        message: 'Success',
        data,
      })
    );
}

export function errorRespon<T extends BaseError>(err: T) {
  err.response
    .writeHead(err.errorCode, {
      'Content-Type': 'application/json',
    })
    .end(
      JSON.stringify({
        status: err.errosStatus,
        message: err.errorMessage,
        data: {},
      })
    );
}
