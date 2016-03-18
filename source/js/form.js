	/**
	* 绘制搜索分割线
	*/
	ZDZTool.searchline = function(color, id) {
		if(id == null) id = "searchLine";
		if(color == null) color = "#0099e8";
		var c = document.getElementById(id);
		if(c == null) return;
		var g = c.getContext("2d");
		var w = c.width;
		var h = c.height;
		var p = w >= 11 ? 11 : w;
		var x = w / 2 - p;
		g.fillStyle = color;
		g.fillRect(x,0,p+p,h);
	}
	ZDZTool.isExitsFunction = function(name) {
		try {
			if (name && typeof name == "function") return true;
		} catch(e) {}
		return false;
	}
	ZDZTool.isExitsVariable = function(name) {
		try {
			if (name && typeof typeof(name) == "undefined") return false;
			else return true;
		} catch(e) {}
		return false;
	}
	ZDZTool.hasClass = function(obj, cssClass) {
		var re = new RegExp("\\b" + cssClass + "\\b", 'g');
		return (obj.className.match(re) !== null);
	}
	ZDZTool.addClass = function(obj, cssClass) {
		var current = obj.className || '';
		var re = new RegExp("\\b" + cssClass + "\\b", 'g');
		if (current.match(re) === null) {
			obj.className = (current += ' ' + cssClass).trim();
		}
	}
	ZDZTool.removeClass = function(obj, cssClass) {
		var current = obj.className || '';
		var re = new RegExp("\\b" + cssClass + "\\b", 'g');
		obj.className = current.replace(re, '').trim();
	}
	ZDZTool.hasAttr = function(obj, attr) {
		if (obj && obj.getAttribute && obj.getAttribute(attr)) {
			return obj;
		}
		obj = obj.parentNode;
		if (obj && obj.getAttribute && obj.getAttribute(attr)) {
			return obj;
		}
		return false;
	}
	ZDZTool.getElesByClass = function(cssClass, tagName) {
		var classobj = new Array();
		if(tagName == null || tagName == "") tagName = "*";
		var tags = document.getElementsByTagName(tagName);
		var regx = new RegExp("\\b" + cssClass + "\\b", 'g');
		for(var i = 0; i < tags.length; i++) {
			var obj = tags[i];
			if(obj.className.match(regx) !== null) {
				classobj[classobj.length] = obj;
			}
		}
		return classobj;
	}
	ZDZTool.getEleByClass = function(cssClass, tagName) {
		if(tagName == null || tagName == "") tagName = "*";
		var tags = document.getElementsByTagName(tagName);
		var regx = new RegExp("\\b" + cssClass + "\\b", 'g');
		for(var i = 0; i < tags.length; i++) {
			var obj = tags[i];
			if(obj.className.match(regx) !== null) {
				return obj;
			}
		}
		return null;
	}
	ZDZTool.addLoadEvent = function(onload) {
		if(!ZDZTool.isExitsFunction(onload)) return;
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = onload;
		} else {
			var oldname = oldonload + '';
			var regx = new RegExp("\\b" + onload + "()", 'g');
			if(!(oldname.match(regx) !== null)) {
				window.onload = function() {
					oldonload();
					onload();
				}
			}
		}
	}
