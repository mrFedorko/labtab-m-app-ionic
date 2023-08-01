import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'labtab-m-app',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    allowNavigation: ["http://46.229.213.229"],
  },
  
};

export default config;
