var PLAYTIME = window.PLAYTIME;
var Utils = PLAYTIME.prototype.Utils;
var Config = PLAYTIME.prototype.Config;
var Main = PLAYTIME.prototype.Main;
var Playlist = PLAYTIME.prototype.Playlist;
var Video = PLAYTIME.prototype.Video;
var Videoview;
var Windows = {
	Config: null,
	Main: null,
	Timer: null,
	Viewer: null
};

Main.DOM.Wrapper = document.querySelector('.playtime-wrapper');
Main.DOM.Videoview = document.querySelector('.playtime-videoview');
Main.DOM.VideoviewSource = document.querySelector('.playtime-videoview source');
Main.DOM.Overlay = document.querySelector('.playtime-overlay');
Main.DOM.OverlayFullscreen = document.querySelector('.playtime-overlay .fullscreen');
Main.DOM.OverlayPlaylist = document.querySelector('.playtime-overlay .playlist');
Main.DOM.OverlayTimer = document.querySelector('.playtime-overlay .timer');
Main.DOM.OverlayViewer = document.querySelector('.playtime-overlay .viewer');
Main.DOM.OverlayRepeat = document.querySelector('.playtime-overlay .repeat');
Main.DOM.OverlaySkipBackward = document.querySelector('.playtime-overlay .skip.backward');
Main.DOM.OverlayPlayPause = document.querySelector('.playtime-overlay .play-pause');
Main.DOM.OverlaySkipForward = document.querySelector('.playtime-overlay .skip.forward');
Main.DOM.OverlayVolume = document.querySelector('.playtime-overlay .volume');
Main.DOM.OverlayVolumeSlider = document.querySelector('.playtime-overlay .playtime-volume-slider');
Main.DOM.CurrentTime = document.querySelector('.playtime-overlay .current-time');
Main.DOM.Timeleft = document.querySelector('.playtime-overlay .timeleft');
Main.DOM.ProgressBar = document.querySelector('.playtime-overlay .progress-bar');
Main.DOM.ProgressBarOverlay = document.querySelector('.playtime-overlay .progress-bar-overlay');
Main.DOM.Playlist = document.querySelector('.playtime-playlist');
Main.DOM.PlaylistOpenFiles = document.querySelector('.playtime-playlist .open-files');
Main.DOM.PlaylistClear = document.querySelector('.playtime-playlist .clear');
Main.DOM.PlaylistMinimize = document.querySelector('.playtime-playlist .minimize');
Main.DOM.Items = document.querySelector('.playtime-items');
Main.DOM.Item = document.querySelectorAll('.playtime-item');
Main.DOM.PanelPlayList = document.querySelector('.playtime-panel .playlist');
Main.DOM.PanelTimer = document.querySelector('.playtime-panel .timer');
Main.DOM.PanelViewer = document.querySelector('.playtime-panel .viewer');
Main.DOM.PanelRepeat = document.querySelector('.playtime-panel .repeat');
Main.DOM.PanelSkipBackward = document.querySelector('.playtime-panel .skip.backward');
Main.DOM.PanelPlayPause = document.querySelector('.playtime-panel .play-pause');
Main.DOM.PanelSkipForward = document.querySelector('.playtime-panel .skip.forward');
Main.DOM.PanelVolume = document.querySelector('.playtime-panel .volume');
Main.DOM.PanelVolumeSlider = document.querySelector('.playtime-volume-slider');

