	function initPageLoad() {
		try {
			if(onPageLoad && typeof(onPageLoad) == "function") {
				onPageLoad();
			}
		} catch(e) {}
		var links = document.getElementsByTagName("a");
		for(var i = 0; links != null && i < links.length; i++) {
			var link = links[i];
			if(link.href == "" || link.href == "#" || link.href == "javascript:;") {
				link.href = "javascript:void(0);";
			}
		}
	}

	function initPageHeader() {
		var header = ZDZTool.getEleByClass("header",  "div");
		if(header != null) {
			var parent = header.parentNode;
			var hdiv   = document.createElement("div");
			hdiv.className = "header_hide";
			hdiv.innerHTML = "<h1>&nbsp;</h1>";
			parent.insertBefore(hdiv,header);
		}
	}

	var swipe_page;

	function swipe_callback(obj) {
		var index = obj.getAttribute("page_index");  // alert("index="+index);
		swipe_page.slide(index);
	}

	function initPageSwipe() {
		var pages = ZDZTool.getEleByClass("pages",  "div");
		swipe_page = null;
		if(pages != null) {
			swipe_page = Swipe(pages, {callback: updatePage});
			updatePage(swipe_page.getPos());
		}
		var tabs  = ZDZTool.getEleByClass("tabbar", "div");
		if(swipe_page != null && tabs != null) {
			var children = document.getElementsByTagName("a");
			for(var i = 0; children != null && i < children.length; i++) {
				var child  = children[i];
				child.href = "javascript:void(0);";
				if(i < swipe_page.getNumSlides()) {
					if(child.id == null || child.id == "") {
						child.id = "zdz_to_page" + i;
					}
					child.setAttribute("page_index", i);
					FastClick.attach(child, {tapDelay: 50});
					child.addEventListener('click', function(event) { swipe_callback(this); }, false);
				}
			}
		}
	}

	var nav_left,   nav_right;
	var swipe_left, swipe_right;
	var nav_auto_hide = false;
	var nav_direction = "left";

	function initPageNav() {
		nav_left  = ZDZTool.getEleByClass("nav-left",  "div");
		nav_right = ZDZTool.getEleByClass("nav-right", "div");
		if(nav_left == null) {
			nav_left  = ZDZTool.getEleByClass("nav-hleft",  "div");
			if(nav_left != null) {
				nav_auto_hide = true;
				nav_direction = "left";
				swipe_left = SwipeSide(nav_left, {
					accessClasses : {
						left  : 'push-left',
						right : 'pull-left'
					}
				});
			}
		} else {
			swipe_left = SwipeSide(nav_left, {
				accessClasses : {
					left  : 'push-left',
					right : 'pull-left'
				}
			});
		}
		if(nav_right == null) {
			nav_right  = ZDZTool.getEleByClass("nav-hright",  "div");
			if(nav_right != null) {
				nav_auto_hide = true;
				nav_direction = "right";
				swipe_right = SwipeSide(nav_right, {
					accessClasses : {
						left  : 'push-right',
						right : 'pull-right'
					}
				});
			}
		} else {
			swipe_right = SwipeSide(nav_right, {
				accessClasses : {
					left  : 'push-right',
					right : 'pull-right'
				}
			});
		}
	}

	function initPage() {
		initPageHeader();
		initPageNav();
		initPageSwipe();
		initPageLoad();
	}

	function updatePage(index, slide) {
		var tabs  = ZDZTool.getEleByClass("tabbar", "div");
		if(swipe_page != null && tabs != null) {
			var child = tabs.children;
			index     = index % child.length;
			for(var i = 0; child != null && i < child.length; i++) {
				if(i == index) {
					ZDZTool.addClass(child[i], "item_on");
				} else {
					ZDZTool.removeClass(child[i], "item_on");
				}
			}
		}
	}

	ZDZTool.showPage = function(pos) {
		if(swipe_page != null && 0 <= pos && pos < swipe_page.getNumSlides()) {
			swipe_page.slide(pos);
		}
	}

	ZDZTool.isNavAutoHide = function() {
		return nav_auto_hide;
	}
	ZDZTool.getNavDirection = function() {
		return nav_direction;
	}
	ZDZTool.showLeftNav = function() {
		if(nav_left != null && swipe_left != null) {
			swipe_left.swipe('left');  //alert("showLeftNav swipe_left="+swipe_left);
		}
	}
	ZDZTool.hideLeftNav = function() {
		if(nav_left != null && swipe_left != null) {
			swipe_left.swipe('right');
		}
	}
	ZDZTool.showRightNav = function() {
		if(nav_right != null && swipe_right != null) {
			swipe_right.swipe('left');
		}
	}
	ZDZTool.hideRightNav = function() {
		if(nav_right != null && swipe_right != null) {
			swipe_right.swipe('right');
		}
	}

	ZDZTool.addLoadEvent(initPage);
