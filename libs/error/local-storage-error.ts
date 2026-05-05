export type LocalStorageOperation = "get" | "set" | "remove" | "clear";

export class LocalStorageError extends Error {
  public readonly key: string | null;
  public readonly operation: LocalStorageOperation;
  public readonly cause: unknown;

  constructor(
    operation: LocalStorageOperation,
    key: string | null,
    cause: unknown,
    message?: string,
  ) {
    const defaultMessage = key
      ? `localStorage.${operation} failed for key "${key}"`
      : `localStorage.${operation} failed`;

    super(message || defaultMessage);
    this.name = "LocalStorageError";
    this.key = key;
    this.operation = operation;
    this.cause = cause;
  }
}
