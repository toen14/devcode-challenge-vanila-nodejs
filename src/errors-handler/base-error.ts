import {ServerResponse} from 'http';

export abstract class BaseError extends Error {
  public abstract errorMessage: string;

  public abstract errorCode: number;

  public abstract errosStatus: string;

  public abstract response: ServerResponse;

  public abstract formatMessages(): void;
}
