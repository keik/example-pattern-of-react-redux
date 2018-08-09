// @flow

/**
 * Users module, containing constants of action type, action creator, and reducers
 * related application shareable data like `error`, as "Ducks" pattern.
 */

export type State = {|
  errors: Array<{|
    id: number,
    message: string
  |}>
|};

const initialState = {
  errors: []
};

export default (
  state: State = initialState,
  action: StandardActionT<*, *>
): State => {
  if (action.error) {
    return {
      ...state,
      errors: [
        ...state.errors,
        {
          id: new Date().getTime(),
          message: action.payload.message
        }
      ]
    };
  }
  return state;
};
