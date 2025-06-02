export interface DecodedAccessToken {
  nickname: string;
  profileImageUrl: string;
  exp: number;
}

export function decodeAccessToken(token: string): DecodedAccessToken | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    );

    const { nickname, profileImageUrl, exp } = JSON.parse(jsonPayload);

    return { nickname, profileImageUrl, exp };
  } catch (e) {
    console.error('JWT 디코딩 실패:', e);
    return null;
  }
}
