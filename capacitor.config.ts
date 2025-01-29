import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: "io.ionic.demo.pg.cap.ng",
  appName: "Photo Gallery Cap Ng",
  bundledWebRuntime: false,
  webDir: "www",
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      clientId: '200917649286-j20710538p8rilcnk2qjj53iq1jo77s2.apps.googleusercontent.com',
      serverClientId: '',
      androidClientId: '',
      iosClientId: '',
      forceCodeForRefreshToken: true
    },
  }
};

export default config;
