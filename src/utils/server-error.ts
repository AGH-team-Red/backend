class ServerError extends Error {
  public status: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = this.constructor.name;

    console.log('STATUS', status);

    this.status = status || 500;
  }
}

export { ServerError };
