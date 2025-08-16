export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    // Preserve correct prototype chain
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class ApiError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
    // Preserve correct prototype chain
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
