const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 800
    })
    if (isDev) {
        win.loadURL('http://localhost:3000')
    } else {
        win.loadFile(path.join(__dirname, '../build/index.html'))
    }
}

app.whenReady().then(() => {
    createWindow()
})