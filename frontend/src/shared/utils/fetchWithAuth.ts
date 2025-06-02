export default async function fetchWithAuth(
  input: RequestInfo,
  init?: RequestInit,
) {
  const token = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType');

  const headers = {
    ...init?.headers,
    Authorization: token ? `${tokenType} ${token}` : '',
  };

  return fetch(input, {
    ...init,
    headers,
  });
}
