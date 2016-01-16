var running = false;
var breakrunning = false;
var stophover = false;
var interval;

window.onload = function(){
		
	document.getElementById("button-start").onclick = function(){
		if (running || breakrunning){
			running = false;
      breakrunning = false;
      window.clearInterval(interval);
			var time = document.getElementById("timer-time");
			time.innerHTML = 'START';
      var mask = document.getElementById("timer-mask");
      mask.style.height = "0%";
      
      var time = document.getElementById("breaktime");
      var timer = document.getElementById("timer-break");
			timer.innerHTML = time.innerHTML;
      
      var mask = document.getElementById("break-mask");
      mask.style.height = "0%";
			//clearInterval(window.interval);
		} else {
			startTimer();
		}
	}

	document.getElementById("button-start").onmouseover = function(){
		if (running || breakrunning){
			var time = document.getElementById("timer-time");
			time.innerHTML = 'STOP';
			stophover = true;
		}
	}
	
	document.getElementById("button-start").onmouseout = function(){
		if (running || breakrunning){
			stophover = false;
		}
	}
		
		
	document.getElementById("break-minus").onclick = function(){
		var time = document.getElementById("breaktime");
		var timeInt = parseInt(time.innerHTML);
		if (timeInt >= 1){
			time.innerHTML = parseInt(timeInt)-1;
		} else {
			time.innerHTML = 60;
		}
		if (!running){
			var timer = document.getElementById("timer-break");
			timer.innerHTML = time.innerHTML;
		}
	}
	
	document.getElementById("break-plus").onclick = function(){
		var time = document.getElementById("breaktime");
		var timeInt = parseInt(time.innerHTML);
		if (timeInt < 60) {
			time.innerHTML = parseInt(timeInt)+1;
		} else {
			time.innerHTML = 0;
		}
		
		if (!running){
			var timer = document.getElementById("timer-break");
			timer.innerHTML = time.innerHTML;
		}
	}
	
	document.getElementById("timer-minus").onclick = function(){
		var time = document.getElementById("time");
		var timeInt = parseInt(time.innerHTML);
		if (timeInt >= 1){
			time.innerHTML = parseInt(timeInt)-1;
		} else {
			time.innerHTML = 60;
		}
		/*if (!running){
			var timer = document.getElementById("timer-time");
			timer.innerHTML = time.innerHTML;
		}*/
	}
	
	document.getElementById("timer-plus").onclick = function(){
		var time = document.getElementById("time");
		var timeInt = parseInt(time.innerHTML);
		if (timeInt < 60) {
			time.innerHTML = parseInt(timeInt)+1;
		} else {
			time.innerHTML = 0;
		}
	}
	
}

function addNumber(str){
	var currentText = document.getElementById("current_text");
	if (currentText.innerHTML === "0"){
		currentText.innerHTML = str;
	} else if (currentText.innerHTML === "-0"){
		currentText.innerHTML = "-" + str;
	} else {
		currentText.innerHTML += str;
	}
}

function startTimer(){
	running = true;
	var duration = document.getElementById("time");
	var maskid =  "timer-mask";
	duration = parseInt(duration.innerHTML);
	var clockid = "timer-time";
	var endtime = initializeClock(duration, clockid);
	interval = window.setInterval(function(){
		if (!stophover){
			var timeleft = setClock(endtime, duration, clockid, maskid);
			if (timeleft <= 0){
				window.clearInterval(interval);
				running = false;
				startBreak();
			}
		}
	},1000);
}

function startBreak(){
  breakrunning = true;
	var duration = document.getElementById("breaktime");
	var maskid =  "break-mask";
	duration = parseInt(duration.innerHTML);
	var clockid = "timer-break";
	var endtime = initializeClock(duration, clockid);
	interval = window.setInterval(function(){
		var timeleft = setClock(endtime, duration, clockid, maskid);
		if (timeleft <= 0){
			window.clearInterval(interval);
      breakrunning = false;
			startTimer();
		}
	},1000);

}

function initializeClock(duration, id){
	var endtime = new Date();
	endtime.setMinutes(endtime.getMinutes()+duration);
	return endtime;
}


function setClock(endtime, duration, id, maskid){
	var timeLeft = Date.parse(endtime) - Date.parse(new Date());
	var secondsLeft= timeLeft/1000;
	var seconds = Math.floor(secondsLeft%60);
	
	var minutes = Math.floor((timeLeft/1000/60)%60);
	minutes = duration - minutes - 1;
	seconds = Math.abs(seconds-60);
	if (seconds === 60){
		seconds = "00";
		minutes++;
	}
	else if (seconds < 10){
		seconds = "0"+seconds;
	}
	
	if (minutes < 0){
		minutes = "00";
	} else if (minutes < 10){
		minutes = "0"+minutes;
	}
	
	var time = document.getElementById(id);
	time.innerHTML = minutes+":"+seconds;
	
	
	//Set circle:
	var mask = document.getElementById(maskid);
	var durationSeconds = duration * 60;
	//get mask height here!!!
	mask.style.height = Math.floor(100 * (1-(durationSeconds-secondsLeft)/durationSeconds))+"%";
	return secondsLeft;
}
