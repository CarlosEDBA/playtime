const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const dialog = remote.dialog;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

const PLAYTIME = PLAYTIME || function () {};

PLAYTIME.Viewer = {
	Repeat: 0,
	Volume: 0
};

PLAYTIME.prototype.Config = {
	Cache: {
		Playlist: true,
		Timer: true,
		Repeat: false
	},
	Background: {
		Status: true, // 'active', 'disabled'
		FileName: '',
		FilePath: ''
	},
	Viewer: {
		Width: 800,
		Height: 600	
	},
	DOM: {
		Save: null,
		Cancel: null,
		CheckPlaylist: null,
		CheckTimer: null,
		CheckBackground: null,
		InputFileName: null,
		InputFileBackground: null,
		InputSelect: null,
		InputOption: null
	},
	Window: null,
	init: function () {},
	setWindowButtons: function () {},
	setData: function () {},
	watchData: function () {},
	observe: function () {}
};

PLAYTIME.prototype.Main = {
	DOM: {
		Wrapper: null,
		Videoview: null,
		VideoviewSource: null,
		Overlay: null,
		OverlayFullscreen: null,
		OverlayTimer: null,
		OverlayViewer: null,
		OverlayRepeat: null,
		OverlaySkipBackward: null,
		OverlayPlayPause: null,
		OverlaySkipForward: null,
		OverlayVolume: null,
		OverlayVolumeSlider: null,
		CurrentTime: null,
		Timeleft: null,
		ProgressBar: null,
		ProgressBarOverlay: null,
		Playlist: null,
		PlaylistClear: null,
		PlaylistMinimize: null,
		Items: null,
		Item: null,
		PanelPlayList: null,
		PanelTimer: null,
		PanelViewer: null,
		PanelRepeat: null,
		PanelSkipBackward: null,
		PanelPlayPause: null,
		PanelSkipForward: null,
		PanelVolume: null,
		PanelVolumeSlider: null,
		refreshObject: function (name) {}
	},
	window: null,
	init: function () {},
	mainMenu: function () {},
	addToPlaylist: function (Videos) {},
	clearPlaylist: function () {},
	restorePlaylist: function () {},
	newPlaytimeItem: function (Index, Name, Path) {},
	updatePlaytimeItems: function () {},
	setControls: function () {},
	setConfig: function () {},
	videoview: function () {},
	videoviewCustomLoops: function () {},
	videoviewPlayPause: function () {},
	videoviewSkipBackward: function () {},
	videoviewSkipForward: function () {},
	videoviewSkipTo: function (index) {},
	videoviewSingleRepeat: function () {},
	videoviewPlaylistRepeat: function () {},
	videoviewNoVideo: function () {},
	resetProgress: function () {},
	togglePlaylist: function () {},
	toggleRepeat: function () {},
	togglePlaypause: function (play) {},
	toggleVolume: function () {},
	openTimerWindow: function () {},
	openViewerWindow: function () {},
	storageUpdate: function () {},
	observePlaytime: function () {}
};

PLAYTIME.prototype.Playlist = {
	Status: 'novideo', // 'novideo' 'loadedmetadata' 'play' 'pause' 'ended'
	Cache: false,
	StartIndex: null,
	CurrentIndex: null,
	PreviousIndex: null,
	NextIndex: null,
	Items: [],
	Length: 0,
	Window: null,
	lalala: function () {},
	addItem: function (Videos, callback) {},
	removeItem: function (Index, callback) {},
	clearItems: function (callback) {},
	refreshItems: function (callback) {},
	setIndexes: function () {},
	updateIndexes: function (Index, callback) {},
	observePlaylist: function (callback) {},
	observePlaylistItems: function (callback) {}
};

PLAYTIME.prototype.Timer = {
	DOM: {
		StartTimer : null,
		EndTimer : null,
		Cancel : null,
		Save : null
	},
	TimerStart: '',
	TimerStartSeparator: 0,
	TimerStartHour: 0,
	TimerStartMinutes: 0,
	TimerEnd: '',
	TimerEndSeparator: 0,
	TimerEndHour: 0,
	TimerEndMinutes: 0,
	Now: null,
	TimerStartDate: null,
	TimerEndDate: null,
	Difference: 0,
	SecondsBetweenDates: 0,
	MilisecondsBetweenDates: 0,
	Active: false,
	Window: null,
	setTimer: function () {},
	setWindowButtons: function () {}
};

PLAYTIME.prototype.Utils = {
	devTools: function () {},
	objectObserverSync: function (name, obj) {},
	arrayObserverSync: function (name, arr) {},
	getStorageItem: function (name) {},
	setStorageItem: function (name, value) {}
};

PLAYTIME.prototype.Video = function (Element, Playlist, loadedmetadata, play, pause, ended) {};
PLAYTIME.prototype.Video.prototype = {
	Element: null,
	Duration: 0,
	Progress: 0,
	TotalHours: 0,
	TotalMinutes: 0,
	TotalSeconds: 0,
	Hours: 0,
	Minutes: 0,
	Seconds: 0,
	CurrentTime: 0,
	CurrentTimePrecise: 0,
	CurrentHour: 0,
	CurrentMinute: 0,
	CurrentSecond: 0,
	Timeleft: 0,
	HoursLeft: 0,
	MinutesLeft: 0,
	SecondsLeft: 0,
	Loops: {
		CurrentTime: [null, null],
		Time : [null, null],
		Timeleft : [null, null],
		Progress : [null, null]
	},
	setElement: function (Element) {},
	timeSet: function () {},
	startLoops : function (callback) {},
	stopLoops : function (callback) {},
	registerNewLoop: function (name, loop, rate) {},
	playPause: function (Playlist, callback) {},
	skipBackward: function (Playlist, callback) {},
	skipForward: function (Playlist, callback) {},
	skipTo: function (index, Playlist, callback) {},
	singleRepeat: function (callback) {},
	playlistRepeat: function (Playlist, callback) {},
	noVideo: function (callback) {}
};

PLAYTIME.prototype.Viewer = {
	DOM: {
		Videoview: null,
		VideoviewSource: null,
		Overlay: null,
		Timer: null,
		TimerSeparator: null,
		TimerMinutes: null,
		TimerSeconds: null,
		TimerMilliseconds: null
	},
	events: [],
	init: function () {},
	videoview: function () {},
	startTimer: function () {}
};

module.exports = PLAYTIME;
