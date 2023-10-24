// const { PowerShell } = require('node-powershell');
const exec = require('child_process').exec
const fs = require('fs')

const { OPENAI_API_KEY, CONTROL, DEV, ID, QUESTION_ORDER } = process.env;

const { app, BrowserWindow } = require('electron')

const { ipcMain } = require('electron')

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // webSecurity: false,
      enableRemoteModule:true,
    }
  })

  if (DEV === "true") {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true
      })
  )

  // mainWindow.on('closed', () => {
  //   mainWindow = null
  // })

  mainWindow.on('close', function(e){
    var choice = require('electron').dialog.showMessageBoxSync(this,
        {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'Are you sure you want to quit?'
       });
       if(choice == 1){
         e.preventDefault();
       }
    });

  // mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
  //   (details, callback) => {
  //     callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
  //   },
  // );

  // mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       'Access-Control-Allow-Origin': ['*'],
  //       ...details.responseHeaders,
  //     },
  //   });
  // });
}

app.on('ready', () => {
  // setup logging directories
  setupDirectories();
  // create window
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // create window
  if (mainWindow === null) {
    createWindow()
  }
})

// this path should be changed to something like 'run-program' and 'exec-command' should just run a bash command for things like pip install
ipcMain.on('run-program', (event, arg) => {
  const {
    num,
    language,
    input,
    index,
  } = arg;
  const extensions = {
    python: 'py',
    java: 'java',
    javascript: 'js',
    c: 'c',
  };
  const fileName = `./solutions/Question${num}.${extensions[language]}`;

  fs.writeFile(fileName, input, () => {})
  if (language === 'python') {
    command = `python ${fileName}`;
  } else if (language === 'java') {
    command = `java ${fileName}`;
  } else if (language === 'javascript') {
    command = `node ${fileName}`;
  } else if (language === 'c') {
    let executable = `./solutions/Question${num}`;
    command = `gcc ${fileName} -o ${executable}; ${executable}`;
  } else {
    command = 'echo ';
  }

  const child = exec(command,{shell: '/bin/bash'}, (err, stdout, stderr) =>     {
    if (err) {
      event.reply('program-res', {
        reply: stderr,
        error: true,
        currIndex: index,
      })
    } else {
      event.reply('program-res', {
        reply: stdout,
        error: false,
        currIndex: index,
      })
    }
    
  })
  
})

ipcMain.on('exec-command', (event, arg) => {
  const child = exec(arg,{shell: '/bin/bash'}, (err, stdout, stderr) =>     {
    event.reply('exec-res', stdout)
  })
})

ipcMain.on('req-api-key', (event, arg) => {
  event.reply('api-key-res', OPENAI_API_KEY)
})

ipcMain.on('req-question-order', (event, arg) => {
  const order = QUESTION_ORDER.split(',');
  event.reply('question-order-res', order);
})

ipcMain.on('get-id', (event, arg) => {
  event.reply('id-res', ID)
})

ipcMain.on('get-control', (event, arg) => {
  event.reply('control-res', CONTROL)
})

ipcMain.on('log', (event, arg) => {
  const order = QUESTION_ORDER.split(',');
  const orderMapping = ['1', '2', '3', '4', '5', '6'].reduce(
    (prev, curr, idx) => ({
      ...prev,
      [curr]: order[idx],
    }),
    {},
  );

  let {
    type,
    message, // {query, response} for AI query
    question,
    time,
    option, // copy diretion, query vs requery
  } = arg;
  question = orderMapping[question];

  const dirMappings = {
    QUERY: 'ai_queries',
    RUN: 'program_runs',
    SHELL: 'shell_runs',
    COPY: 'copies',
  };

  let fileName;
  let contents;

  fileName = `./logging/Question${question}/${dirMappings[type]}/${ID}.log`;
  //? do we need to serialize the message?, also ID is not needed but is convenient
  contents = `${ID},${CONTROL},${time},${option},${JSON.stringify(message)}\n`;
  fs.appendFile(fileName, contents, () => {});
})

ipcMain.on('save-question', (event, arg) => {
  const order = QUESTION_ORDER.split(',');
  const orderMapping = ['1', '2', '3', '4', '5', '6'].reduce(
    (prev, curr, idx) => ({
      ...prev,
      [curr]: order[idx],
    }),
    {},
  );
  let {
    num,
    solution,
  } = arg;
  num = orderMapping[num];
  arg.num = num;

  const dirPath = `./logging/Question${num}/solutions/`;
  let fileName;
  let contents;

  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, { recursive: true }, (err) => {});
  }

  fileName = `${dirPath}${ID}.log`;
  contents = `${ID},${CONTROL},${JSON.stringify(arg)}\n`;
  fs.appendFile(fileName, contents, () => {});
})

ipcMain.on('save-survey', (event, arg) => {

  // const {
  //   problemQuestions,
  //   demographicQuestions,
  // } = arg;

  const dirPath = './logging/Survey/';
  let fileName;
  let contents;

  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, { recursive: true }, (err) => {});
  }

  fileName = `${dirPath}${ID}.log`;
  // should we strip out everything except for the answers? right now questions, choices, etc are logged with it
  contents = `${ID},${CONTROL},${JSON.stringify(arg)}\n`;
  fs.appendFile(fileName, contents, () => {});
})

ipcMain.on('save-debrief', (event, arg) => {

  const dirPath = './logging/Debrief/';
  let fileName;
  let contents;

  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, { recursive: true }, (err) => {});
  }

  fileName = `${dirPath}${ID}.log`;
  contents = `${ID},${CONTROL},${JSON.stringify(arg)}\n`;
  fs.appendFile(fileName, contents, () => {});
})

ipcMain.on('save-consent', (event, arg) => {

  const dirPath = './logging/Consent/';
  let fileName;
  let contents;

  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, { recursive: true }, (err) => {});
  }

  fileName = `${dirPath}${ID}.log`;
  contents = `${ID},${CONTROL},${JSON.stringify(arg)}\n`;
  fs.appendFile(fileName, contents, () => {});
})

const createDir = (dir) => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
}
// setup directory structure (called on startup)
const setupDirectories = () => {
  console.log('setting up logging structure')

  // create folder to run user programs
  createDir('./solutions')

  // create logging directory
  createDir('./logging/')

  // create Consent directory
  createDir('./logging/Consent/')

  // create Debrief directory
  createDir('./logging/Debrief/')

  // create Survey directory
  createDir('./logging/Survey/')

  // create Question directories
  for (let i = 1; i <= 6; i++) {
    // Question directory
    createDir(`./logging/Question${i}/`)

    // create ai_queries directory
    createDir(`./logging/Question${i}/ai_queries/`)

    // create copies directory
    createDir(`./logging/Question${i}/copies/`)

    // create program_runs directory
    createDir(`./logging/Question${i}/program_runs/`)

    // create shell_runs directory
    createDir(`./logging/Question${i}/shell_runs/`)

    // create solutions directory
    createDir(`./logging/Question${i}/solutions/`)
  }
}