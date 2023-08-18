import { contextBridge, ipcRenderer } from "electron";

interface callNativeSumParmas {
  parmasOne:number,
  parmasTwo:number
}

contextBridge.exposeInMainWorld("nativeBridge", {
  openUrlByDefaultBrowser: (url: string) =>
    ipcRenderer.send("openUrlByDefaultBrowser", url),
  communicateWithEachOtherSendMsg: (msg: string) =>
    ipcRenderer.send("communicateWithEachOtherSend", msg),
  
  communicateWithEachOtherSendMsgSendSync: (msg: string) =>
  ipcRenderer.sendSync("communicateWithEachOtherSendSync", msg),

  communicateWithEachOtherSendMsgPromise: (msg: string) =>
   ipcRenderer.invoke('communicateWithEachOtherSendPromise',msg),
   
  onUpdateCounterByMain: (callback: any) => {
    ipcRenderer.on("update-counter", (e, value) => {
      callback(e, value);
    });
  },
  renderSendMsgToWork: (msg: any) => {
    ipcRenderer.send("renderSendMsgToWork", msg);
  },
  renderSendMsgToWorkByMessagePort: (msg:any) => {
    window.electronMessagePort && window.electronMessagePort.postMessage(msg)
  },
  callNativeSumByDylib:(arg:callNativeSumParmas) => {
   return ipcRenderer.invoke('callNativeSumByDylib',arg)
  },
  callNativeSumByRustnode:(arg:callNativeSumParmas) => {
    return ipcRenderer.invoke('callNativeSumByRustnode',arg)
  },
  callNativeSubtractionByRustnode:(arg:callNativeSumParmas) => {
    return ipcRenderer.invoke('callNativeSubtractionByRustnode',arg)
  },
  close: () => {
    ipcRenderer.send("window-close");
  }
});

contextBridge.exposeInMainWorld("headerApi", {
  handleClose: () => {
    ipcRenderer.send("window-close");
  },
  handleMin: () => {
    ipcRenderer.send("window-min");
  },
  handleMax: () => {
    ipcRenderer.send("window-max");
  }
});


contextBridge.exposeInMainWorld("loginApi", {
  openRegister: () => {
    ipcRenderer.send("open-register");
  },
  closeRegister: () => {
    ipcRenderer.send("close-register");
  },
});




ipcRenderer.on("communicateWithEachOtherReply", (_event, arg) => {
  alert(arg)
});

ipcRenderer.on('port', e => {
  window.electronMessagePort = e.ports[0]
})

