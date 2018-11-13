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
      console.log('SIGNUP/IN');
      return {
        ...state,
        authenticated: true,
      };
    case AuthActions.LOGOUT:
      console.log('LOGOUT');
      return {
        ...state,
        token: null,
        authenticated: false,
      };
    case AuthActions.SET_TOKEN:
      console.log('SET_TOKEN', action);
      return {
        ...state, // leave the state as it is.
        token: action.payload
      };
    default:
      return state;
  }
}
