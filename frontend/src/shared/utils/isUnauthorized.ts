export function isUnauthorized(error: unknown): boolean {
  return error instanceof Response && error.status === 401;
}
