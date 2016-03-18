	/**
	* 设置页面为全屏幕模式
	*/
	ZDZTool.full = function() {
		var body = document.getElementsByTagName('body');
		if(body != null) body[0].style.height = zdz.getDisplayHeight() + "px";
	}
	/**
	* 获取用户信息
	* pref   ：信息
	*/
	ZDZTool.getPref = function(pref) {
		var value = zdz.getPref().getString(pref);
		return value;
	}
	/**
	* 获取个人信息，并保存到js对象中
	* pref        ：js对象
	*/
	ZDZTool.loadPref = function(pref) {
		for(var name in pref) if(typeof(pref[name]) != " function ")  pref[name] = zdz.getPref().getString(name);
	}
	/**
	* 设置个人信息，将js对象保存到pref中
	* pref        ：js对象
	*/
	ZDZTool.savePref = function(pref) {
		zdz.getPref().edit();
		for(var name in pref) if(typeof(pref[name]) != " function ")  zdz.getPref().setString(name, pref[name]);
		zdz.getPref().commit();
	}
	/**
	* 开始编辑个人信息
	*/
	ZDZTool.editPref = function() {
		zdz.getPref().edit();
	}
	/**
	* 添加个人信息
	* pref   名称
	* value  值
	*/
	ZDZTool.addPref = function(pref, value) {
		zdz.getPref().setString(pref, value);
	}
	/**
	* 保存个人信息
	*/
	ZDZTool.commitPref = function() {
		zdz.getPref().commit();
	}
	/**
	* 读取个人信息，并填充到input输入框中
	* id           ：html标签id
	* pref         ：个人信息
	* defaultValue ：默认值
	*/
	ZDZTool.input = function(id, pref, defaultValue) {
		var ele = document.getElementById(id);
		if(ele != null) ele.value = zdz.getPref().getString(pref, defaultValue == null ? "" : defaultValue);
	}
	/**
	* 获取input输入框的值
	* id           ：input输入框id
	*/
	ZDZTool.getValue = function(id) {
		var ele = document.getElementById(id);
		return ele == null ? "" : ele.value;
	}
