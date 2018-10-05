import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGNIN:
    case AuthActions.SIGNUP:
      return {
        ...state,
        authenticated: true,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false,
      };
    default:
      return state;
  }
}
