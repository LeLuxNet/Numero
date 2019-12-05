const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win;

electron.Menu.setApplicationMenu(null);

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    icon: "favicon-32x32.png",
    webPreferences: {
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');

  win.on('ready-to-show', () => {
    win.show();
  })

  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