Main.DOM.refreshObject = function (name) {
	switch (name) {
		case 'Wrapper':
			this[name] = document.querySelector('.playtime-wrapper');
			break;
		case 'Videoview':
			this[name] = document.querySelector('.playtime-videoview');
			break;
		case 'VideoviewSource':
			this[name] = document.querySelector('.playtime-videoview source');
			break;
		case 'Overlay':
			this[name] = document.querySelector('.playtime-overlay');
			break;
		case 'OverlayFullscreen':
			this[name] = document.querySelector('.playtime-overlay .fullscreen');
			break;
		case 'OverlayPlaylist':
			this[name] = document.querySelector('.playtime-overlay .playlist');
			break;
		case 'OverlayTimer':
			this[name] = document.querySelector('.playtime-overlay .timer');
			break;
		case 'OverlayViewer':
			this[name] = document.querySelector('.playtime-overlay .viewer');
			break;
		case 'OverlayRepeat':
			this[name] = document.querySelector('.playtime-overlay .repeat');
			break;
		case 'OverlaySkipBackward':
			this[name] = document.querySelector('.playtime-overlay .skip.backward');
			break;
		case 'OverlayPlayPause':
			this[name] = document.querySelector('.playtime-overlay .play-pause');
			break;
		case 'OverlaySkipForward':
			this[name] = document.querySelector('.playtime-overlay .skip.forward');
			break;
		case 'OverlayVolume':
			this[name] = document.querySelector('.playtime-overlay .volume');
			break;
		case 'OverlayVolumeSlider':
			this[name] = document.querySelector('.playtime-overlay .playtime-volume-slider');
			break;
		case 'CurrentTime':
			this[name] = document.querySelector('.playtime-overlay .current-time');
			break;
		case 'Timeleft':
			this[name] = document.querySelector('.playtime-overlay .timeleft');
			break;
		case 'ProgressBar':
			this[name] = document.querySelector('.playtime-overlay .progress-bar');
			break;
		case 'ProgressBarOverlay':
			this[name] = document.querySelector('.playtime-overlay .progress-bar-overlay');
			break;
		case 'Playlist':
			this[name] = document.querySelector('.playtime-playlist');
			break;
		case 'PlaylistOpenFiles':
			this[name] = document.querySelector('.playtime-playlist .open-files');
			break;
		case 'PlaylistClear':
			this[name] = document.querySelector('.playtime-playlist .clear');
			break;
		case 'PlaylistMinimize':
			this[name] = document.querySelector('.playtime-playlist .minimize');
			break;
		case 'Items':
			this[name] = document.querySelector('.playtime-items');
			break;
		case 'Item':
			this[name] = document.querySelectorAll('.playtime-item');
			break;
		case 'PanelPlayList':
			this[name] = document.querySelector('.playtime-panel .playlist');
			break;
		case 'PanelTimer':
			this[name] = document.querySelector('.playtime-panel .timer');
			break;
		case 'PanelRepeat':
			this[name] = document.querySelector('.playtime-panel .repeat');
			break;
		case 'PanelSkipBackward':
			this[name] = document.querySelector('.playtime-panel .skip.backward');
			break;
		case 'PanelPlayPause':
			this[name] = document.querySelector('.playtime-panel .playpause');
			break;
		case 'PanelSkipForward':
			this[name] = document.querySelector('.playtime-panel .skip.forward');
			break;
		case 'PanelVolume':
			this[name] = document.querySelector('.playtime-panel .volume');
			break;
		case 'PanelVolumeSlider':
			this[name] = document.querySelector('.playtime-volume-slider');
			break;
	}
};

Main.window = remote.getCurrentWindow();

Main.init = function () {
	this.mainMenu();
	this.setControls();
	this.setConfig();
	this.observePlaytime();
	this.videoview();
	this.restorePlaylist();
	this.storageUpdate();

	return this;
};

Main.mainMenu = function () {
	var template = [
		{
			label: 'Arquivo',
			submenu: [
				{
					label: 'Abrir Arquivo',
					accelerator: 'CmdOrCtrl+A',
					role: 'openfile',
					click: function () {
						dialog.showOpenDialog({
							title: 'Escolha um vídeo:',
							filters: [
								{ name: 'Vídeos', extensions: ['mp4', 'webm'] }
							],
							properties: [ 'openFile', 'multiSelections' ]
						}, function (filenames) {
							if (filenames !== undefined) {
								this.addToPlaylist(filenames);
							}
						}.bind(this));
					}.bind(this)
				},
				{
					label: 'Configurações',
					accelerator: 'CmdOrCtrl+C',
					role: 'config',
					click: function () {
						this.openConfigWindow();
					}.bind(this)
				}
				/*{
					label: 'Abrir Pasta',
					accelerator: 'CmdOrCtrl+F',
					role: 'openfolder',
					click: function () {
						dialog.showOpenDialog({
							title: 'Escolha um vídeo:',
							filters: [
								{ name: 'Vídeos', extensions: ['mp4', 'webm'] }
							],
							properties: [ 'openDirectory' ]
						}, function (filenames) {
							if (filenames !== undefined) {
								this.addToPlaylist(filenames);
							}
						}.bind(this));
					}.bind(this)
				}*/
			]
		},
		/*
		{
			label: 'Sobre',
			submenu: [
				{
					label: 'Wow',
					click: function () {
						dialog.showMessageBox({
							type: 'none',
							message: 'Feito com \u2764 por Carlos Eduardo'
						});
					}
				}
			]
		},
		*/
		{
			label: 'Avançado',
			submenu: [
				{
					label: 'Dev Tools',
					accelerator: 'F12',
					click: function () {
						remote.getCurrentWindow().toggleDevTools();
					}
				}
			]
		}
	];

	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	return this;
};

