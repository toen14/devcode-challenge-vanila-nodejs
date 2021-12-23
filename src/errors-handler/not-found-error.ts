import {ServerResponse} from 'http';
import {BaseError} from './base-error';

export class NotFoundError extends BaseError {
  public errorMessage: string;

  public errorCode = 404;

  public errosStatus = 'Not Found';

  public response: ServerResponse;

  constructor(errorMessage: string, response: ServerResponse) {
    super();
    this.errorMessage = errorMessage;
    this.response = response;
  }

  public formatMessages(): void {}
}
