/*
 * @Author: REFUSE_C
 * @Date: 2020-10-20 16:41:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2020-12-29 14:11:14
 * @Description: 
 */
let mainWindow;
const fs = require('fs');
const path = require('path');
const { app, Menu, BrowserWindow, globalShortcut, ipcMain } = require('electron');

// 取消菜单栏
Menu.setApplicationMenu(null);

// 创建浏览器窗口
createWindow = () => {
  mainWindow = new BrowserWindow({
    icon: './icon.ico',
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
  mainWindow.loadFile('./index.html')
  mainWindow.setMinimumSize(1020, 670);
  // 关闭window时触发下列事件.
  mainWindow.on('closed', () => mainWindow = null);
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

ipcMain.on('asynchronous-message', function (event, arg) {
  // arg是从渲染进程返回来的数据
  // var res = fs.readdirSync(arg);
  // event.sender.send('asynchronous-reply', res);
  // console.log(readDir);
  const res = getFiles.getFileList(arg)

  event.sender.send('asynchronous-reply', res);
  // fs.readdirSync(arg, function (err, res) {
  //   console.log(res)
  //   if (err) {
  //     event.sender.send('asynchronous-reply', "读取失败");
  //   } else {
  //     const data = {
  //       path: arg,
  //       data: res
  //     }
  //     event.sender.send('asynchronous-reply', res);
  //   }
  // });
});


function readFileList(path, filesList) {
  var files = fs.readdirSync(path);
  files.forEach(function (item, index) {
    var stat = fs.statSync(path + item);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + item + "/", filesList)
    } else {

      var obj = {};//定义一个对象存放文件的路径和名字
      obj.path = path;//路径
      obj.filename = item//名字
      filesList.push(obj);
    }

  })

}


var getFiles = {
  //获取文件夹下的所有文件
  getFileList: function (path) {
    var filesList = [];
    readFileList(path, filesList);
    console.log(filesList)
    return filesList;
  }
}