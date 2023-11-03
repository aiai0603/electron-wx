/// <reference types="vite/client" />
declare global {
  interface Window {
    nativeBridge: any;
    electronMessagePort:any;
    headerApi:any;
    loginApi:any;
    friendApi:any;
  }
}

declare module 'ffi-napi'

export {};