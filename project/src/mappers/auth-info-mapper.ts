import { AuthInfo } from '../types/auth-info';

export const mapDataToAuthInfo = (data: {[key: string]: unknown}): AuthInfo | undefined => data && ({
  id: data['id'] as number,
  name: data['name'] as string,
  email: data['email'] as string,
  avatarUrl: data['avatar_url'] as string,
  token: data['token'] as string,
}) as AuthInfo;