Main.addToPlaylist = function (Videos) {
	Playlist.addItem(Videos, function () {
		var lengthDifference = Playlist.Length - Videos.length + 1;

		Videos.forEach(function (el, ind, arr) {
			var index = lengthDifference++;
			var path = el.replace(/\\/g,"/");
			var name = path.replace(/.*[\\\/]/, '');
			this.newPlaytimeItem(index, name, path);
		}.bind(this));

		if (!this.DOM.PlaylistClear.classList.contains('active')) this.DOM.PlaylistClear.classList.add('active');
	}.bind(this));

	if (Windows.Viewer) Windows.Viewer.webContents.send('updatePlaylist');

	return this;
};

Main.clearPlaylist = function () {
	Playlist.clearItems(function () {
		while (this.DOM.Items.firstChild) {
	    	this.DOM.Items.removeChild(this.DOM.Items.firstChild);
		}
		this.DOM.PlaylistClear.classList.remove('active');
		this.togglePlaylist();
		this.videoviewNoVideo();
	}.bind(this));
	if (Windows.Viewer) Windows.Viewer.webContents.send('default');
	if (Windows.Viewer) Windows.Viewer.webContents.send('clearPlaylist');

	return this;
};

Main.restorePlaylist = function () {
	if (Playlist.Length) {
		var lengthDifference = Playlist.Length - Playlist.Length + 1;
		Playlist.Items.forEach(function (el, ind, arr) {
			var index = lengthDifference++;
			var path = el.replace(/\\/g,"/");
			var name = path.replace(/.*[\\\/]/, '');
			this.newPlaytimeItem(index, name, path);
		}.bind(this));

		if (!this.DOM.PlaylistClear.classList.contains('active')) this.DOM.PlaylistClear.classList.add('active');
	}

	return this;
};

Main.newPlaytimeItem = function (Index, Name, Path) {
	var PlaytimeItem = document.createElement('div');
	PlaytimeItem.setAttribute('class', 'playtime-item');
	PlaytimeItem.dataset.index = Index;
	var ItemIndex = document.createElement('span');
	ItemIndex.setAttribute('class', 'item-index');
	ItemIndex.innerText = Index;
	var ItemIcon = document.createElement('i');
	ItemIcon.setAttribute('class', 'item-icon fa fa-file-video-o');
	var ItemInfo = document.createElement('div');
	ItemInfo.setAttribute('class', 'item-info');
	var ItemName = document.createElement('span');
	ItemName.setAttribute('class', 'item-name');
	ItemName.innerText = Name;
	var ItemPath = document.createElement('item-path');
	ItemPath.setAttribute('class', 'item-path');
	ItemPath.innerText = 'Em: ' + Path;

	this.DOM.Items.appendChild(PlaytimeItem);
	PlaytimeItem.appendChild(ItemIndex);
	PlaytimeItem.appendChild(ItemIcon);
	PlaytimeItem.appendChild(ItemInfo);
	ItemInfo.appendChild(ItemName);
	ItemInfo.appendChild(ItemPath);

	PlaytimeItem.addEventListener('click', function (e) {
		this.videoviewSkipTo(PlaytimeItem.dataset.index - 1);
	}.bind(this));
};

Main.updatePlaytimeItems = function () {
	this.DOM.refreshObject('Item');

	if (this.DOM.Item.length !== 0) {
		[].forEach.call(this.DOM.Item, function (el, ind, arr) {
			el.classList.remove('playtime-item-active');
		}, this);

		if (Playlist.CurrentIndex !== null) {
			this.DOM.Item[Playlist.CurrentIndex].classList.add('playtime-item-active');
		}
	}

	return this;
};

