
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('mainWindow.html');

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('COM5',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});

parser.on('data', function(data) {
    
    console.log('Received data from port: ' + data);
    
    io.emit('data', data);
    
});

app.listen(3000);




// const electron = require('electron');
// const url = require('url');
// const path = require('path');

// const {app, BrowserWindow, Menu} = electron;

// let mainWindow;
// let addWindow;
// let isMac = process.platform == 'darwin';

// // Listen for app to be ready
// app.on('ready', function(){
//     // Create new window
//     mainWindow = new BrowserWindow({
//         width: 1440,
//         height: 1024,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//         }
//     });
//     // Load html into window
//     mainWindow.loadFile('mainWindow.html');
//     // Quit app when closed
//     mainWindow.on('closed', function(){
//         app.quit();
//     })

//     // Build menu from template
//     const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
//     // Insert the menu 
//     Menu.setApplicationMenu(mainMenu)
// });

// // Handle new matchup window
// function createNewMatchupWindow(){
//     // Create new window
//     matchupsWindow = new BrowserWindow({
//         width: 400,
//         height: 300,
//         title: 'New Matchup'
//     });
//     // Load html into window
//     matchupsWindow.loadFile('newMatchupWindow.html')
//     // Garbage collection handle 
//     matchupsWindow.on('closed', function(){
//         matchupsWindow = null;
//     })
// }

// // Create menu template
// const mainMenuTemplate=[
//     {
//         label: 'File',
//         submenu: [
//             {
//                 label: 'New Matchup',
//                 accelerator: isMac ? 'Command+M' : 'Ctrl+M',
//                 click(){
//                     createNewMatchupWindow();
//                 }
//             },
//             {
//                 label: 'Quit',
//                 click(){
//                     app.quit();
//                 }
//             }
//         ]
//     }
// ];

// // If mac, add empty object
// if(isMac){
//     mainMenuTemplate.unshift({});
// }

// // Add dev tools item if not in production 
// if(process.env.NOD_ENV !== 'production'){
//     mainMenuTemplate.push({
//         label: 'Developer Tools',
//         submenu: [
//             {
//                 label: 'Toggle DevTools', 
//                 accelerator: isMac ? 'Command+I' : 'Ctrl+I',
//                 click(item, focusedWindow){
//                     focusedWindow.toggleDevTools();
//                 }
//             },
//             {
//                 role: 'reload'
//             }
//         ]
//     })
// }

// Functionality for resutl buttons 
// let firstTeam = document.querySelector(".first-team");
// let firstTeamCounter = 0;

// $("result-button").click(function() {
//     let firedButton = $(this).val();
//     console.log('working')
//     if(firedButton === '-'){
//         firstTeamCounter--;
//         firstTeam.innerHTML = firstTeamCounter;
//     }else{
//         firstTeamCounter++;
//         firstTeam.innerHTML = firstTeamCounter;
//     }
// });