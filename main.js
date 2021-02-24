/*
 * @Author: REFUSE_C
 * @Date: 2020-10-20 16:41:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-02-24 23:28:05
 * @Description: 
 */
let appTray;
let mainWindow;
const fs = require('fs');
const path = require('path');
const { app, Tray, Menu, BrowserWindow, globalShortcut, ipcMain, dialog } = require('electron');
let iconPath = path.join(__dirname, "./src/common/images/icon_task.png");

// 取消菜单栏
Menu.setApplicationMenu(null);

// 创建浏览器窗口
createWindow = () => {
  mainWindow = new BrowserWindow({
    // icon: './src/common/images/icon_task.png',
    icon: iconPath,
    width: 1020,
    height: 670,
    useContentSize: true,
    frame: false,
    webPreferences: {
      frame: false,
      resizable: false,
      contextIsolation: false,
      nodeIntegration: true,
    },
  });
  app.on('window-all-closed', () => {
    app.quit();
  });
  mainWindow.loadURL('http://localhost:3000/');
  // mainWindow.loadFile('./build/index.html')
  mainWindow.setMinimumSize(1020, 670);
  // 关闭window时触发下列事件.
  mainWindow.on('closed', () => mainWindow = null);
  //设置托盘图标的上下文菜单（系统托盘右键菜单）
  var trayMenuTemplate = [
    {
      label: '显示/隐藏',//设置单个菜单项名称
      // icon: __dirname + "",//设置单个菜单项图标
      click() {//设置单个菜单项点击事件
        return mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      } //打开相应页面
    },
    {
      label: '退出',
      click() {
        app.quit();
      }
    }
  ];
  appTray = new Tray(path.join(__dirname, "./src/common/images/icon_task.png"));
  appTray.setToolTip('Emusic');
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);

  //托盘的点击事件
  appTray.on('click', e => { mainWindow.show() });
}






// 自定义窗口最小化 关闭按钮
ipcMain.on('min', (e) => mainWindow.minimize());
ipcMain.on('close', (e) => mainWindow.close());

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', () => {
  // 创建窗口
  createWindow();
  // 快捷键监听全局模式
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
  // 音量+
  globalShortcut.register('Alt+Up', (even) => {
    mainWindow.webContents.send('Up', 'Up')
  });
  // 音量-
  globalShortcut.register('Alt+Down', () => {
    mainWindow.webContents.send('Down', 'Down')
  });
  // 上一曲
  globalShortcut.register('Alt+Left', () => {
    mainWindow.webContents.send('Left', 'Left')
  });
  // 下一曲
  globalShortcut.register('Alt+Right', () => {
    mainWindow.webContents.send('Right', 'Right')
  });
  // 播放/暂停
  globalShortcut.register('Alt+Space', () => {
    mainWindow.webContents.send('Space', 'Space')
  });
});


ipcMain.on('asynchronous-message', function (event, currentPath) {
  // 刷新当前目录
  if (currentPath) {
    getJsonFiles(event, currentPath);
  } else {
    // 选择新目录
    dialog.showOpenDialog(mainWindow, {
      title: '请选择文件夹',
      properties: ['openFile', 'openDirectory', 'createDirectory'],
      filters: [
        { name: 'music', extensions: ['wav', 'mp3', 'ogg', 'acc', 'flac'] }
      ]
    }).then(res => {
      const jsonPath = res.filePaths.join('');
      if (jsonPath) getJsonFiles(event, jsonPath)
    }).catch(err => {
      console.log(err)
    })
  }
})

function getJsonFiles(event, jsonPath) {
  let jsonFiles = [];
  const id3 = require('node-id3');
  const join = require('path').join;
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function (item, index) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isFile() === true) {
        if (
          fPath.indexOf('.wav') === -1 &&
          fPath.indexOf('.mp3') === -1 &&
          fPath.indexOf('.ogg') === -1 &&
          fPath.indexOf('.acc') === -1 &&
          fPath.indexOf('.flac') === -1
        ) return false;
        let obj = {};
        let tags = id3.read(fPath);
        obj.id = '';
        obj.url = fPath;
        obj.type = 'local';
        obj.directory = path;
        obj.ar = [{ id: '', name: tags.artist || '未知歌手' }];
        obj.al = { id: '', name: tags.album || '未知专辑', picUrl: '' };
        obj.name = tags.title || fPath.replace(/.wav|.mp3|.ogg|.acc|.flac/g, '').replace(path, '');
        obj.name = obj.name.replace(/\\/g, '');
        obj.size = stat.size;
        obj.atime = stat.atime;
        jsonFiles.push(obj);
      } else if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
    });
  }
  findJsonFile(jsonPath);
  event.sender.send('asynchronous-reply', jsonFiles, jsonPath);
}




