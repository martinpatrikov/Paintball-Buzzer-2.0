// Arduino - Node connection
// var socket = io();

// socket.on('data', function(data) {
    
//     console.log(data);
    
//     document.getElementById('sample').style.opacity = data+"%"; 

// });
import { plusMinusResult, plusMinusTime } from './plusMinus.js';
import { getHalf } from './util.js';


document.querySelectorAll('.result-commands').forEach(box => box.addEventListener('click', plusMinusResult));
document.querySelectorAll('.timer-section').forEach(box => box.addEventListener('click', plusMinusTime));

document.querySelectorAll('.timer-buttons').forEach(box => box.addEventListener('click', timerButtonsMiddlwear));
document.querySelectorAll('.timeout').forEach(box => box.addEventListener('click', timeout));

function timeout(ev) {
  const half = ev.target.className.includes('bottom') ? 'bottom' : 'top';
  let minutesInTimer = document.getElementById(`break-${half}-half-minutes`);
  let min = minutesInTimer.textContent || 0;
  min++;
  if (min < 10) {
        min = '0' + min;
  }
  minutesInTimer.innerHTML = min;
}
  
function timerButtonsMiddlwear(ev){
  const id = ev.target.id;
  if(id.includes('start')){
    if(id.includes('break')){
      startBreak(ev);
    }else{
      startTimer(ev);
    }
  }else{
    if(id.includes('break')){
      stopBreakClock(ev);
    }else{
      stopClock(ev);
    }
  }
}

// Variables needed for GameTime
let stoptimeObj = {
  top: true,
  bottom: true
}

// Aux
let stoptimeBreak = true;
let is10 = false;
let is30 = false;
let is60 = false;
let aux60 = document.getElementById('60-seconds');
let aux30 = document.getElementById('30-seconds');
let aux10 = document.getElementById('10-seconds');
const gameFinished = document.getElementById('game-finished');

// Timer Function
function timerCycle(half) {
  let secondsInTimer = document.getElementById(`${half}-half-seconds`);
  let minutesInTimer = document.getElementById(`${half}-half-minutes`);
  let sec = secondsInTimer.textContent || 0;
  let min = minutesInTimer.textContent || 0;
  if (stoptimeObj[half] == false) {
    if(isNaN(min)){
      min = 0;
    }
    sec = parseInt(sec);
    min = parseInt(min);
    if (sec <= 0) {
      sec = 0;
      if (min <= 0) {
        min = 0;
        stoptimeObj[half] = true;
        gameFinished.currentTime = 0;
        gameFinished.play(); 
      } else {
        min--;
        sec = 60;
        stoptimeObj[half] = true;
        secondsInTimer.innerHTML = sec;
        minutesInTimer.innerHTML = min;
        // startTimer(half);
      }
    } else {
      sec--; 
      if (sec <= 0) {
          sec = 0;
        if (min <= 0) {
          stoptimeObj[half] = true;
          gameFinished.currentTime = 0;
          gameFinished.play(); 
        } else {
          if(min < 0){
            min = 0;
          }
          min--;
          sec = 59;
        }
      }

      if (min < 10) {
        min = '0' + min;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }

      secondsInTimer.innerHTML = sec;
      minutesInTimer.innerHTML = min;
      setTimeout(function() {timerCycle(half)} , 1000);
    }
  }
}
// Timer Function Break
function timerCycleBreak(half) {
  let secondsInTimer = document.getElementById(`break-${half}-half-seconds`);
  let minutesInTimer = document.getElementById(`break-${half}-half-minutes`);
  let sec = Number(secondsInTimer.textContent || 0);
  let min = Number(minutesInTimer.textContent || 0);
  if (stoptimeBreak == false) {
    
    function sounds(){
      if(min == 1 && sec == 0 || sec === 60){
        console.log('here');

        if(!is60){
          aux60.currentTime = 0;
          aux60.play();
          is60 = true; 
        }
        
      }else if(min <= 0 && sec == 30){
        console.log('ehere123');

        if(!is60 && !is30){
          aux30.currentTime = 0;
          aux30.play();
          is30 = true;
        }
      }else if(min <= 0 && sec == 10){
        console.log('ehere');
        if(!is60 && !is30 && !is10){
          aux10.currentTime = 0;
          aux10.play();
          is10 = true;  
        }
      }
    }
    sounds();
    sec--;
    sounds();
    if (sec <= 0) {
      sec = 0;
      if (min <= 0) {
          min = 0;
        stoptimeBreak = true;
        is10 = false;
        is30 = false;
        is60 = false;
        startTimer(half);
      } else {
        min--;
        sec = 60;
      }
    }

    if (min < 10) {
      min = '0' + min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }

    secondsInTimer.innerHTML = sec;
    minutesInTimer.innerHTML = min;
    
    setTimeout(function() {timerCycleBreak(half)}, 1000);
  }
}



// Break Timer Button Functions
function startBreak(ev) {
  const half = getHalf(ev);
  if (stoptimeBreak == true) {
    stoptimeBreak = false;
    timerCycleBreak(half);
  }
}

function stopBreakClock(ev) {
  auxPause();
  if (stoptimeBreak == false) {
    stoptimeBreak = true;
  }
}

// Game Timer Button Functions
function startTimer(ev) {
  const half = getHalf(ev);
  if (stoptimeObj[half] == true) {
    stoptimeObj[half] = false;
    timerCycle(half);
  }
}

function stopClock(ev) {
  const half = getHalf(ev);
  if (stoptimeObj[half] == false) {
    stoptimeObj[half] = true;
  }
}
function auxPause(){
  aux10.pause();
  aux60.pause();
  aux30.pause();
  is10 = false;
  is30 = false;
  is60 = false;
}




// var http = require('http');
// var fs = require('fs');
// var index = fs.readFileSync('mainWindow.html');

// var SerialPort = require('serialport');
// const parsers = SerialPort.parsers;

// const parser = new parsers.Readline({
//     delimiter: '\r\n'
// });

// var port = new SerialPort('COM5',{ 
//     baudRate: 9600,
//     dataBits: 8,
//     parity: 'none',
//     stopBits: 1,
//     flowControl: false
// });

// port.pipe(parser);

// var app = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(index);
// });

// var io = require('socket.io').listen(app);

// io.on('connection', function(socket) {
    
//     console.log('Node is listening to port');
    
// });

// parser.on('data', function(data) {
    
//     console.log('Received data from port: ' + data);
    
//     io.emit('data', data);
    
// });

// app.listen(3000);

