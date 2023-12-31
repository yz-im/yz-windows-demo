import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import isDev from 'electron-is-dev';

let mainWindow: Electron.BrowserWindow;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        width: 400,
    });

    mainWindow.loadFile(path.join(__dirname, '../html/index.html'));
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000')
    } else {
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'))
    }

    mainWindow.on('closed', () => {
        // mainWindow = null;
    });
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
