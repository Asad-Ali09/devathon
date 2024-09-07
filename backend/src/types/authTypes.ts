export interface ManualSignUpRequest {
  name: string;
  email: string;
  password: string;
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
