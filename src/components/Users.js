// @flow

import * as React from "react";
import { connect } from "react-redux";
import type { RouterHistory } from "react-router";
import type { Dispatch } from "redux";

import type { ReducersStateT } from "../modules";
import * as UsersAction from "../modules/users";
import type { UserT } from "../types";

class Users extends React.Component<
  {
    dispatch: Dispatch<*>,
    history: RouterHistory,
    users: Array<UserT>
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
    const { dispatch } = this.props;
    this.setState({ isLoading: true });
    try {
      dispatch(await UsersAction.loadAll());
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { history, users } = this.props;
    const { isLoading } = this.state;

    return isLoading ? (
      "Now loading..."
    ) : (
      <section>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                className="clickable-row"
                key={user.id}
                onClick={() => history.push(`/users/${user.id}`)}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Note: fetch users list data every time showing this page in spite of
          creating cache in reducers, because of supposing we want fresh data
          always.
        </p>
      </section>
    );
  }
}

export default connect(({ users }: ReducersStateT) => ({ users }))(Users);