Main.setControls = function () {
	this.DOM.Overlay.addEventListener('mouseover', function (e) {
		this.DOM.Overlay.classList.add('active');
	}.bind(this));

	this.DOM.Overlay.addEventListener('mouseleave', function (e) {
		this.DOM.Overlay.classList.remove('active');
	}.bind(this));

	this.DOM.OverlayFullscreen.addEventListener('click', function (e) {
		this.DOM.Wrapper.classList.toggle('fullscreen');
	}.bind(this));

	this.DOM.OverlayPlaylist.addEventListener('click', function (e) {
		console.log('list');
		this.DOM.Wrapper.classList.toggle('fullscreen');
		this.togglePlaylist();
	}.bind(this));

	this.DOM.OverlayTimer.addEventListener('click', function (e) {
		this.openTimerWindow(this.DOM.PanelTimer);
	}.bind(this));

	this.DOM.OverlayViewer.addEventListener('click', function (e) {
		console.log('viewer');
		this.openViewerWindow(this.DOM.PanelViewer);
	}.bind(this));

	this.DOM.OverlayRepeat.addEventListener('click', function (e) {
		console.log('repeat');
		this.toggleRepeat();
	}.bind(this));

	this.DOM.OverlaySkipBackward.addEventListener('click', function (e) {
		console.log('skipBackward');
		this.videoviewSkipBackward();
	}.bind(this));

	this.DOM.OverlayPlayPause.addEventListener('click', function (e) {
		console.log('Play/Pause');
		this.videoviewPlayPause();
	}.bind(this));

	this.DOM.OverlaySkipForward.addEventListener('click', function (e) {
		console.log('skipForward');
		this.videoviewSkipForward();
	}.bind(this));

	this.DOM.OverlayVolume.addEventListener('click', function (e) {
		console.log('volume');
		this.toggleVolume();
	}.bind(this));

	this.DOM.OverlayVolumeSlider.addEventListener('input', function (e) {
		console.log(this.DOM.OverlayVolumeSlider.value);
		this.DOM.PanelVolumeSlider.value = this.DOM.OverlayVolumeSlider.value;
	}.bind(this));

	this.DOM.ProgressBar.addEventListener('mouseover', function (e) {
		this.DOM.ProgressBarOverlay.style.height = '6px';
	}.bind(this));

	this.DOM.ProgressBar.addEventListener('mouseleave', function (e) {
		this.DOM.ProgressBarOverlay.style.height = '4px';
	}.bind(this));

	this.DOM.PlaylistOpenFiles.addEventListener('click', function (e) {
		dialog.showOpenDialog({
			title: 'Escolha um vídeo:',
			filters: [
				{ name: 'Vídeos', extensions: ['mp4', 'webm'] }
			],
			properties: [ 'openFile', 'multiSelections' ]
		}, function (filenames) {
			if (filenames !== undefined) {
				this.addToPlaylist(filenames);
			}
		}.bind(this));
	}.bind(this));

	this.DOM.PlaylistClear.addEventListener('click', function (e) {
		console.log('clear');
		this.clearPlaylist();
	}.bind(this));

	this.DOM.PanelPlayList.addEventListener('click', function (e) {
		console.log('list');
		this.togglePlaylist();
	}.bind(this));

	this.DOM.PlaylistMinimize.addEventListener('click', function (e) {
		console.log('minimize');
		this.togglePlaylist();
	}.bind(this));

	this.DOM.PanelTimer.addEventListener('click', function (e) {
		this.openTimerWindow(this.DOM.PanelTimer);
	}.bind(this));

	this.DOM.PanelViewer.addEventListener('click', function (e) {
		console.log('viewer');
		this.openViewerWindow(this.DOM.PanelViewer);
	}.bind(this));

	this.DOM.PanelRepeat.addEventListener('click', function (e) {
		console.log('repeat');
		this.toggleRepeat();
	}.bind(this));

	this.DOM.PanelSkipBackward.addEventListener('click', function (e) {
		console.log('skipBackward');
		this.videoviewSkipBackward();
	}.bind(this));

	this.DOM.PanelPlayPause.addEventListener('click', function (e) {
		console.log('Play/Pause');
		this.videoviewPlayPause();
	}.bind(this));

	this.DOM.PanelSkipForward.addEventListener('click', function (e) {
		console.log('skipForward');
		this.videoviewSkipForward();
	}.bind(this));

	this.DOM.PanelVolume.addEventListener('click', function (e) {
		console.log('volume');
		this.toggleVolume();
	}.bind(this));

	this.DOM.PanelVolumeSlider.addEventListener('input', function (e) {
		this.DOM.Videoview.volume = this.DOM.PanelVolumeSlider.value / 100;
	}.bind(this));

	return this;
};

