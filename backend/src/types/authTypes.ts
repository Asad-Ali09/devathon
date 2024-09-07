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
  qualification: string;
  timeSlots: {
    day: string; // "Monday", "Tuesday", etc.
    startTime: string; // Time format "HH:mm"
    endTime: string; // Time format "HH:mm"
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
