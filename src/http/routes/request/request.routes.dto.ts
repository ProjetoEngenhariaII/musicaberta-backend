export type CreateRequestDTO = {
  title: string;
  description: string;
  badges: string;
  userId: string;
};

export type GetRequestByUserIdDTO = {
  userId: string;
};

export type GetRequestByIdDTO = {
  requestId: string;
};

export type GetRequestQueryDTO = {
  search: string | undefined;
  sort: "asc" | "desc" | undefined;
  page: number;
};
