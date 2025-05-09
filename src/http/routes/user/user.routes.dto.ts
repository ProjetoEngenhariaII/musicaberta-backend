export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserDTO = {
  roles: string[];
  instruments: string[];
  bio: string;
  name: string;
};

export type FindUserDTO = {
  id: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};
