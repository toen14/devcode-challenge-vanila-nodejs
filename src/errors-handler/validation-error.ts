import {ServerResponse} from 'http';
import {BaseError} from './base-error';

export class ValidationError extends BaseError {
  public errorMessage: string;

  public errorCode = 400;

  public errosStatus = 'Bad Request';

  public response: ServerResponse;

  constructor(errorMessage: string, response: ServerResponse) {
    super();
    this.errorMessage = errorMessage;
    this.response = response;
  }

  public formatMessages(): void {}
}