Main.setConfig = function () {
	if (!Utils.getStorageItem('PLAYTIME.Config.Cache.Playlist')) {
		Playlist.clearItems()
	} else {
		Playlist.refreshItems();
	}

	if (!Utils.getStorageItem('PLAYTIME.Config.Cache.Timer')) {
		Utils.setStorageItem('PLAYTIME.Timer.Start', null)
		Utils.setStorageItem('PLAYTIME.Timer.End', null)
	}

	Config.Viewer.Width = Utils.getStorageItem('PLAYTIME.Config.Viewer.Width')
	Config.Viewer.Height = Utils.getStorageItem('PLAYTIME.Config.Viewer.Height')
}

Main.videoview = function () {
	function loadedmetadata () {
		this.DOM.ProgressBar.max = Videoview.TotalSeconds * 100;
	}

	function play () {
		this.togglePlayPause();
	}

	function pause () {
		this.togglePlayPause(1);
	}

	function ended () {}

	Videoview = new Video(
		this.DOM.Videoview,
		Playlist,
		loadedmetadata.bind(this),
		play.bind(this),
		pause.bind(this),
		ended.bind(this)
	);

	this.videoviewCustomLoops();

	return this;
};

Main.videoviewCustomLoops = function () {
	/*Videoview.registerNewLoop('lalala', function () {
		console.log(Videoview.CurrentTime);
	}.bind(this), 1000);*/

	Videoview.registerNewLoop('ProgressBar', function () {
		this.DOM.ProgressBar.value = Videoview.CurrentTime * 100;
		this.DOM.ProgressBarOverlay.style.width = 'calc(' + Videoview.Progress + '% + 2px)';
	}.bind(this), 10);

	Videoview.registerNewLoop('DOMLoop', function () {
		this.DOM.CurrentTime.innerHTML = 
			('0' + Videoview.CurrentHour).slice(-2) +
			':' +
			('0' + Videoview.CurrentMinute).slice(-2) +
			':' +
			('0' + Videoview.CurrentSecond).slice(-2);

		this.DOM.Timeleft.innerHTML = 
			('0' + Videoview.HoursLeft).slice(-2) +
			':' +
			('0' + Videoview.MinutesLeft).slice(-2) +
			':' +
			('0' + Videoview.SecondsLeft).slice(-2);
	}.bind(this), 1000);

	return this;
};

Main.videoviewPlayPause = function () {
	Videoview.playPause(Playlist, function () {
		this.updatePlaytimeItems();
		if (Windows.Viewer) Windows.Viewer.webContents.send('default');
		if (Windows.Viewer) Windows.Viewer.webContents.send('playPause');
	}.bind(this));

	return this;
};

Main.videoviewSkipBackward = function () {
	Videoview.skipBackward(Playlist, function () {
		this.updatePlaytimeItems();
		if (Windows.Viewer) Windows.Viewer.webContents.send('default');
		if (Windows.Viewer) Windows.Viewer.webContents.send('skipBackward');
	}.bind(this));

	return this;
};

Main.videoviewSkipForward = function () {
	Videoview.skipForward(Playlist, function () {
		this.updatePlaytimeItems();
		if (Windows.Viewer) Windows.Viewer.webContents.send('default');
		if (Windows.Viewer) Windows.Viewer.webContents.send('skipForward');
	}.bind(this));

	return this;
};

Main.videoviewSkipTo = function (index) {
	Videoview.skipTo(index, Playlist, function () {
		this.updatePlaytimeItems();
		if (Windows.Viewer) Windows.Viewer.webContents.send('default');
		if (Windows.Viewer) Windows.Viewer.webContents.send('skipTo', index);
	}.bind(this));

	return this;
};

Main.videoviewNoVideo = function () {
	Videoview.noVideo(function () {
		this.resetProgress();
		this.togglePlayPause(1);
		if (Windows.Viewer) Windows.Viewer.webContents.send('default');
		if (Windows.Viewer) Windows.Viewer.webContents.send('noVideo');
	}.bind(this));
};

Main.resetProgress = function () {
	this.DOM.CurrentTime.innerHTML = '00:00:00';
	this.DOM.Timeleft.innerHTML = '00:00:00';
	this.DOM.ProgressBar.value = 0;
	this.DOM.ProgressBarOverlay.style.width = '0px';
};

Main.togglePlaylist = function () {
	this.DOM.Playlist.classList.toggle('playtime-playlist-open');
	this.DOM.PanelPlayList.classList.toggle('active');

	return this;
};

