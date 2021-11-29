import { ApiResponse } from '../store/api-actions';
import { AuthInfo } from '../types/auth-info';

export const mapDataToAuthInfo = (data: ApiResponse): AuthInfo | undefined => data && ({
  id: data['id'] as number,
  name: data['name'] as string,
  email: data['email'] as string,
  avatarUrl: data['avatar_url'] as string,
  token: data['token'] as string,
}) as AuthInfo;
