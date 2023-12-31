import {
  app,
  BrowserWindow,
  MessageChannelMain,
} from "electron";
import { join, resolve } from "path";
import { initIpc } from "./ipc";

let workWindow: any = null;
let mainWindow: any = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 720,
    minWidth: 720,
    minHeight: 520,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: join(__dirname, "../preload/index.cjs"),
    },
  });

  if (import.meta.env.MODE === "dev") {
    if (import.meta.env.VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
      mainWindow.webContents.openDevTools();
    }
  } else {
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile(resolve(__dirname, "../render/index.html"));
  }

  workWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, "../work/index.cjs"),
    },
  });

  workWindow.hide();

  if (import.meta.env.MODE === "dev") {
    workWindow.webContents.openDevTools();
  }

  workWindow.loadFile(resolve(__dirname, "../work/index.html"));

  const { port1, port2 } = new MessageChannelMain();
  mainWindow.once("ready-to-show", () => {
    mainWindow.webContents.postMessage("port", null, [port1]);
  });

  workWindow.once("ready-to-show", () => {
    workWindow.webContents.postMessage("port", null, [port2]);
  });
};


app.whenReady().then(() => {
  createWindow();
  mainWindow.setMenu(null);   
  initIpc(mainWindow, workWindow);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
