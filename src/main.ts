import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import { ChatCompletion } from '@baiducloud/qianfan'
import 'dotenv/config'
import OpenAI from 'openai'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // const client = new ChatCompletion()
  // const stream = await client.chat(
  //   {
  //     messages: [
  //       {
  //         role: "user",
  //         content: "什么是光合作用",
  //       },
  //     ],
  //     stream: true,
  //   },
  //   "ERNIE-Speed-128K"
  // )
  // for await (const chunk of stream) {
  //   console.log(chunk)
  // }
  // const openai = new OpenAI({
  //   // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
  //   apiKey: process.env['ALI_API_KEY'],
  //   baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  // })

  // const completion = await openai.chat.completions.create({
  //   model: 'qwen-omni-turbo',
  //   messages: [
  //     { role: 'system', content: 'You are a helpful assistant.' },
  //     { role: 'user', content: '你是谁？' },
  //   ],
  //   stream: true,
  // })

  // for await (const chunk of completion) {
  //   if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
  //     console.log(chunk.choices[0].delta)
  //   } else {
  //     console.log(chunk.usage)
  //   }
  // }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
