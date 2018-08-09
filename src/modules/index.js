// @flow

import { combineReducers } from "redux";

import app from "./app";
import users from "./users";

const reducers = {
  app,
  users
};

export type ReducersStateT = $ObjMap<typeof reducers, $ExtractFunctionReturn>;
export default combineReducers(reducers);
