import { Token } from '../services/token';

export type AuthInfo = {
  id: number,
  name: string,
  email: string,
  avatarUrl: string,
  token: Token,
}
