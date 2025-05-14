export type CreateSheetDTO = {
  title: string;
  songWriter: string;
  pdfUrl: string;
  mp3Url: string;
  badges: string;
  userId: string;
  requestId?: string | null;
};

export type DeleteSheetDTO = {
  id: string;
  pdfName: string;
  mp3Name: string | undefined;
};

export type GetSheetByUserIdDTO = {
  id: string;
};

export type GetSheetsQueryDTO = {
  search: string | undefined;
  sort: "asc" | "desc" | "mostFavorited" | undefined;
  page: number;
};
