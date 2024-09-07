export type User = {
  userName: string;
  email: string;
  password?: string;
  image: string | null | File;
  googleAccessToken?: string;
};
