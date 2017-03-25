var PLAYTIME = window.PLAYTIME;
var Utils = PLAYTIME.prototype.Utils;
var Playlist = PLAYTIME.prototype.Playlist;

Playlist.Status = 'novideo'; // 'novideo' 'loadedmetadata' 'play' 'pause' 'ended'
Playlist.Cache = false;
Playlist.StartIndex = null;
Playlist.CurrentIndex = null;
Playlist.PreviousIndex = null;
Playlist.NextIndex = null;
Playlist.Items = [];
Playlist.Length = 0;

Playlist.lalala = function () {
	console.log('pq? ._.');
};

Playlist.addItem = function (Videos, callback) {
	if (Videos)
		Videos.forEach(function (el, ind, arr) {
			this.Items.push(el);
			this.Length += 1;
		}.bind(this));
		this.setIndexes();
		if (callback) callback();

	return this;
};

Playlist.removeItem = function (Index, callback) {
	this.Items.splice(Index, 1);
	this.setIndexes();
	if (callback) callback();

	return this;
}

Playlist.clearItems = function (callback) {
	this.Items = [];
	this.Length = 0;
	this.setIndexes();
	this.observePlaylistItems();
	if (callback) callback();
	return this;
};

Playlist.refreshItems = function (callback) {
	console.log('oi eu tbm');
	var items = Utils.getStorageItem('PLAYTIME.Playlist.Items');
	var length = Utils.getStorageItem('PLAYTIME.Playlist.Length');
	if (items && length) {
		this.Items = items;
		this.Length = length;
	}
	if (callback) callback();
	this.setIndexes();

	return this;
};

Playlist.setIndexes = function () {
	if (this.Length) {
		if (this.StartIndex === null) {
			this.StartIndex = 0;
		}
		if (this.CurrentIndex === null) {
			this.CurrentIndex = 0;
		}
	} else {
		this.StartIndex = null;
		this.CurrentIndex = null;
	}

	if (this.StartIndex >= 0) {
		if (this.CurrentIndex >= 0) {

			if (this.CurrentIndex > 0) {
				this.PreviousIndex = this.CurrentIndex - 1;
			} else {
				this.PreviousIndex = null;
			}

			if (this.CurrentIndex < this.Length - 1) {
				this.NextIndex = this.CurrentIndex + 1;
			} else {
				this.NextIndex = null;
			}
		}
	} else {
		this.CurrentIndex = null;
		this.PreviousIndex = null;
		this.NextIndex = null;
	}

	return this;
};

Playlist.updateIndexes = function (Index, callback) {
	this.CurrentIndex = Index;

	if (this.CurrentIndex > 0) {
		this.PreviousIndex = this.CurrentIndex - 1;
	} else {
		this.PreviousIndex = null;
	}

	if (this.CurrentIndex < this.Length - 1) {
		this.NextIndex = this.CurrentIndex + 1;
	} else {
		this.NextIndex = null;
	}

	if (callback) callback();

	return this;
};

Playlist.observePlaylist = function (callback) {
	Utils.objectObserverSync('PLAYTIME.Playlist', this);
	if (callback) callback();
};

Playlist.observePlaylistItems = function (callback) {
	Utils.arrayObserverSync('PLAYTIME.Playlist.Items', this.Items);
	if (callback) callback();
}