// @flow

import * as React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";

import * as UsersAction from "../modules/users";
import type { UserT } from "../types";

class Users extends React.Component<
  {
    dispatch: Dispatch<*>,
    history: *,
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
      </section>
    );
  }
}

export default connect(({ users }) => ({ users }))(Users);
