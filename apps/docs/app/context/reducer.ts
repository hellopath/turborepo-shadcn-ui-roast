export interface State {
  session: Session | null;
}

export interface Session {
  id: string;
}

export const initialState: State = {
  session: null,
};

export enum ActionTypes {
  CREATE_SESSION = 'CREATE_SESSION',
}

export interface Action {
  type: ActionTypes;
  session?: Session;
}

const reducer = (state: State, action: Action): State => {
  console.log('reducer', action, state);
  switch (action.type) {
    case ActionTypes.CREATE_SESSION:
      return {
        ...state,
        session: action.session || null,
      };
    default:
      return state;
  }
};

export default reducer;