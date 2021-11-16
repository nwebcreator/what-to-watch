import { userProcess } from './user-process';
import { ActionType } from '../../types/action';
import { AuthorizationStatus } from '../../const';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ authorizationStatus: AuthorizationStatus.Unknown });
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = { authorizationStatus: AuthorizationStatus.NoAuth };
    const requiredAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: { authorizationStatus: AuthorizationStatus.Auth, authInfo: {} },
    };

    expect(userProcess(state, requiredAuthorizationAction))
      .toEqual({ authorizationStatus: AuthorizationStatus.Auth, authInfo: {} });
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = { authorizationStatus: AuthorizationStatus.NoAuth };
    const requiredAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: { authorizationStatus: AuthorizationStatus.NoAuth, authInfo: undefined },
    };

    expect(userProcess(state, requiredAuthorizationAction))
      .toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, authInfo: undefined });
  });
});
