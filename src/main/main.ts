import { app, BrowserWindow, globalShortcut } from 'electron';
import * as path from 'path';
import * as url from 'url';
import createApiListeners from './create-api-listeners';

let mainWindow: Electron.BrowserWindow | null;

const isDevelopment = process.env.NODE_ENV === 'development';

function createWindow(): void {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      webSecurity: false,
      devTools: isDevelopment,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  if (isDevelopment) {
    globalShortcut.register('f5', function () {
      if (mainWindow && typeof mainWindow.reload === 'function') {
        mainWindow.reload();
      }
    });
  }
  mainWindow.focus();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

createApiListeners();
