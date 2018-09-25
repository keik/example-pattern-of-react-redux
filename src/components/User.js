// @flow

import * as React from "react";
import { connect } from "react-redux";
import type { Match } from "react-router";
import type { Dispatch } from "redux";

import Errors from "../components/shared/Errors";
import type { ReducersStateT } from "../modules";
import * as UsersAction from "../modules/users";
import type { UserWithDetailsT } from "../types";

type Props = {
  dispatch: Dispatch<*>,
  match: Match,
  user: ?UserWithDetailsT
};
type State = {
  form: $Shape<UserWithDetailsT>,
  isEditing: boolean,
  isLoading: boolean,
  prevProps: ?Props
};

class User extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      form: {},
      isEditing: false,
      isLoading: false,
      prevProps: null
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.prevProps !== nextProps) {
      return {
        form: {
          ...nextProps.user
        },
        prevProps: nextProps
      };
    }
    return null;
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
    const { isEditing, isLoading } = this.state;

    return isLoading || user == null ? (
      "Now loading..."
    ) : (
      <section>
        <h1>Details of {user.name}</h1>
        <div>
          <button onClick={() => this.setState({ isEditing: !isEditing })}>
            {isEditing ? "Cancel edit" : "Edit"}
          </button>
          {isEditing && <button onClick={() => this.submitForm()}>Save</button>}
          {isEditing && (
            <button onClick={() => this.submitForm({ error: true })}>
              Save with error
            </button>
          )}
          <Errors />
        </div>
        <$FormFields parentElement={this} />
        <p>
          Note: result of fetching user details data is cached in reducers, so
          if transition to other page once and back again, same data can be
          redisplayed without fetching again.
        </p>
      </section>
    );
  }

  async submitForm({ error }: { error?: true } = {}) {
    const { dispatch } = this.props;
    const action = await UsersAction.update(
      error ? -1 : this.state.form.id,
      this.state.form
    );
    dispatch(action);
    if (!action.error) this.setState({ isEditing: false });
  }

  updateForm(e: SyntheticInputEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    this.setState(({ form }) => ({
      form: {
        ...form,
        [name]: value
      }
    }));
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

const $FormFields = ({ parentElement }: { parentElement: User }) => {
  const { isEditing } = parentElement.state;
  const user = isEditing ? parentElement.state.form : parentElement.props.user;
  return (
    user && (
      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>
              {isEditing ? (
                <input
                  name="name"
                  onChange={e => parentElement.updateForm(e)}
                  value={user.name}
                />
              ) : (
                user.name
              )}
            </td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>
              {isEditing ? (
                <input
                  name="gender"
                  onChange={e => parentElement.updateForm(e)}
                  value={user.gender}
                />
              ) : (
                user.gender
              )}
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              {isEditing ? (
                <input
                  name="address"
                  onChange={e => parentElement.updateForm(e)}
                  value={user.address}
                />
              ) : (
                user.address
              )}
            </td>
          </tr>
        </tbody>
      </table>
    )
  );
};
