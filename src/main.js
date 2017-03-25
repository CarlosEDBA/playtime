'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const ipcMain = electron.ipcMain;

let PLAYTIME_MAIN;

const PLAYTIME_EVENTS = [
	'playPause', 'skipBackward', 'skipForward', 'skipTo', 'singleRepeat', 'playlistRepeat', 'noVideo'
];

function playtimeEvents () {
	PLAYTIME_EVENTS.forEach(function (el, ind, arr) {
		ipcMain.on(el, function (event, arg) {
			event.sender.send(el, arg);
			console.log(el);
		});
	}, this);
}

function createWindow () {
	PLAYTIME_MAIN = new BrowserWindow({width: 600, height: 460});
	PLAYTIME_MAIN.setMenu(null);
	PLAYTIME_MAIN.loadURL('file://' + __dirname + '/index.html');
	//PLAYTIME_MAIN.webContents.openDevTools();
	PLAYTIME_MAIN.on('closed', function() {
		PLAYTIME_MAIN = null;
	});
}

app.on('ready', createWindow);
app.on('ready', playtimeEvents);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (PLAYTIME_MAIN === null) {
		createWindow();
	}
});
