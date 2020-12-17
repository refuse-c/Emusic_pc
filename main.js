/*
 * @Author: REFUSE_C
 * @Date: 2020-10-20 16:41:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-17 15:28:47
 * @Description: 
 */
const fs = require('fs');
const {
  app,
  Menu,
  BrowserWindow,
  globalShortcut,
  ipcMain,
} = require('electron');

let mainWindow;
// 取消菜单栏
Menu.setApplicationMenu(null);

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    icon: './src/common/images/icon_task.png',
    width: 1020,
    height: 670,
    useContentSize: true,
    frame: false,
    webPreferences: {
      frame: false,
      resizable: false,
      nodeIntegration: true,
    },
  });
  const { app } = require('electron');
  app.on('window-all-closed', () => {
    app.quit();
  });
  // mainWindow.loadURL(url.format({
  // pathname: path.join(__dirname, './build/index.html'),
  // protocol: 'file:',
  // slashes: true
  // }))
  // 加载应用----适用于 react 项目
  mainWindow.setIcon('./build/static/media/logo.png');
  // mainWindow.loadURL('http://localhost:3000/');
  mainWindow.loadFile('./build/index.html')
  mainWindow.setMinimumSize(1020, 670);
  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// 自定义窗口最小化 关闭按钮
ipcMain.on('min', (e) => mainWindow.minimize());
ipcMain.on('close', (e) => mainWindow.close());

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//快捷键监听全局模式
app.on('ready', () => {
  // 打开软件
  globalShortcut.register('Alt+X', () => {
    mainWindow.show();
  });
  // 最小化软件
  globalShortcut.register('Alt+Z', () => {
    mainWindow.minimize();
  });
  // 退出软件，测试期间使用
  globalShortcut.register('Alt+C', () => {
    app.exit();
  });
  // 进入调试模式
  globalShortcut.register('Alt+K', () => {
    mainWindow.webContents.openDevTools();
  });
  // 关闭调试模式
  globalShortcut.register('Alt+L', () => {
    mainWindow.webContents.closeDevTools();
  });
  // 刷新页面
  globalShortcut.register('Alt+Q', () => {
    mainWindow.reload();
  });
});

