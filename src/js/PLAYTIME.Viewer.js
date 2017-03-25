var PLAYTIME = window.PLAYTIME;
var Playlist = PLAYTIME.prototype.Playlist;
var Utils = PLAYTIME.prototype.Utils;
var Config = PLAYTIME.prototype.Config;
var Timer = PLAYTIME.prototype.Timer;
var Video = PLAYTIME.prototype.Video;
var Viewer = PLAYTIME.prototype.Viewer;
var Videoview;

Viewer.DOM.Videoview = document.querySelector('.playtime-videoview');
Viewer.DOM.VideoviewSource = document.querySelector('.playtime-videoview source');
Viewer.DOM.Overlay = document.querySelector('.overlay');
Viewer.DOM.Timer = document.querySelector('.playtime-timer');
Viewer.DOM.TimerSeparator =  document.querySelectorAll('.playtime-timer .playtime-timer-separator');
Viewer.DOM.TimerMinutes = document.querySelector('.playtime-timer .playtime-timer-minutes');
Viewer.DOM.TimerSeconds =  document.querySelector('.playtime-timer .playtime-timer-seconds');
Viewer.DOM.TimerMilliseconds =  document.querySelector('.playtime-timer .playtime-timer-milliseconds');

Viewer.window = remote.getCurrentWindow()

Viewer.events = [
	['default', function (arg) {
		Playlist.refreshItems();
	}.bind(Viewer)],

	['playPause', function (arg) {
		Videoview.playPause(Playlist);
	}.bind(Viewer)],

	['skipBackward', function (arg) {
		Videoview.skipBackward(Playlist);
	}.bind(Viewer)],

	['skipForward', function (arg) {
		Videoview.skipForward(Playlist);
	}.bind(Viewer)],

	['skipTo', function (arg) {
		Videoview.skipTo(arg, Playlist);
	}.bind(Viewer)],

	['noRepeat', function (arg) {
		Playlist.Repeat = 0;
	}.bind(Viewer)],

	['singleRepeat', function (arg) {
		Playlist.Repeat = 1;
	}.bind(Viewer)],

	['playlistRepeat', function (arg) {
		Playlist.Repeat = 2;
	}.bind(Viewer)],

	['updatePlaylist', function (arg) {
		Playlist.refreshItems();
	}.bind(Viewer)],

	['clearPlaylist', function (arg) {
		Playlist.clearItems();
	}.bind(Viewer)],

	['noVideo', function (arg) {
		Videoview.noVideo();
	}.bind(Viewer)]
];

Viewer.init = function () {
	Playlist.refreshItems(function () {
		console.log('lalala');
	});
	this.videoview();
	this.startTimer();
	this.events.forEach(function (el, ind, arr) {
		ipcRenderer.on(el[0], function (event, arg) {
			el[1](arg);
		});
	}, this);

	return this;
};

Viewer.videoview = function () {
	function loadedmetadata () {}

	function play () {}

	function pause () {}

	function ended () {}

	Videoview = new Video(
		this.DOM.Videoview,
		Playlist,
		loadedmetadata.bind(this),
		play.bind(this),
		pause.bind(this),
		ended.bind(this)
	);

	return this;
};

Viewer.startTimer = function () {
	if (Utils.getStorageItem('PLAYTIME.Timer.Active')) {
		var TimerStart = Utils.getStorageItem('PLAYTIME.Timer.Start');
		var TimerEnd = Utils.getStorageItem('PLAYTIME.Timer.End');
		Timer.calculator(TimerStart, TimerEnd);
		Timer.startTimer(
			this.DOM.Overlay,
			this.DOM.Timer,
			this.DOM.TimerSeparator,
			this.DOM.TimerMinutes,
			this.DOM.TimerSeconds
		);
	}

	return this;
};

