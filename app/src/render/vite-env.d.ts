/// <reference types="vite/client" />
declare global {
  interface Window {
    nativeBridge: any;
    electronMessagePort:any;
    headerApi:any;
  }
}

declare module 'ffi-napi'

export {};