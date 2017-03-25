var PLAYTIME = window.PLAYTIME;
var Utils = PLAYTIME.prototype.Utils;
var Timer = PLAYTIME.prototype.Timer;

Timer.DOM.TimerStart = document.querySelector('.start-timer');
Timer.DOM.EndTimer = document.querySelector('.end-timer');
Timer.DOM.Cancel = document.querySelector('.btn.cancel');
Timer.DOM.Save = document.querySelector('.btn.save');

Timer.Window = remote.getCurrentWindow();

Timer.setTimer = function () {
	var TimerStart = Utils.getStorageItem('PLAYTIME.Timer.Start');
	var TimerEnd = Utils.getStorageItem('PLAYTIME.Timer.End');

	if (TimerStart) this.DOM.TimerStart.value = TimerStart;
	if (TimerEnd) this.DOM.EndTimer.value = TimerEnd;
};

Timer.setWindowButtons = function () {
	this.DOM.Cancel.addEventListener('click', function (e) {
		this.Window.close();
	}.bind(this));

	this.DOM.Save.addEventListener('click', function (e) {
		Utils.setStorageItem('PLAYTIME.Timer.Start', this.DOM.TimerStart.value);
		Utils.setStorageItem('PLAYTIME.Timer.End', this.DOM.EndTimer.value);
		if (this.DOM.TimerStart.value != '00:00' &&
			this.DOM.EndTimer.value != '00:00') {
			this.Active = true;
			Utils.setStorageItem('PLAYTIME.Timer.Active', true);
		} else {
			this.Active = false;
			Utils.setStorageItem('PLAYTIME.Timer.Active', false);
		}
		this.Window.close();
	}.bind(this));
};

Timer.calculator = function (TimerStart, TimerEnd) {
	this.TimerStart = TimerStart;
	this.TimerStartLength = this.TimerStart.length;
	this.TimerStartSeparator = this.TimerStart.search(':');
	this.TimerStartHour = parseInt(this.TimerStart.substring(0, this.TimerStartSeparator));
	this.TimerStartMinutes = parseInt(this.TimerStart.substring(3, 5));
	this.TimerStartSeconds = this.TimerStartLength === 8 ? parseInt(this.TimerStart.substring(6, this.TimerStartLength)) : 0;

	this.TimerEnd = TimerEnd;
	this.TimerEndLength = this.TimerEnd.length;
	this.TimerEndSeparator = this.TimerEnd.search(':');
	this.TimerEndHour = parseInt(this.TimerEnd.substring(0, this.TimerEndSeparator));
	this.TimerEndMinutes = parseInt(this.TimerEnd.substring(3, 5));
	this.TimerEndSeconds = this.TimerEndLength === 8 ? parseInt(this.TimerEnd.substring(6, this.TimerEndLength)) : 00;

	this.Now = new Date();
	this.TimerStartDate = new Date(this.Now.getUTCFullYear(), this.Now.getUTCMonth(), this.Now.getUTCDate(), this.TimerStartHour, this.TimerStartMinutes, this.TimerStartSeconds);
	this.TimerEndDate = new Date(this.Now.getUTCFullYear(), this.Now.getUTCMonth(), this.Now.getUTCDate(), this.TimerEndHour, this.TimerEndMinutes, this.TimerEndSeconds);
	
	this.Difference = this.Now.getTime() - this.TimerStartDate.getTime();
	this.TotalSeconds = this.Difference / 1000;
	this.SecondsBetweenDates = Math.abs(this.TotalSeconds);
	this.MillisecondsBetweenDates = this.Difference < 0 ? this.SecondsBetweenDates * 1000 : 0;

	return this;
};

Timer.startTimer = function (Overlay, Timer, Separator, Minutes, Seconds, Decsecond) {
	setTimeout(function () {
		Timer.classList.add('playtime-timer-active');

		Separator[0].innerHTML = ':';
		if (Decsecond) Separator[1].innerHTML = ':';

		function getRemainingTime (timer, endtimer) {
			var t = Date.parse(endtimer) - Date.parse(new Date());
			var days = Math.floor( t/(1000*60*60*24) );
			var hours = Math.floor( (t/(1000*60*60)) % 24 );
			var minutes = Math.floor( (t/1000/60) % 60 );
			var seconds = Math.floor( (t/1000) % 60 );
			var decsecond = Math.round(new Date().getMilliseconds() / 100);
			
			return {
				'total': t,
				'days': days,
			  	'hours': hours,
			  	'minutes': minutes,
			  	'seconds': seconds,
			  	'decsecond': decsecond
			};
		}

		function tick () {
		    var timer = getRemainingTime(this.TimerStartDate, this.TimerEndDate);

		    Minutes.innerHTML = ('0' + timer.minutes).slice(-2);
		    Seconds.innerHTML = ('0' + timer.seconds).slice(-2);
		    if (Decsecond) Decsecond.innerHTML = ('0' + timer.decsecond).slice(-2);

		    if (timer.total <= 0) {
		    	clearInterval(loop);
		    	Overlay.classList.add('overlay-active');
		    	Timer.classList.remove('playtime-timer-active');
		    }
		}

		tick.bind(this);

		var loop = setInterval(tick.bind(this), 1);
	}.bind(this), this.MillisecondsBetweenDates);
};