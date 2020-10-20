/*
 * @Author: REFUSE_C
 * @Date: 2020-10-20 16:41:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-10-20 17:58:12
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
const path = require('path')
const url = require('url')
//打开目录地址
// const path1 = 'd:';
// shell.openItem(path1);
Menu.setApplicationMenu(null); //取消菜单栏
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;

function createWindow() {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({
    icon: './src/common/images/icon_task.png',
    width: 1100,
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
  //   pathname: path.join(__dirname, './build/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
  // 加载应用----适用于 react 项目
  // mainWindow.setIcon('./build/static/media/logo.png');
  mainWindow.loadURL('http://localhost:3000/');
  // mainWindow.loadFile('./build/index.html')
  mainWindow.setMinimumSize(1100, 670);
  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});
//快捷键监听全局模式；
app.on('ready', () => {
  globalShortcut.register('Alt+X', () => {
    mainWindow.show(); //alt+x打开软件；
  });
  globalShortcut.register('Alt+Z', () => {
    mainWindow.minimize(); //alt+c最小化软件
  });
  globalShortcut.register('Alt+C', () => {
    app.exit(); //alt+z退出软件，测试期间使用
  });
  globalShortcut.register('Alt+K', () => {
    mainWindow.webContents.openDevTools(); //进入调试模式
  });
  globalShortcut.register('Alt+L', () => {
    mainWindow.webContents.closeDevTools(); //关闭调试模式
  });
  globalShortcut.register('Alt+Q', () => {
    mainWindow.reload(); //刷新页面
  });
  //自定义窗口最小化,最大化,关闭按钮
  ipcMain.on('min', (e) => mainWindow.minimize());
  ipcMain.on('max', (e) => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on('close', (e) => mainWindow.close());
});

