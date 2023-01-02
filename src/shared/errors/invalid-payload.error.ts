export class InvalidPayloadError extends Error {
  constructor() {
    super('Received invalid payload.');
  }
}
