// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./interface";

export const environment: Environment = {
  production: false,
  apiKey: "AIzaSyBR9yEA3m0HxZW0dkxGvrSaq6vNCpEhYmw",
  fireBaseDBurl: "https://diplom-2ca74-default-rtdb.firebaseio.com",
  firebase: {
    apiKey: "AIzaSyBR9yEA3m0HxZW0dkxGvrSaq6vNCpEhYmw",
    authDomain: "diplom-2ca74.firebaseapp.com",
    databaseURL: "https://diplom-2ca74-default-rtdb.firebaseio.com",
    projectId: "diplom-2ca74",
    storageBucket: "diplom-2ca74.firebasestorage.app",
    messagingSenderId: "512916320545",
    appId: "1:512916320545:web:a89c2a6f9894aa2e104e60",
  },
  languages: {
    available: ["en"],
    default: "en",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
