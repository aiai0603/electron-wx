import { BrowserWindow, ipcMain, IpcMainEvent, shell } from "electron";
import { join, resolve } from "path";
// import { callNativeSumByDylib,callNativeSumByRustnode,callNativeSubtractionByRustnode } from "../native";

const openUrlByDefaultBrowser = (e: IpcMainEvent, args: any) => {
  shell.openExternal(args);
};

export const initIpc = (mainWindow: any, workWindow: any) => {
  ipcMain.on("openUrlByDefaultBrowser", openUrlByDefaultBrowser);

  ipcMain.on("communicateWithEachOtherSend", (event, arg) => {
    event.reply("communicateWithEachOtherReply", `I got ${arg},ok`);
  });
  ipcMain.on("communicateWithEachOtherSendSync", (event, arg) => {
    event.returnValue = `I got ${arg},ok`;
  });
  ipcMain.handle("communicateWithEachOtherSendPromise", async (event, arg) => {
    return `I got ${arg},ok`;
  });

  ipcMain.on("renderSendMsgToWork", (event: Event, msg: any) => {
    workWindow && workWindow.webContents.send("msgFormRender", msg);
  });

  ipcMain.handle("callNativeSumByDylib", (event: Event, arg) => {
    // return callNativeSumByDylib(arg.parmasOne,arg.parmasTwo)
  });

  ipcMain.handle("callNativeSumByRustnode", (event: Event, arg) => {
    // return callNativeSumByRustnode(arg.parmasOne,arg.parmasTwo)
  });

  ipcMain.handle("callNativeSubtractionByRustnode", (event: Event, arg) => {
    // return callNativeSubtractionByRustnode(arg.parmasOne,arg.parmasTwo)
  });

  ipcMain.on("window-min", () => mainWindow.minimize());
  ipcMain.on("window-max", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on("window-close", () => {
    mainWindow.destroy();
  });

  let registerWindow: BrowserWindow | null = null;

  ipcMain.on("open-register", () => {

    registerWindow = new BrowserWindow({
      width: 720,
      height: 640,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: join(__dirname, "../preload/index.cjs"),
      },
    });
    registerWindow.setMenu(null);   
    registerWindow.webContents.openDevTools()
    registerWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL+"register?child=0");
  });


  ipcMain.on("close-register", () => {

    registerWindow  && registerWindow.destroy();
  });
};
