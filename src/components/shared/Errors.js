// @flow

import * as React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";

import * as AppAction from "../../modules/app";

const Errors = ({
  dispatch,
  errors,
  id
}: {
  dispatch: Dispatch<*>,
  errors: Array<*>,
  id: string
}) => (
  <ul id={id}>
    {(id == null ? errors : errors.filter(e => e.locale === id)).map(e => (
      <li key={e.id}>
        <span style={{ color: "red" }}>
          {e.message} (ID: {e.id})
        </span>
        <button onClick={() => dispatch(AppAction.closeError(e.id))}>x</button>
      </li>
    ))}
  </ul>
);

export default connect(({ app }) => ({
  errors: app.errors
}))(Errors);
