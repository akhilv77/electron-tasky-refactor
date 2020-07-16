const electron = require("electron");
const path = require("path");
const CustomTray = require("./app/CustomTray");
const MainWindow = require("./app/main_window");

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on("ready", () => {
  mainWindow = new MainWindow(`file://${__dirname}./src/index.html`);

  const iconName =
    process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new CustomTray(iconPath, mainWindow);
});

//tray functionality is moved to other module to reduce the code in index.js(this file)
//we must pass the icon url to the tray to show the image in the window
//because we moved the tray into other file we must also pass the mainWindow with the iconPath.
//blur is used to focus mainWindow when ever the tray is there
//app.dock.hide() is used to hide the electron tab in the navbar.
// mainWindow.loadURL(`file://${__dirname}./src/index.html`);
// we can use directly in this page or we can pass path to main window its our preference
// app.dock.hide() is also done by passing skipTaskbar:true prop to BrowserWindow;
// we must pass backgroundThrottling:false to BrowserWindow as webPreferences if we want to work background applications without any lag
//tray.setTitle("props") is used to ass new tray title in the top bar
