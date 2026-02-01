"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  // Минимизировать окно
  minimize: () => electron.ipcRenderer.send("window-minimize"),
  // Развернуть / свернуть окно
  maximize: () => electron.ipcRenderer.send("window-maximize"),
  // Закрыть окно
  close: () => electron.ipcRenderer.send("window-close"),
  // Можно добавить дополнительные методы
  // send, on, off, invoke если нужно общение с main
  send: (...args) => electron.ipcRenderer.send(...args),
  on: (...args) => electron.ipcRenderer.on(...args),
  off: (...args) => electron.ipcRenderer.off(...args),
  invoke: (...args) => electron.ipcRenderer.invoke(...args)
});
