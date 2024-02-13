interface Error {
  error: string;
}

type Success<T> = T & {
  error?: never;
};

export type Response<T> = Error | Success<T>;

export const isErrorResponse = (response: Response<any>): response is Error =>
  "error" in response;
