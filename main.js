const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    ipcMain.handle('ping', () => 'pong')
    win.loadFile('index.html')

    return win;
}


app.whenReady().then(() => {
    let win = createWindow();

    ipcMain.on("toMain", (e, args) => {
        console.log(args);
        win.webContents.send("fromMain", {data: "hello"})
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})  