import {
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
  ipcRenderer,
  shell,
  webContents,
} from "electron";
import { join, resolve } from "path";
import { useEffect } from "react";
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

  let friendWindow: BrowserWindow | null = null;

  let applicationWindow: BrowserWindow | null = null;

  let agreeWindow: BrowserWindow | null = null;

  ipcMain.on("open-register", () => {
    registerWindow = new BrowserWindow({
      width: 720,
      height: 640,
      resizable: false,
      title: "注册",
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: join(__dirname, "../preload/index.cjs"),
      },
    });
    registerWindow.setMenu(null);
    registerWindow.webContents.openDevTools();
    registerWindow.loadURL(
      import.meta.env.VITE_DEV_SERVER_URL + "register?child=0"
    );
  });

  ipcMain.on("close-register", () => {
    registerWindow && registerWindow.destroy();
  });

  ipcMain.on("open-friend", (e, mid) => {
    friendWindow = new BrowserWindow({
      width: 520,
      height: 480,
      resizable: false,
      title: "添加好友",
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: join(__dirname, "../preload/index.cjs"),
      },
    });
    friendWindow.setMenu(null);
    friendWindow.webContents.openDevTools();
    friendWindow.loadURL(
      import.meta.env.VITE_DEV_SERVER_URL + "addfriend?child=0&mid=" + mid
    );
  });

  ipcMain.on("close-friend", () => {
    friendWindow && friendWindow.destroy();
  });

  ipcMain.on("open-application", (e, data) => {
    applicationWindow = new BrowserWindow({
      width: 380,
      height: 640,
      resizable: false,
      frame: false,
      title: "好友申请",
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: join(__dirname, "../preload/index.cjs"),
      },
    });
    applicationWindow.setMenu(null);
    applicationWindow.webContents.openDevTools();
    applicationWindow.loadURL(
      import.meta.env.VITE_DEV_SERVER_URL +
        "friendApplication?child=0&fid=" +
        data.fid +
        "&mid=" +
        data.mid +
        "&mode=" +
        data.mode
    );
  });

  ipcMain.on("close-application", () => {
    applicationWindow && applicationWindow.destroy();
  });


  ipcMain.on("open-agree", (e, data) => {
    agreeWindow = new BrowserWindow({
      width: 380,
      height: 640,
      resizable: false,
      frame: false,
      title: "好友申请",
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: join(__dirname, "../preload/index.cjs"),
      },
    });
    agreeWindow.setMenu(null);
    agreeWindow.webContents.openDevTools();
    agreeWindow.loadURL(
      import.meta.env.VITE_DEV_SERVER_URL +
        "friendApplication?child=0&fid=" +
        data.fid +
        "&mid=" +
        data.mid +
        "&mode=" +
        data.mode
    );
  });

  ipcMain.on("close-agree", () => {
    mainWindow.webContents.send("modal");
    agreeWindow && agreeWindow.destroy();
  });
};


