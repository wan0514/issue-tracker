export default function mockValidAccessToken() {
  localStorage.setItem('accessToken', 'mock-token');
  localStorage.setItem('tokenType', 'Bearer');
  localStorage.setItem('accessTokenIssuedAt', Date.now().toString());
}
