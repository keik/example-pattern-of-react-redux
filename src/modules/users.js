// @flow

/**
 * Users module, containing constants of action type, action creator, and reducers
 * related `user` model, as "Ducks" pattern.
 */

import type { UserT, UserWithDetailsT } from "../types";

// ****************
// Constants of action type
// ****************

export const LOAD_ALL: "USERS/LOAD_ALL" = "USERS/LOAD_ALL";
export const LOAD: "USERS/LOAD" = "USERS/LOAD";
export const UPDATE: "USERS/UPDATE" = "USERS/UPDATE";

// ****************
// Action creators
// ****************

export async function loadAll(): Promise<
  StandardActionT<typeof LOAD_ALL, Array<UserT>>
> {
  try {
    // Simulate remote access
    const data = await new Promise(resolve =>
      setTimeout(
        () =>
          resolve(
            // Get list of simple user object, picked only `id` and `name` properties
            PSEUDO_DATABASE.users.map(user => ({
              id: user.id,
              name: user.name
            }))
          ),
        1000
      )
    );
    return {
      type: LOAD_ALL,
      payload: data
    };
  } catch (e) {
    return {
      type: LOAD_ALL,
      error: true,
      payload: new Error("Fail to retrieve data of users")
    };
  }
}

export async function load(
  userId: number
): Promise<StandardActionT<typeof LOAD, UserWithDetailsT>> {
  try {
    // Simulate remote access
    const data = await new Promise((resolve, reject) =>
      setTimeout(() => {
        const user = PSEUDO_DATABASE.users.find(user => user.id === userId);
        if (user != null) resolve(user);
        else reject();
      }, 1000)
    );
    return {
      type: LOAD,
      payload: data
    };
  } catch (e) {
    return {
      type: LOAD,
      error: true,
      payload: new Error("Fail to retrieve data of user details")
    };
  }
}

export async function update(
  userId: number,
  form: $Shape<UserWithDetailsT>
): Promise<StandardActionT<typeof UPDATE, UserWithDetailsT>> {
  try {
    const data = await new Promise((resolve, reject) =>
      setTimeout(() => {
        const user = PSEUDO_DATABASE.users.find(user => user.id === userId);
        if (user != null) resolve({ ...user, ...form });
        else reject(new Error("User not found"));
      }, 1000)
    );
    return {
      type: UPDATE,
      payload: data
    };
  } catch (e) {
    return {
      type: UPDATE,
      error: true,
      payload: e
    };
  }
}

// ****************
// Reducer
// ****************

type State = Array<UserT | UserWithDetailsT>;
type Action =
  | $UnwrapPromise<$Call<typeof load, *>>
  | $UnwrapPromise<$Call<typeof loadAll>>;

/**
 * Reducer to manage list of `UserT` or `UserWithDetailsT` as state,
 * by observing 2-type action of `LOAD_ALL` and `LOAD`.
 */
export default (state: State = [], action: Action): State => {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case LOAD_ALL: {
      // When receiving action of `LOAD_ALL` type with `Array<UserT>` payload,
      // compose payload with previous state which may have some `UserDetailT`
      // as element of `Array<UserT | UserWithDetailsT>`.
      // See also case clause of `LOAD` type.
      const users = action.payload;
      return users.map(user => state.find(a => a.id === user.id) || user);
    }
    case LOAD: {
      // When receiving actgion of `LOAD` type with `UserWithDetailsT` payload,
      // compose payload with previous state with replacing element of array by mathcing ID.
      // If no element in prev state, add payload to array of prev state simply.
      const userWithDetails = action.payload;
      return state.some(user => user.id === userWithDetails.id)
        ? state.map(
            user => (user.id === userWithDetails.id ? userWithDetails : user)
          )
        : [...state, userWithDetails];
    }
    case UPDATE: {
      const updatedUser = action.payload;
      return state.map(user => (user.id === user.id ? updatedUser : user));
    }
    default:
      return state;
  }
};

const PSEUDO_DATABASE = {
  users: [
    {
      address: "Tokyo, Japan",
      birthDay: "2000-01-01",
      gender: "female",
      id: 1,
      name: "Alice"
    },
    {
      address: "Osaka, Japan",
      birthDay: "2001-04-01",
      gender: "male",
      id: 2,
      name: "Bob"
    },
    {
      address: "Fukuoka, Japan",
      birthDay: "2002-08-01",
      gender: "female",
      id: 3,
      name: "Carol"
    }
  ]
};
