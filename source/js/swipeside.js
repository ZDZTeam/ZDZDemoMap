
function SwipeSide(cont, userOptions) {
    "use strict";

    var container,
        options = {
        accessClasses: {
            left : 'pull-left',
            right: 'pull-right'
        },
        direction: ['left', 'right']
    },
    utils = {
        hasClass: function(obj, cssClass) {
            var re = new RegExp("\\b" + cssClass + "\\b", 'g');
            return (obj.className.match(re) !== null);
        },
        addClass: function(obj, cssClass) {
            var current = obj.className || '';
            var re = new RegExp("\\b" + cssClass + "\\b", 'g');

            if (current.match(re) === null) {
                obj.className = (current += ' ' + cssClass).trim();
            }
        },
        removeClass: function(obj, cssClass) {
            var current = obj.className || '';
            var re = new RegExp("\\b" + cssClass + "\\b", 'g');

            obj.className = current.replace(re, '').trim();
        },
        parentUntilAttr: function(obj, attr) {
            if (obj.getAttribute && obj.getAttribute(attr)) {
                return obj;
            } else if (obj.parentNode) {
                return this.parentUntilAttr(obj.parentNode, attr);
            }
            return false;
        }
    },
    actions = {
        swipe: function(dir) {
            // We're accessing the opposite side to the direction we're swiping
            var access = (dir === 'left') ? 'right' : 'left';

            // If the opposite side is already open, close it
            if (utils.hasClass(container, options.accessClasses[dir])) {
                utils.removeClass(container, options.accessClasses[dir]);
            } else if ( ! utils.hasClass(container, options.accessClasses[access]) && options.direction.indexOf(access) !== -1) {
            // If the side we're trying to expose isn't already open and if we're allowed to expose the panel
                utils.addClass(container, options.accessClasses[access]);
            }
        }
    },
    events = {
        start: {},
        differences: {},
        isHorizontal: null,
        invalidTarget: false,
        handleEvent: function(event) {
            switch (event.type) {
                case 'touchstart':
                    this.touchstart(event);
                    break;
                case 'touchmove':
                    this.touchmove(event);
                    break;
                case 'touchend':
                    this.touchend(event);
                    break;
            }
        },
        touchstart: function(event) {
            var touch = event.touches[0];

            events.start = {
                x: touch.pageX,
                y: touch.pageY
            };

            if (utils.parentUntilAttr(touch.target, 'data-swipeme-ignore')) {
                events.invalidTarget = true;
            }
        },
        touchmove: function(event) {
            var touch = event.touches[0];

            events.differences = {
                x: touch.pageX - events.start.x,
                y: touch.pageY - events.start.y
            };

            if (events.isHorizontal === null) {
                events.isHorizontal = (Math.abs(events.differences.x) > Math.abs(events.differences.y));
            }

            if (events.isHorizontal && ! events.invalidTarget) {
                event.preventDefault();
            }
        },
        touchend: function() {
            if (events.isHorizontal && ! events.invalidTarget) {
				if(zdztool.isNavAutoHide()) {
					zdztool.previous(zdztool.getNavDirection());
				} else {
					var swipeDir = (events.differences.x > 0) ? 'left' : 'right';
					actions.swipe(swipeDir);
				}
            }

            events.isHorizontal = null;
            events.invalidTarget = false;
            events.differences = {};
        }
    };

    function setup(cont, userOptions) {
        container = cont;

        var opt;
        for (opt in options) {
            if (typeof userOptions[opt] !== 'undefined') {
                options[opt] = userOptions[opt];
            }
        }

        if (typeof options.direction === 'string') {
            options.direction = [options.direction];
        }

        return {
            swipe : function(dir) {
                // if dir is undefined assume left as is most common
                dir = dir || 'left';
                actions.swipe(dir);
            },
			container : container,
			actions   : actions,
			events    : events
        };
    }

    if (cont && window.addEventListener) {
        cont.addEventListener('touchstart', events);
        cont.addEventListener('touchmove', events);
        cont.addEventListener('touchend', events);
    }
	return setup(cont, userOptions);
};