export type CreateSheetDTO = {
  title: string;
  songWriter: string;
  pdfUrl: string;
  mp3Url: string;
  badges: string[];
  userId: string;
};

export type DeleteSheetDTO = {
  id: string;
};
