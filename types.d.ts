import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
