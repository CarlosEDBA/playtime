var PLAYTIME = window.PLAYTIME;
var Utils = PLAYTIME.prototype.Utils;

PLAYTIME.prototype.Video = function (Element, Playlist, loadedmetadata, play, pause, ended) {
	this.setElements(Element);

	this.VideoElement.addEventListener('loadedmetadata', function (e) {
		this.timeSet();
		//	Playlist.Status = 'loadedmetadata';
		if (loadedmetadata) loadedmetadata();
	}.bind(this));

	this.VideoElement.addEventListener('play', function (e) {
		this.timeSet();
		Playlist.Status = 'play';
		if (play) play();
	}.bind(this));

	this.VideoElement.addEventListener('pause', function (e) {
		Playlist.Status = 'pause';
		if (pause) pause();
	}.bind(this));

	this.VideoElement.addEventListener('ended', function (e) {
		//Playlist.Status = 'ended';
		if (Playlist.Repeat === 2) {
			if (Playlist.CurrentIndex !== null && Playlist.NextIndex === null) {
				this.playlistRepeat(Playlist);
			} else {
				this.skipForward(Playlist);
			}
		} else if (Playlist.Repeat === 1) {
			this.singleRepeat();
		} else {
			if (Playlist.NextIndex !== null) {
				this.skipForward(Playlist);
			} else {
				this.noVideo();
			}
		}
		if (ended) ended();
	}.bind(this));

	this.Loops.CurrentTime[0] = function () {
		function tick () {
			this.CurrentTime = this.VideoElement.currentTime;
			this.CurrentTimePrecise = Math.floor(this.VideoElement.currentTime);

			if (this.CurrentTimePrecise === this.TotalSeconds) {
				clearInterval(this.Loops.CurrentTime[1]);
			}
		}
		tick.bind(this);
		this.Loops.CurrentTime[1] = setInterval(tick.bind(this), 10);

		return this;
	}.bind(this);

	this.Loops.Time[0] = function () {
		function tick () {
			this.CurrentHour = Math.floor(this.CurrentTimePrecise / 3600);
			this.CurrentMinute = Math.floor((this.CurrentTimePrecise / 60) % 60);
			this.CurrentSecond = this.CurrentTimePrecise % 60;

			console.log(this.CurrentHour + ':' + this.CurrentMinute + ':' + this.CurrentSecond);

			if (this.CurrentTimePrecise === this.TotalSeconds) {
				//console.log('paroou');
				clearInterval(this.Loops.Time[1]);
			}
		}
		tick.bind(this);
		this.Loops.Time[1] = setInterval(tick.bind(this), 1000);

		return this;
	}.bind(this);

	this.Loops.Timeleft[0] = function () {
		function tick () {
			this.Timeleft = this.TotalSeconds - this.CurrentTimePrecise;

			this.HoursLeft = Math.floor(this.Timeleft / 3600);
			this.MinutesLeft = Math.floor((this.Timeleft / 60) % 60);
			this.SecondsLeft = this.Timeleft % 60;

			console.log(this.HoursLeft + ':' + this.MinutesLeft + ':' + this.SecondsLeft);

			if (this.Timeleft === 0) {
				clearInterval(this.Loops.Timeleft[1]);
			}
		}

		tick.bind(this);
		this.Loops.Timeleft[1] = setInterval(tick.bind(this), 1000);

		return this;
	}.bind(this);

	this.Loops.Progress[0] = function () {
		function tick () {
			this.Progress = (this.CurrentTime * 100) / this.TotalSeconds;

			if (this.CurrentTimePrecise === this.TotalSeconds) {
				clearInterval(this.Loops.Progress[1]);
			}
		}

		tick.bind(this);
		this.Loops.Progress[1] = setInterval(tick.bind(this), 10);

		return this;
	}.bind(this);

	this.setPoster();
	this.storageUpdate();

	return this;
};

