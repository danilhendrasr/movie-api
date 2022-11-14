export class DatabaseError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
