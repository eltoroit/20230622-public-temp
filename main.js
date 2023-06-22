// require("dotenv").config();
const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

let settings = {};
(() => {
  let tmp = require("./env.json");
  settings = { ...tmp.shared, ...tmp[process.platform] };
  console.log(settings);
})();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () =>
    JSON.stringify({
      settings,
      process: JSON.parse(JSON.stringify(process)),
    })
  );
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
