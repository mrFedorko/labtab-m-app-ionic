import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'labtab-m-app',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    allowNavigation: ["http://45.132.50.167:8080"],
    hostname: "45.132.50.167:8080",
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    CapacitorCookies: {
      enabled: true
    }
  }
};

export default config;
