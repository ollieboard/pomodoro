var running = false;

window.onload = function(){
		
	document.getElementById("button-start").onclick = function(){
		if (running){
			running = false;
			//clearInterval(window.interval);
		} else {
			running = true;
			startTimer();
		}
	}

	document.getElementById("button-start").onmouseover = function(){
		if (running){
			//var time = document.getElementById("timer-time");
			//time.innerHTML = 'STOP';
		}
	}
	
	document.getElementById("button-start").onmouseout = function(){
		if (running){
			//var time = document.getElementById("timer-time");
			//time.innerHTML = 'START';
		}
	}
		
		
	document.getElementById("break-minus").onclick = function(){
		var time = document.getElementById("breaktime");
		time.innerHTML = parseInt(time.innerHTML)-1;
		if (!running){
			var timer = document.getElementById("timer-break");
			timer.innerHTML = time.innerHTML;
		}
	}
	
	document.getElementById("break-plus").onclick = function(){
		var time = document.getElementById("breaktime");
		time.innerHTML = parseInt(time.innerHTML)+1;
		if (!running){
			var timer = document.getElementById("timer-break");
			timer.innerHTML = time.innerHTML;
		}
	}
	
	document.getElementById("timer-minus").onclick = function(){
		var time = document.getElementById("time");
		time.innerHTML = parseInt(time.innerHTML)-1;
		/*if (!running){
			var timer = document.getElementById("timer-time");
			timer.innerHTML = time.innerHTML;
		}*/
	}
	
	document.getElementById("timer-plus").onclick = function(){
		var time = document.getElementById("time");
		time.innerHTML = parseInt(time.innerHTML)+1;
		/*if (!running){
			var timer = document.getElementById("timer-time");
			timer.innerHTML = time.innerHTML;
		}*/
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
	mask.style.height = Math.floor(120 * (1-(durationSeconds-secondsLeft)/durationSeconds))+"px";
	return secondsLeft;
}

function startTimer(){
	var duration = document.getElementById("time");
	var maskid =  "timer-mask";
	duration = parseInt(duration.innerHTML);
	var clockid = "timer-time";
	var endtime = initializeClock(duration, clockid);
	var interval = setInterval(function(){
		var timeleft = setClock(endtime, duration, clockid, maskid);
		if (timeleft <= 0){
			clearInterval(interval);
			running = false;
			startBreak();
		}
	},1000);
}

function startBreak(){
	var duration = document.getElementById("breaktime");
	var maskid =  "break-mask";
	duration = parseInt(duration.innerHTML);
	var clockid = "timer-break";
	var endtime = initializeClock(duration, clockid);
	var interval = setInterval(function(){
		var timeleft = setClock(endtime, duration, clockid, maskid);
		if (timeleft <= 0){
			clearInterval(interval);
			startTimer();
		}
	},1000);

}