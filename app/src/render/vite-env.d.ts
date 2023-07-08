/// <reference types="vite/client" />
declare global {
  interface Window {
    nativeBridge: any;
    electronMessagePort:any;
    headerApi:any;
    loginApi:any;
  }
}

declare module 'ffi-napi'

export {};