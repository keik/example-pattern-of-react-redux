// @flow

export type UserT = {
  id: number,
  name: string
};

export type UserWithDetailsT = UserT & {
  address: string,
  birthDay: string,
  gender: "male" | "female"
};
