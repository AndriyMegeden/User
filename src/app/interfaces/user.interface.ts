export interface User {
  username?: string;
  phoneNumber?: number;
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}
export interface FbCreateResponse {
  name: string;
}