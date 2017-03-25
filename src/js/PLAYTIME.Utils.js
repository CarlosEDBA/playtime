var PLAYTIME = window.PLAYTIME;
var Utils = PLAYTIME.prototype.Utils;

Utils.devTools = function () {
	remote.getCurrentWindow().toggleDevTools();
};

Utils.objectObserverSync = function (name, obj, callback) {
	Object.observe(obj, function(changes) {
		changes.forEach(function(change) {
			var item = name + '.' + change.name;
			var value = change.object[change.name];
			console.log(item + ': ' + value);
			localStorage.setItem(item, JSON.stringify(value));
			if (callback) callback(change);
		}, this);
	}.bind(this));
};

Utils.arrayObserverSync = function (name, arr, callback) {
	Array.observe(arr, function(changes) {
		changes.forEach(function(change) {
			console.log(change);
			localStorage.setItem(name, JSON.stringify(change.object));
			if (callback) callback(change);
		}, this);
	}.bind(this));
};

Utils.getStorageItem = function (name) {
	if (item = localStorage.getItem(name)) {
		return JSON.parse(item);
	} else {
		return false;
	}
};

Utils.setStorageItem = function (name, value) {
	localStorage.setItem(name, JSON.stringify(value));
};
