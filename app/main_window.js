const electron = require("electron");
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 200,
      height: 300,
      frame: false,
      resizable: false,
      show: false,
      skipTaskbar: true,
    });
    this.loadURL(url);
    this.on("blur", this.onBlur.bind(this));
  }
  onBlur() {
    this.hide();
  }
}
module.exports = MainWindow;

//instead of passing that options (width,height) we can directly add it in super.
// skipTaskbar is used as app.dock.hide!
