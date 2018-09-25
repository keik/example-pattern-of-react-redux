// @flow

import * as React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";

import * as AppAction from "../../modules/app";

const Errors = ({
  dispatch,
  errors
}: {
  dispatch: Dispatch<*>,
  errors: Array<*>
}) => (
  <div>
    <ul>
      {errors.map(e => (
        <li key={e.id}>
          <span style={{ color: "red" }}>
            {e.message} (ID: {e.id})
          </span>
          <button onClick={() => dispatch(AppAction.closeError(e.id))}>
            x
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default connect(({ app }) => ({
  errors: app.errors
}))(Errors);