PLAYTIME.prototype.Video.prototype = {
	VideoElement : null,
	VideoSourceElement : null,
	Duration : 0,
	Progress : 0,
	TotalHours : 0,
	TotalMinutes : 0,
	TotalSeconds : 0,
	Hours : 0,
	Minutes : 0,
	Seconds : 0,
	CurrentTime : 0,
	CurrentTimePrecise : 0,
	CurrentHour : 0,
	CurrentMinute : 0,
	CurrentSecond : 0,
	Timeleft : 0,
	HoursLeft : 0,
	MinutesLeft : 0,
	SecondsLeft : 0,
	Loops : {
		CurrentTime: [null, null],
		Time : [null, null],
		Timeleft : [null, null],
		Progress : [null, null]
	},

	setElements : function (Element) {
		this.VideoElement = Element;
		this.VideoSourceElement = Element.querySelector('source');

		return this;
	},

	setPoster: function () {
		if (Utils.getStorageItem('PLAYTIME.Config.Background.Status')) {
			this.VideoElement.poster = Utils.getStorageItem('PLAYTIME.Config.Background.FilePath')
		} else {
			this.VideoElement.poster = ''
		}
	},

	timeSet : function () {
		this.Duration = this.VideoElement.duration;
		this.TotalSeconds = Math.floor(this.Duration);
		this.TotalMinutes = Math.floor(this.TotalSeconds / 60);
		this.TotalHours = Math.floor(this.TotalSeconds / 3600);

		this.Seconds = this.TotalSeconds % 60;
		this.Minutes = this.TotalMinutes % 60;
		this.Hours = this.TotalHours;

		return this;
	},

	startLoops : function (callback) {
		for (var key in this.Loops) {
			this.Loops[key][0]();
		}
		if (callback) callback();

		return this;
	},

	stopLoops : function (callback) {
		for (var key in this.Loops) {
			clearInterval(this.Loops[key][1]);
		}
		if (callback) callback();

		return this;
	},

	registerNewLoop : function (name, loop, rate) {
		this.Loops[name] = [null, null];
		this.Loops[name][0] = function () {
			function tick () {
				loop();

				if (this.CurrentTimePrecise === this.TotalSeconds) {
					clearInterval(this.Loops[name][1]);
				}
			}

			tick.bind(this);
			this.Loops[name][1] = setInterval(tick.bind(this), rate);

			return this;
		}.bind(this);

		return this;
	},

	playPause : function (Playlist, callback) {
		if (Playlist.CurrentIndex !== null) {
			var src = 'file:///' + encodeURI(Playlist.Items[Playlist.CurrentIndex].replace(/\\/g,"/"));

			if (Playlist.Status === 'novideo') {
				console.log('1');
				this.VideoSourceElement.src = src;
				this.VideoElement.load();
				this.VideoElement.play();
				this.startLoops();
			} else if (Playlist.Status === 'play') {
				console.log('2');
				this.VideoElement.pause();
				this.stopLoops();
			} else if (Playlist.Status === 'pause') {
				console.log('3');
				this.VideoElement.play();
				this.startLoops();
			}

			if (callback) callback();
		}

		return this;
	},

	skipBackward : function (Playlist, callback) {
		if (Playlist.PreviousIndex !== null) {
			var src = 'file:///' + encodeURI(Playlist.Items[Playlist.PreviousIndex].replace(/\\/g,"/"));

			this.VideoSourceElement.src = src;
			this.VideoElement.load();
			this.VideoElement.play();
			this.stopLoops();
			this.startLoops();
			Playlist.updateIndexes(Playlist.PreviousIndex);
			if (callback) callback();
		}

		return this;
	},

	skipForward : function (Playlist, callback) {
		if (Playlist.NextIndex !== null) {
			var src = 'file:///' + encodeURI(Playlist.Items[Playlist.NextIndex].replace(/\\/g,"/"));

			this.VideoSourceElement.src = src;
			this.VideoElement.load();
			this.VideoElement.play();
			this.stopLoops();
			this.startLoops();
			Playlist.updateIndexes(Playlist.NextIndex);
			if (callback) callback();
		}

		return this;
	},

	skipTo : function (index, Playlist, callback) {
		if (index < Playlist.Length) {
			var src = 'file:///' + encodeURI(Playlist.Items[index].replace(/\\/g,"/"));

			this.VideoSourceElement.src = src;
			this.VideoElement.load();
			this.VideoElement.play();
			this.stopLoops();
			this.startLoops();

			Playlist.updateIndexes(index);
			if (callback) callback();
		}

		return this;
	},

	singleRepeat : function (callback) {
		this.VideoElement.currentTime = 0;
		this.VideoElement.play();
		this.stopLoops();
		this.startLoops();
		if (callback) callback();

		return this;
	},

	playlistRepeat : function (Playlist, callback) {
		this.VideoSourceElement.src = Playlist.Items[Playlist.StartIndex];
		this.VideoElement.load();
		this.VideoElement.play();
		this.stopLoops();
		this.startLoops();
		Playlist.updateIndexes(Playlist.StartIndex);
		if (callback) callback();

		return this;
	},

	noVideo : function (callback) {
		this.VideoSourceElement.src = '';
		this.VideoElement.load();
		this.stopLoops();
		Playlist.Status = 'novideo';
		if (callback) callback();

		return this;
	},

	storageUpdate: function () {
		window.addEventListener('storage', function (e) {
			switch (e.key) {
				case 'PLAYTIME.Config.Background.Status':
					this.setPoster()
					break
				case 'PLAYTIME.Config.Background.FilePath':
					this.setPoster()
					break
			}
		}.bind(this))
	}

};