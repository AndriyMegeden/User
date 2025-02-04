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

// айді кожного юзера
export interface FbCreateResponse {
  name: string;
}

export interface UserData {
  id?: string;
  name: string;
  surname: string;
  telephone: number;
  email?: string;
  adress: string;
  textarea?: string;
}

export interface LoginOffice {
  login: string;
  password: string;
}

export enum Tariff {
  Platinum = "Platinum",
  Gold = "Gold",
  Premium = "Premium",
}

export enum IpType {
  Static = "Static",
  Dynamic = "Dynamic",
}

export interface SessionInterface {
  isActive: boolean;
  balance: number;
  credit?: number;
  macAdress: number;
  vlan: number;
  port: number;
  tariff: Tariff; 
  ipType: IpType; 
  ipAddress?: string; 
}