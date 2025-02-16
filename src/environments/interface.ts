export interface Environment {
  apiKey: string;
  production: boolean;
  fireBaseDBurl: string;
  firebase: {
    apiKey? : string;
    authDomain?: string;
    databaseURL?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId: string;
  }
  languages: {};
}
