// @flow

/**
 * Users module, containing constants of action type, action creator, and reducers
 * related application shareable data like `error`, as "Ducks" pattern.
 */

const CLOSE_ERROR: "APP/CLOSE_ERROR" = "APP/CLOSE_ERROR";

export const closeError = (id: number) => ({
  type: CLOSE_ERROR,
  payload: { id }
});

export type State = {|
  errors: Array<{|
    id: number,
    locale: ?string,
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
    const locale =
      (action.meta != null &&
        typeof action.meta.locale === "string" &&
        action.meta.locale) ||
      null;
    return {
      ...state,
      errors: [
        ...state.errors,
        {
          id: new Date().getTime(),
          locale,
          message: action.payload.message
        }
      ]
    };
    //    }
  }

  switch (action.type) {
    case CLOSE_ERROR: {
      const { id } = action.payload;
      return {
        ...state,
        errors: state.errors.filter(e => e.id !== id)
      };
    }
    default:
      return state;
  }
};
