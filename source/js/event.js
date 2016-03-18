	var clickId    = [];
	var debulr     = [];
	var anim       = 0;

	
	function checkClickId(id, callback) {
		ZDZTool.blur();
		if(anim == 1) return ;
		var count = clickId[id];
		if(count == null || count == 0) {
			clickId[id] = 1;
			if(Object.prototype.toString.call(callback) === "[object String]") {
				eval(callback);
			} else {
				try { callback(); } catch(e) {}
			}
			clickId[id] = 0;
		}
	}

	/**
	* 根据id设置点击事件
	* id       ：html标签id
	* callback ：事件回调函数
	* delay    ：点击延迟时间
	*/
	ZDZTool.click = function(id, callback, delay) {
		ZDZTool.blur(id);
		var ele = document.getElementById(id);
		if(ele != null) {
			if(delay == null) delay = 50;
			FastClick.attach(ele, {tapDelay: delay});
			ele.addEventListener('click', function(event) { checkClickId(id, callback); }, false);
		}
	}
	/**
	* 根据id设置链接事件
	* id       ：html标签id
	* href     ：链接地址
	* delay    ：点击延迟时间
	*/
	ZDZTool.href = function(id, href, delay) {
		ZDZTool.blur(id);
		var ele = document.getElementById(id);
		if(ele != null) {
			if(delay == null) delay = 50;
			FastClick.attach(ele, {tapDelay: delay});
			ele.addEventListener('click', function(event) { ZDZTool.blur(); checkClickId(id, function(){ zdztool.open(href); });}, false);
		}
	}
	/**
	* 根据id设置链接事件，同时关闭原来视图，用在菜单中。
	* id       ：html标签id
	* href     ：链接地址
	* delay    ：点击延迟时间
	*/
	ZDZTool.hrefindex = function(id, href, direction, delay) {
		ZDZTool.blur(id);
		var ele = document.getElementById(id);
		if(ele != null) {
			if(delay == null) delay = 50;
			FastClick.attach(ele, {tapDelay: delay});
			ele.addEventListener('click', function(event) { ZDZTool.blur(); checkClickId(id, function(){ zdztool.openindex(href, direction); });}, false);
		}
	}
	/**
	* 返回上一页面
	* id        ：html标签id
	* direction ：方向
	* delay     ：点击延迟时间
	*/
	ZDZTool.back = function(id, direction, delay) {
		ZDZTool.blur(id);
		var ele = document.getElementById(id);
		if(ele != null) {
			if(delay == null) delay = 50;
			FastClick.attach(ele, {tapDelay: delay});
			ele.addEventListener('click', function(event) { ZDZTool.blur(); checkClickId(id, function(){ ZDZTool.previous(direction); });}, false);
		}
	}
	/**
	* 去掉html标签的焦点
	* id   需要去掉焦点的标签
	*/
	ZDZTool.blur = function(id) {
		if(id != null) debulr.push(id);
		for(var i=0; i<debulr.length; i++) {
			var ele = document.getElementById(debulr[i]);
			if(ele != null) ele.blur();
		}
	}
	/**
	* 动画锁定
	*/
	ZDZTool.lockAnim = function() {
		anim = 1;
	}
	/**
	* 动画解锁
	*/
	ZDZTool.unlockAnim = function() {
		anim = 0;
	}
	/**
	* 加载指定页面
	*/
	ZDZTool.load = function(url, direction, delay) {
		if(direction == null) direction = "right";
		if(delay == null) delay = 500;
		zdz.setAnim(direction,delay);
		zdz.loadLocal(url);
	}
	/**
	* 打开指定页面
	*/
	ZDZTool.open = function(url, direction, delay) {
		if(direction == null) direction = "right";
		if(delay == null) delay = 500;
		zdz.setAnim(direction,delay);
		zdz.openLocal(url);
	}
	/**
	* 打开指定页面，并关闭前面的页面
	*/
	ZDZTool.openindex = function(url, direction, delay, index) {
		if(direction == null) direction = "right";
		if(delay == null) delay = 500;
		if(index == null) index = 1;
		zdz.setAnim(direction,delay);
		zdz.openLocal(url, index);
	}
	/**
	* 返回上一个页面
	*/
	ZDZTool.previous = function(direction, delay) {
		if(direction == null) direction = "right";
		if(delay == null) delay = 500;
		zdz.setAnim(direction,delay);
		zdz.loadPrevious();
	}
	/**
	* get请求服务前，返回结果
	*/
	ZDZTool.geturl = function(url, callback) {
		zdz.getUrl(url, 'zdztool.onresult', callback);
	}
	/**
	* post请求服务前，返回结果
	*/
	ZDZTool.posturl = function(url, param, callback) {
		zdz.postUrl(url, param, 'zdztool.onresult', callback);
	}
	/**
	* 获取错误描述
	*/
	ZDZTool.getErrorMsg = function(error, msg) {
		if(error == 0)  return "成功";
		if(error == -1) return "请检查网络连接是否正常！";
		if(error == -2) return "请重新登录！";
		if(error == -3) return "错误的验证码！";
		if(error == -4) return  msg;
		return "";
	}
	ZDZTool.onresult = function(code, result, callback) {
		if(code >= 0) {
			var jdata = JSON.parse(result);
			eval(callback + '(code, jdata);');
		} else {
			eval(callback + '(code, "");');
		}
	}
