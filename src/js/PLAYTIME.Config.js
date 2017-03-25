var PLAYTIME = window.PLAYTIME
var Utils = PLAYTIME.prototype.Utils
var Config = PLAYTIME.prototype.Config

Config.Cache.Playlist = true
Config.Cache.Timer = true
Config.Cache.Repeat = false

Config.Background.Status = false
Config.Background.FileName = ''
Config.Background.FilePath = ''

Config.Viewer.Width = 800
Config.Viewer.Height = 600

Config.DOM.Cancel = document.querySelector('.cancel')
Config.DOM.Save = document.querySelector('.save')
Config.DOM.CheckPlaylist = document.querySelector('.check-playlist')
Config.DOM.CheckTimer = document.querySelector('.check-timer')
Config.DOM.CheckBackground = document.querySelector('.check-background')
Config.DOM.InputFileName = document.querySelector('.input-file .name')
Config.DOM.InputFileBackground = document.querySelector('.input-background')
Config.DOM.InputSelect = document.querySelector('.input-select select')
Config.DOM.InputOption = document.querySelectorAll('.input-select option')

Config.Window = remote.getCurrentWindow()

Config.init = function () {
	this.observe()
	this.setWindowButtons()
	this.setData()
	this.watchData()

	return this
}

Config.setWindowButtons = function () {
	this.DOM.Cancel.addEventListener('click', function (e) {
		this.Window.close()
	}.bind(this))

	this.DOM.Save.addEventListener('click', function (e) {
		this.Cache.Playlist = this.DOM.CheckPlaylist.checked
		Utils.setStorageItem('PLAYTIME.Config.Cache.Playlist', this.DOM.CheckPlaylist.checked)

		this.Cache.Timer = this.DOM.CheckTimer.checked
		Utils.setStorageItem('PLAYTIME.Config.Cache.Timer', this.DOM.CheckTimer.checked)

		this.Background.Status = this.DOM.CheckBackground.checked
		Utils.setStorageItem('PLAYTIME.Config.Background.Status', this.DOM.CheckBackground.checked)

		if (this.DOM.InputFileBackground.files[0]) {
			var name = this.DOM.InputFileBackground.files[0].name
			var path = encodeURI(this.DOM.InputFileBackground.files[0].path.replace(/\\/g,"/"))

			this.DOM.InputFileName.innerHTML = name

			this.Background.FileName = name
			this.Background.FilePath = path

			Utils.setStorageItem('PLAYTIME.Config.Background.FileName', name)
			Utils.setStorageItem('PLAYTIME.Config.Background.FilePath', path)
		}

		var res = this.DOM.InputSelect.value.match(/(\d+)/g)
		var width = parseInt(res[0])
		var height = parseInt(res[1])

		this.Viewer.Width = width
		this.Viewer.Height = height

		Utils.setStorageItem('PLAYTIME.Config.Viewer.Width', width)
		Utils.setStorageItem('PLAYTIME.Config.Viewer.Height', height)

		this.Window.close()
	}.bind(this))
}

Config.setData = function () {
	if (data = Utils.getStorageItem('PLAYTIME.Config.Cache.Playlist')) {
		this.DOM.CheckPlaylist.checked = data
	}
	
	if (data = Utils.getStorageItem('PLAYTIME.Config.Cache.Timer')) {
		this.DOM.CheckTimer.checked = data
	}
	
	if (data = Utils.getStorageItem('PLAYTIME.Config.Background.Status')) {
		this.DOM.CheckBackground.checked = data
	}

	if (data = Utils.getStorageItem('PLAYTIME.Config.Background.FileName')) {
		this.DOM.InputFileName.innerHTML = data
	}

	if ((Width = Utils.getStorageItem('PLAYTIME.Config.Viewer.Width')) && (Height = Utils.getStorageItem('PLAYTIME.Config.Viewer.Height'))) {
		;[].forEach.call(this.DOM.InputOption, function (el, ind, arr) {
			var res = el.value.match(/(\d+)/g)
			var width = parseInt(res[0])
			var height = parseInt(res[1])
			
			if (Width === width && Height === height) {
				el.setAttribute('selected', '')
			}
		}, this)
	}
}

Config.watchData = function () {
	/*
	this.DOM.CheckPlaylist.addEventListener('change', function (e) {
		this.Cache.Playlist = this.DOM.CheckPlaylist.checked
		Utils.setStorageItem('PLAYTIME.Config.Cache.Playlist', this.DOM.CheckPlaylist.checked)
	}.bind(this))
	*/

	/*
	this.DOM.CheckTimer.addEventListener('change', function (e) {
		this.Cache.Timer = this.DOM.CheckTimer.checked
		Utils.setStorageItem('PLAYTIME.Config.Cache.Timer', this.DOM.CheckTimer.checked)
	}.bind(this))
	*/

	/*
	this.DOM.CheckBackground.addEventListener('change', function (e) {
		this.Background.Status = this.DOM.CheckBackground.checked
		Utils.setStorageItem('PLAYTIME.Config.Background.Status', this.DOM.CheckBackground.checked)
	}.bind(this))
	*/

	this.DOM.InputFileBackground.addEventListener('change', function (e) {
		var name = this.DOM.InputFileBackground.files[0].name
		var path = this.DOM.InputFileBackground.files[0].path

		this.DOM.InputFileName.innerHTML = name

		this.Background.FileName = name
		this.Background.FilePath = path

		//Utils.setStorageItem('PLAYTIME.Config.Background.FileName', name)
		//Utils.setStorageItem('PLAYTIME.Config.Background.FilePath', path)
	}.bind(this))

	/*
	this.DOM.InputSelect.addEventListener('change', function (e) {
		var res = this.DOM.InputSelect.value.match(/(\d+)/g)
		var width = res[0]
		var height = res[1]

		this.Viewer.Width = width
		this.Viewer.Height = height

		Utils.setStorageItem('PLAYTIME.Config.Viewer.Width', width)
	}.bind(this))
	*/
}

Config.observe = function () {
	Utils.objectObserverSync('PLAYTIME.Config', this)
	//Utils.objectObserverSync('PLAYTIME.Config.Cache', this.Cache)
	//Utils.objectObserverSync('PLAYTIME.Config.Background', this.Background)
	//Utils.objectObserverSync('PLAYTIME.Config.Viewer', this.Viewer)

	return this
}

