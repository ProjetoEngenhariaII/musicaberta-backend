export type CreateUserDTO = {
  name: string;
  email: string;
  avatarUrl: string;
};

export type UpdateUserDTO = {
  roles: string[];
  instruments: string[];
  bio: string;
};

export type FindUserDTO = {
  email: string;
};
