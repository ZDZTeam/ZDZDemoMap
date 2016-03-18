
	var alert_dialog    = "zdz_alert_dialog";
	var confirm_dialog  = "zdz_confirm_dialog";
	var tip_toast       = "zdz_tip_toast";
	var load_toast      = "zdz_load_toast";

	/**
	* 显示警告对话框
	* title   名称
	* content 内容，多行时输入数组
	* btn     按钮名称
	*/
	ZDZTool.showAlert = function(title, content, btn) {
		var ele = document.getElementById(alert_dialog);
		if(ele == null) {
			ele = document.createElement('div');
			ele.id = alert_dialog;
			ele.setAttribute("class", "zdz_dlg_alert");
			document.body.appendChild(ele);
		}
		if(ele != null) {
			if(btn == null) btn = "确定";
			var html = "<div class=\"zdz_mask\"></div>";
			html += "<div class=\"zdz_dlg\">";
			html += "<div class=\"zdz_dlg_head\">";
			html += "<strong class=\"zdz_dlg_title\">" + title + "</strong>";
			html += "</div>";
			if(content instanceof Array) {
				for(var i=0; i<content.length; i++) {
					html += "<div class=\"zdz_dlg_content\">" + content[i] + "</div>";
				}
			} else {
				html += "<div class=\"zdz_dlg_content\">" + content + "</div>";
			}
			html += "<div class=\"zdz_dlg_foot\">";
			html += "<a href=\"javascript:zdztool.hideAlert();\" class=\"zdz_dlg_btn primary\">" + btn + "</a>";
			html += "</div></div>";
			ele.innerHTML = html;
			ele.style.display = 'block';
		}
	}
	/**
	* 隐藏警告对话框
	*/
	ZDZTool.hideAlert = function() {
		var ele = document.getElementById(alert_dialog);
		if(ele != null) {
			ele.innerHTML     = "";
			ele.style.display = 'none';
		}
	}
	/**
	* 显示确认对话框
	* title      名称
	* content    内容，多行时输入数组
	* btnOk      确认按钮名称
	* btnCancel  取消按钮名称
	*/
	ZDZTool.showConfirm = function(title, content, btnOk, btnCancel) {
		var ele = document.getElementById(confirm_dialog);
		if(ele == null) {
			ele = document.createElement('div');
			ele.id = confirm_dialog;
			ele.setAttribute("class", "zdz_dlg_confirm");
			document.body.appendChild(ele);
		}
		if(ele != null) {
			if(btnOk     == null) btnOk = "确定";
			if(btnCancel == null) btnCancel = "取消";
			if(content   == null) content = "";
			var html = "<div class=\"zdz_mask\"></div>";
			html += "<div class=\"zdz_dlg\">";
			html += "<div class=\"zdz_dlg_head\">";
			html += "<strong class=\"zdz_dlg_title\">" + title + "</strong>";
			html += "</div>";
			if(content instanceof Array) {
				for(var i=0; i<content.length; i++) {
					html += "<div class=\"zdz_dlg_content\">" + content[i] + "</div>";
				}
			} else {
				html += "<div class=\"zdz_dlg_content\">" + content + "</div>";
			}
			html += "<div class=\"zdz_dlg_foot\">";
			html += "<a href=\"javascript:zdztool.hideConfirm();\" class=\"zdz_dlg_btn default\">" + btnCancel + "</a>";
			html += "<a href=\"javascript:zdztool.hideConfirm();\" class=\"zdz_dlg_btn primary\">" + btnOk + "</a>";
			html += "</div></div>";
			ele.innerHTML = html;
			ele.style.display = 'block';
		}
	}
	/**
	* 隐藏确认对话框
	*/
	ZDZTool.hideConfirm = function() {
		var ele = document.getElementById(confirm_dialog);
		if(ele != null) {
			ele.innerHTML     = "";
			ele.style.display = 'none';
		}
	}
	/**
	* 显示toast
	* tip        内容，多行时输入数组
	* delay      等待时间
	*/
	ZDZTool.showToast = function(tip, delay) {
		var ele = document.getElementById(tip_toast);
		if(ele == null) {
			ele = document.createElement('div');
			ele.id = tip_toast;
			document.body.appendChild(ele);
		}
		if(ele != null) {
			if(tip   == null) tip   = "已完成";
			if(delay == null) delay = 2000;
			var html = "<div class=\"zdz_mask_transparent\"></div>";
			html += "<div class=\"zdz_toast\">";
			html += "<i class=\"zdz_icon_toast\"></i>";
			if(tip instanceof Array) {
				for(var i=0; i<tip.length; i++) {
					html += "<p class=\"zdz_toast_content\">" + tip[i] + "</p>";
				}
			} else {
				html += "<p class=\"zdz_toast_content\">" + tip + "</p>";
			}
			html += "</div>";
			ele.innerHTML = html;
			ele.style.display = 'block';
			setTimeout("zdztool.hideToast();", delay);
		}
	}
	/**
	* 隐藏toast
	*/
	ZDZTool.hideToast = function() {
		var ele = document.getElementById(tip_toast);
		if(ele != null) {
			ele.innerHTML     = "";
			ele.style.display = 'none';
		}
	}
	/**
	* 显示加载动画
	* tip        内容，多行时输入数组
	*/
	ZDZTool.showLoading = function(tip) {
		var ele = document.getElementById(load_toast);
		if(ele == null) {
			ele = document.createElement('div');
			ele.id = load_toast;
			ele.setAttribute("class", "zdz_loading_toast");
			document.body.appendChild(ele);
		}
		if(ele != null) {
			if(tip   == null) tip   = "数据加载中";
			var html = "<div class=\"zdz_mask_transparent\"></div>";
			html += "<div class=\"zdz_toast\">";			
			html += "<div class=\"zdz_loading\">";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_0\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_1\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_2\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_3\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_4\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_5\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_6\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_7\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_8\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_9\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_10\"></div>";
			html += "<div class=\"zdz_loading_leaf zdz_loading_leaf_11\"></div>";
			html += "</div>";
			if(tip instanceof Array) {
				for(var i=0; i<tip.length; i++) {
					html += "<p class=\"zdz_toast_content\">" + tip[i] + "</p>";
				}
			} else {
				html += "<p class=\"zdz_toast_content\">" + tip + "</p>";
			}
			html += "</div>";
			ele.innerHTML = html;
			ele.style.display = 'block';
		}
	}
	/**
	* 隐藏加载动画
	*/
	ZDZTool.hideLoading = function() {
		var ele = document.getElementById(load_toast);
		if(ele != null) {
			ele.innerHTML     = "";
			ele.style.display = 'none';
		}
	}
