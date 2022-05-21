// Arduino - Node connection
// var socket = io();

// socket.on('data', function(data) {
    
//     console.log(data);
    
//     document.getElementById('sample').style.opacity = data+"%"; 

// });



document.querySelectorAll('.result-commands').forEach(box => box.addEventListener('click', plusMinusResult));
document.querySelectorAll('.timer-section').forEach(box => box.addEventListener('click', plusMinusTime));
document.getElementById('start-top-half').addEventListener('click', startTimerTopHalf);
document.getElementById('start-break-top-half').addEventListener('click', startBreakTopHalf);
document.getElementById('stop-break-top-half').addEventListener('click', stopBreakClock);
document.getElementById('stop-top-half').addEventListener('click', stopClock);
  

// Timeout Button
// $('.timeout').click(function () {
//   let minutesInTimer = document.getElementById('first-half-minutes-break');
//   let min = document.getElementById('first-half-minutes-break').textContent || 0;
  
//   min = parseInt(min);
//   min++;
//   if (min < 10) {
//         min = '0' + min;
//   }
//   minutesInTimer.innerHTML = min;
//   auxPause();
// });

// Variables needed for GameTime for the top half
let stoptime = true;

// Timer Function
function timerCycle() {
  let secondsInTimer = document.getElementById('top-half-seconds');
  let minutesInTimer = document.getElementById('top-half-minutes');
  let sec = document.getElementById('top-half-seconds').textContent || 0;
  let min = document.getElementById('top-half-minutes').textContent || 0;
  if (stoptime == false) {
    if(isNaN(min)){
      min = 0;
    }
    sec = parseInt(sec);
    min = parseInt(min);
    if (sec <= 0) {
      sec = 0;
      if (min <= 0) {
        min = 0;
        stoptime = true;
        let aux = document.getElementById('game-finished');
        aux.currentTime = 0;
        aux.play(); 
      } else {
        min--;
        sec = 60;
        stoptime = true;
        secondsInTimer.innerHTML = sec;
        minutesInTimer.innerHTML = min;
        startTimerTopHalf();
      }
    } else {
      sec--; 
      if (sec <= 0) {
          sec = 0;
        if (min <= 0) {
          stoptime = true;
          let aux = document.getElementById('game-finished');
          aux.currentTime = 0;
          aux.play(); 
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
      setTimeout(timerCycle , 1000);
    }
  }
}

// Game Timer Button Functions
function startTimerTopHalf() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}

function stopClock() {
  if (stoptime == false) {
    stoptime = true;
  }
}

// Break Timer
let stoptimeBreak = true;
let is10 = false;
let is30 = false;
let is60 = false;
let aux60 = document.getElementById('60-seconds');
let aux30 = document.getElementById('30-seconds');
let aux10 = document.getElementById('10-seconds');
// Timer Function
function timerCycleBreak() {
  let secondsInTimer = document.getElementById('seconds-break-top-half');
  let minutesInTimer = document.getElementById('minutes-break-top-half');
  let sec = Number(secondsInTimer.textContent || 0);
  let min = Number(minutesInTimer.textContent || 0);
  if (stoptimeBreak == false) {
    // if(isNaN(min)){
    //   min = 0;
    // }
    // if (sec <= 0) {
    //   sec = 0;
    //   if (min <= 0) {
    //     min = 0;
    //     stoptimeBreak = true;
    //   } else {
    //     // stoptimeBreak = true;
    //     min--;
    //     sec = 60;
    //     secondsInTimer.innerHTML = sec;
    //     minutesInTimer.innerHTML = min;
    //     // startBreakTopHalf();
    //   }
    // } else {
      function sounds(){
        if(min == 1 && sec <= 0 || sec === 60){
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
          startTimerTopHalf();
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
    // }
    setTimeout(timerCycleBreak, 1000);
  }
}

// Break Timer Button Functions
function startBreakTopHalf() {
  
  if (stoptimeBreak == true) {
    stoptimeBreak = false;
    timerCycleBreak();
  }
}

function stopBreakClock() {
  auxPause();
  if (stoptimeBreak == false) {
    stoptimeBreak = true;
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


// Game Time Buttons For Adjusting Time
// $('.big-time-button').click(function () {
//   let firstGameTime = document.querySelector('.first-half-minutes');
//   let secondGameTime = document.querySelector('.first-half-seconds');
//   let seconds =  document.getElementById('first-half-seconds').textContent || 0;
//   let minutes = document.getElementById('first-half-minutes').textContent || 0;
//   let firedButtonTeam = $(this).attr('id');
//   let firedButton = $(this).val();
  
//   plusMinus(firedButton, firedButtonTeam, firstGameTime, secondGameTime, minutes, seconds, 1, 10);
// });
// $('.small-time-button').click(function () {
//   let firstGameTime = document.querySelector('.first-half-minutes-break');
//   let secondGameTime = document.querySelector('.first-half-seconds-break');
//   let seconds =
//     document.getElementById('first-half-seconds-break').textContent || 0;
//   let minutes =
//     document.getElementById('first-half-minutes-break').textContent || 0;
//   let firedButtonTeam = $(this).attr('id');
//   let firedButton = $(this).val();
//   auxPause();
//   plusMinus(firedButton, firedButtonTeam, firstGameTime, secondGameTime, minutes, seconds, 1, 10);
// });

function plusMinusResult(ev) {
  const button = ev.target;
  let firedButton = button.value;
  let team = document.querySelector(`.${button.id}-team`);
  let teamCounter = Number(team.textContent || 0);
  
  if (firedButton === '-') {
      if (teamCounter > 0) {
        teamCounter -= 1;
        if (teamCounter < 10 && teamCounter >= 0) {
          team.innerHTML = '0' + teamCounter;
        } else {
          team.innerHTML = teamCounter;
        }
      }    
  } else if (firedButton === '+') {
    teamCounter += 1;
        if (teamCounter < 10 && teamCounter >= 0) {
          team.innerHTML = '0' + teamCounter;
        } else {
          team.innerHTML = teamCounter;
        }
  }
}

function plusMinusTime(ev) {
  const button = ev.target;
  if(!Array.from(button.classList).includes('action')){
    return;
  }
  let firedButton = button.value;
  const className = ev.target.parentNode.className;
  let container = document.querySelector(`#${button.id}-half-${className}`);
  let counter = Number(container.textContent || 0);
  let increment = 1;
  if(className.includes('seconds')){
    increment = 10;
  }
  
  if (firedButton === '-') {
      if (counter >=  increment) {
        counter -= increment;
        if (counter < 10 && counter >= 0) {
          container.innerHTML = '0' + counter;
        } else {
          container.innerHTML = counter;
        }
      }    
  } else if (firedButton === '+') {
    counter += increment;
        if (counter < 10 && counter >= 0) {
          container.innerHTML = '0' + counter;
        } else {
          container.innerHTML = counter;
        }
  }
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

