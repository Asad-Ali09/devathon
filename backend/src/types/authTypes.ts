import { Gender } from ".";

export interface ManualSignUpRequest {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  dob: Date;
  address: string;
  gender: Gender;
  imageUrl?: string;
}
export interface DoctorSignUpRequest extends ManualSignUpRequest {
  specializations: string[];
  exp: number;
  description: string;
  timeSlots: {
    day: string; // "Monday", "Tuesday", etc.
    startTime: Date; // Time format "HH:mm"
    endTime: Date; // Time format "HH:mm"
  }[];
}

export interface ManualLoginRequest {
  email: string;
  password: string;
}
export interface GoogleSignUpLoginRequest {
  googleAccessToken: string;
}
export interface GoogleAuthResponse {
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
}
export interface TokenType {
  userID: string;
  email: string;
}
