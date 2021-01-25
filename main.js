/*
 * @Author: REFUSE_C
 * @Date: 2020-10-20 16:41:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-01-24 12:05:40
 * @Description: 
 */
let appTray;
let mainWindow;
const fs = require('fs');
const path = require('path');
const { app, Tray, Menu, BrowserWindow, globalShortcut, ipcMain } = require('electron');
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

// ipcMain.on('asynchronous-message', function (event, arg) {
//   const data = fs.readdirSync(arg);
//   const id3 = require('node-id3');
//   let localList = [];
//   data.forEach(element => {
//     console.log(element)
//     if (
//       element.indexOf('.wav') === -1 &&
//       element.indexOf('.mp3') === -1 &&
//       element.indexOf('.ogg') === -1 &&
//       element.indexOf('.acc') === -1 &&
//       element.indexOf('.flac') === -1
//     ) return false;
//     let obj = {};
//     const url = arg + element;
//     let tags = id3.read(url);
//     obj.id = '';
//     obj.url = url;
//     obj.type = 'local';
//     obj.ar = [{ id: '', name: tags.artist || '未知歌手' }];
//     obj.al = { id: '', name: tags.album || '未知专辑', picUrl: '' };;
//     obj.name = tags.title || element.replace(/.wav|.mp3|.ogg|.acc|.flac/g, '');
//     localList.push(obj);
//   });
//   event.sender.send('asynchronous-reply', localList);
// });

ipcMain.on('asynchronous-message', function (event, arg) {
  console.log('arg' + arg)
  fileDisplay(event, arg)
})


function fileDisplay(event, filePath) {
  let localList = [];
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        console.log(filename)
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile();//是文件
            var isDir = stats.isDirectory();//是文件夹
            if (isFile) {
              localList.push(filedir);
              console.log('filedir' + filedir);
            }
            if (isDir) {
              fileDisplay(event, filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      });

      event.sender.send('asynchronous-reply', localList);
    }
  });
}