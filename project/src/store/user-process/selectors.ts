import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/auth-info';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthInfo = (state: State): AuthInfo | undefined => state[NameSpace.User].authInfo;
