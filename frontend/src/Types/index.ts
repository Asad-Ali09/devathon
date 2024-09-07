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

// Doctor-specific fields
export type Doctor = User & {
  experience: string;
  timing: string; // appointment timings
  qualification: string;
  specialization: string;
};
