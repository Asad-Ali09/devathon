export type User = {
  name: string;
  email: string;
  password?: string;
  imageUrl?: string | null | File;
  contactNumber: string;
  dob: string;
  address: string;
  gender: string;
};
