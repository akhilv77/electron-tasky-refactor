const electron = require("electron");

const { Tray, app, Menu } = electron;

class CustomTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;

    this.setToolTip("Tray demo");
    this.on("click", this.onClick.bind(this));
    this.on("right-click", this.onRightClick.bind(this));
  }
  onClick(event, bounds) {
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();
    const yPosition = process.platform === "darwin" ? y : y - height;

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.show();
      this.mainWindow.setBounds({
        x: Math.round(x - width / 2),
        y: yPosition,
        height,
        width,
      });
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ]);
    this.popUpContextMenu(menuConfig);
  }
}
module.exports = CustomTray;

//tray is also like menu element it is apper in right side of the navbar.
//setToolTip is the tray functionality like on .so we directle use this.setToolTip("some name")
//bounds is used to get the dimensions
//click event bounds give the x and y values where the event is clicked.
//mainWindow.getBounds() will give the height and width of the window
//mainWindow.setBounds() will set the window positions using x,y,height and width
//x:x-width/2 is because we want the window center to the click event positioning
//setBounds() wont accept float values so we use Math.round to x value .
