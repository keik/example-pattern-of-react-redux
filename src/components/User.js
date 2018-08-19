// @flow

import * as React from "react";
import { connect } from "react-redux";
import type { Match } from "react-router";
import type { Dispatch } from "redux";

import type { ReducersStateT } from "../modules";
import * as UsersAction from "../modules/users";
import type { UserWithDetailsT } from "../types";

class User extends React.Component<
  {
    dispatch: Dispatch<*>,
    match: Match,
    user: ?UserWithDetailsT
  },
  {
    isLoading: boolean
  }
> {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  async componentDidMount() {
    const {
      dispatch,
      user,
      match: {
        params: { userId }
      }
    } = this.props;

    // Load data of user details if no user or no details info
    if (user == null || user.address == null) {
      this.setState({ isLoading: true });
      try {
        dispatch(await UsersAction.load(Number(userId)));
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { user } = this.props;
    const { isLoading } = this.state;

    return isLoading || user == null ? (
      "Now loading..."
    ) : (
      <section>
        <h1>Details of {user.name}</h1>
        <table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{user.gender}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{user.address}</td>
            </tr>
          </tbody>
        </table>
        <p>
          Note: result of fetching user details data is cached in reducers, so
          if transition to other page once and back again, same data can be
          redisplayed without fetching again.
        </p>
      </section>
    );
  }
}

export default connect(
  (
    { users }: ReducersStateT,
    {
      match: {
        params: { userId }
      }
    }: { match: Match }
  ) => ({
    user: users.find(user => user.id === Number(userId))
  })
)(User);