Main.toggleRepeat = function () {
	if (Windows.Viewer) Windows.Viewer.webContents.send('default');
	if (Playlist.Repeat === 2) {
		Playlist.Repeat = 0;
		if (Windows.Viewer) Windows.Viewer.webContents.send('noRepeat');
		this.DOM.PanelRepeat.classList.remove('active');
		this.DOM.PanelRepeat.classList.remove('single');
		this.DOM.OverlayRepeat.classList.remove('single');
		this.DOM.OverlayRepeat.classList.remove('single');
	} else if (Playlist.Repeat) {
		Playlist.Repeat = 2;
		if (Windows.Viewer) Windows.Viewer.webContents.send('playlistRepeat');
		this.DOM.PanelRepeat.classList.remove('single');
		this.DOM.OverlayRepeat.classList.remove('single');
	} else {
		Playlist.Repeat = 1;
		if (Windows.Viewer) Windows.Viewer.webContents.send('singleRepeat');
		this.DOM.PanelRepeat.classList.add('active');
		this.DOM.PanelRepeat.classList.add('single');
		this.DOM.OverlayRepeat.classList.add('single');
		this.DOM.OverlayRepeat.classList.add('single');
	}

	return this;
};

Main.togglePlayPause = function (play) {
	if (play) {
		this.DOM.PanelPlayPause.classList.remove('pause');
		this.DOM.PanelPlayPause.classList.add('play');
		this.DOM.OverlayPlayPause.classList.remove('pause');
		this.DOM.OverlayPlayPause.classList.add('play');
	} else {
		this.DOM.PanelPlayPause.classList.remove('play');
		this.DOM.PanelPlayPause.classList.add('pause');
		this.DOM.OverlayPlayPause.classList.remove('play');
		this.DOM.OverlayPlayPause.classList.add('pause');
	}

	return this;
}

Main.toggleVolume = function () {
	if (this.DOM.Videoview.volume === 0) {
		this.DOM.Videoview.volume = this.DOM.PanelVolumeSlider.value / 100;
	} else {
		this.DOM.Videoview.volume = 0;
	}
	this.DOM.PanelVolume.classList.toggle('muted');

	return this;
};

Main.openConfigWindow = function () {
	if (Windows.Config === null) {

		Windows.Config = new BrowserWindow({
			width: 350,
			height: 375,
			useContentSize: true,
			fullscreen: false,
			autoHideMenuBar: true,
			enableLargerThanScreen: false
		});

		Windows.Config.loadURL('file://' + __dirname + '/configs.html');

		Windows.Config.on('closed', function() {
			Windows.Config = null;
		}.bind(this));
	} else {
		Windows.Config.close();	
	}

	return this;
};

Main.openTimerWindow = function (control) {
	if (Windows.Timer === null) {
		if (control) control.classList.add('active');

		Windows.Timer = new BrowserWindow({
			width: 200,
			height: 200,
			useContentSize: true,
			fullscreen: false,
			autoHideMenuBar: true,
			enableLargerThanScreen: true
		});

		Windows.Timer.loadURL('file://' + __dirname + '/timer.html');

		Windows.Timer.on('closed', function() {
			Windows.Timer = null;
			if (control) control.classList.remove('active');
		}.bind(this));
	} else {
		Windows.Timer.close();	
	}

	return this;
};

Main.openViewerWindow = function (control) {
	if (Windows.Viewer === null) {
		if (control) control.classList.add('active');

		Windows.Viewer = new BrowserWindow({
			width: Config.Viewer.Width,
			height: Config.Viewer.Height,
			useContentSize: true,
			fullscreen: false,
			autoHideMenuBar: true,
			enableLargerThanScreen: true
		});

		Windows.Viewer.loadURL('file://' + __dirname + '/viewer.html');

		Windows.Viewer.on('closed', function() {
			if (control) control.classList.remove('active');
			Windows.Viewer = null;
		});
	} else {
		Windows.Viewer.close();	
	}

	return this;
};

Main.storageUpdate = function () {
	window.addEventListener('storage', function (e) {
		switch (e.key) {
			case 'PLAYTIME.Config.Viewer.Width':
				Config.Viewer.Width = JSON.parse(e.newValue)
				break
			case 'PLAYTIME.Config.Viewer.Height':
				Config.Viewer.Height = JSON.parse(e.newValue)
				break
		}
	}.bind(this))
}

Main.observePlaytime = function () {
	Playlist.observePlaylist();
	Playlist.observePlaylistItems();
};
