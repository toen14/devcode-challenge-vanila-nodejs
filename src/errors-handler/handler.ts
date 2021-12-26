import {BaseError} from './base-error';
import {errorRespon} from '../helpers/responser';

export function handler() {
  process.on('uncaughtException', (err: BaseError | Error) => {
    if (err.message === 'write after end') {
      // skip
    } else if (err.message === '') {
      errorRespon(err as BaseError);
    } else {
      console.log(err);
    }
  });

  process.on('unhandledRejection', (err: BaseError | Error) => {
    if (err.message === 'write after end') {
      // skip
    } else if (err.message === '') {
      errorRespon(err as BaseError);
    } else {
      console.log(err);
    }
  });
}
