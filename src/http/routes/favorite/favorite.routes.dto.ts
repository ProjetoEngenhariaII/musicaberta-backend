export type CreateFavoriteDTO = {
  userId: string;
  sheetId: string;
};

export type GetFavoriteByUserIdDTO = {
  userId: string;
};
export type DeleteFavoriteDTO = {
  id: string;
};
