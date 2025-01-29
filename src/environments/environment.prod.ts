// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  remoteApi: 'http://localhost:3000/api',
  googleClientId: '200917649286-j20710538p8rilcnk2qjj53iq1jo77s2.apps.googleusercontent.com',
  facebookCLientId: '903223107679645',
  facebookPermissions: ['email','public_profile'],
  languages: {
    available: ['en'],
    default: 'en'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
