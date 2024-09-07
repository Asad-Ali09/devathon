export type User = {
  userName: string;
  email: string;
  password?: string;
  image: string | null | File;
  contactNumber: string;
  dob: string;
  address: string;
  gender: string;
};

// Doctor-specific fields
export type Doctor = User & {
  experience: string;
  timing: string; // appointment timings
  qualification: string;
  specialization: string;
};
