declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    PUBLIC_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
