/*
 * 	Common JavaScript
 * 	note: jQuery dependent
 * 	Version:	1.063
 * 	Updated:	190502
 */

/* -----------------------------------------------------
 *										Extension
 * ----------------------------------------------------- */

/* --------------------------
 * 	CSS change event listener
 * -------------------------- */
// deprecated as usage is complicated. See detectChange() function instead.

(function () {
	var ev = new $.Event('style'),
		orig = $.fn.css;
	$.fn.css = function () {
		$(this).trigger(ev);
		return orig.apply(this, arguments);
	};
})();

/* -------------------------
 *	Return Selector Plugin
 * ------------------------- */

(function ($) {
	$.fn.Selector = function (options) {

		var settings = $.extend({
			help: false,
			identifier: "id"
		}, options);

		if (settings.help) {
			console.log(
				"Selector ver 180823. \n" +
				"Returns the id and/or class of the object. \n" +
				"Options: \n" +
				"help: boolean, Show this message and some other details when true. Default is false. \n" +
				"identifier: string, Declares which selector attribute to return; 'id' returns id, 'class' returns class list, 'all' returns both id and classlist. Default is 0. \n");
		}

		if (options) {
			settings.identifier = options;
		}

		if (!isset(this.attr("id"))) {
			settings.identifier = "class";
		}

		switch (settings.identifier) {
			case "id":
				var print = "#" + this.attr("id");
				break;

			case "class":
				var classArray = this.attr("class").split(" ");
				var print = "." + classArray.join(".");
				break;

			case "all":
				var classArray = this.attr("class").split(" ");
				var id = "#" + this.attr("id");
				var print = id + "." + classArray.join(".");
				// switch break
		}
		// switch end
		return print;
	};
})(jQuery);

/* ---------------
 *	Sticky Plugin
 * --------------- */

(function ($) {
	$.fn.Sticky = function (options) {

		var settings = $.extend({
			help: false,
			debug: false,
			class: "sticky",
			offset: 0,
			stopsAt: null,
			scrollUp: null,
			scrollDown: null
		}, options);

		if (typeof (options) == "string") {
			settings.class = options;
		} else if (typeof (options) == "number") {
			settings.offset = options;
		}

		if (settings.help) {
			console.log(
				"Sticky ver 180827. \n" +
				"Sticks an element to the screen by toggling class. \n" +
				"Options: \n" +
				"help: boolean, Show this message and some other details when true. Default is false. \n" +
				"debug: boolean, shows variables and logs for debugging. Default is false. \n" +
				"class: string(className), Class that is added to the selected element when triggered. Default is 'sticky'. \n" +
				"offset: integer, Offsets for which the sticky class to attach on. Positive values goes down. Default is 0. \n" +
				"stopsAt: Object, A selector for which the sticky element stops at. Default is null. \n" +
				"scrollUp: Object/Function, Runs a function when scrolling up. Default is null. \n" +
				"scrollDown: Object/Function, Runs a function when scrolling down. Default is null."
			);
		}

		if (settings.debug === true) {
			console.log(
				"Settings: \n" +
				"help : " + settings.help + "\n" +
				"debug : " + settings.debug + "\n" +
				"class : " + settings.class + "\n" +
				"offset : " + settings.offset + "\n" +
				"stopsAt : " + settings.stopsAt + "\n" +
				"scrollUp : " + settings.scrollUp + "\n" +
				"scrollDown : " + settings.scrollDown
			);
		}

		var $this = this;
		var $class = settings.class;
		var elementTop = $this.offset().top + settings.offset;

		var windowLastTop = 0;

		$(window).scroll(function () {
			var windowTop = $(window).scrollTop();

			if (settings.debug === true) {
				check(windowTop, "windowTop");
				check(elementTop, "elementTop");
			}

			if (settings.stopsAt !== null) {
				var stopTop = $(settings.stopsAt).offset().top;
				if (windowTop > elementTop && windowTop < stopTop) {
					$this.css({
						'position': 'fixed',
						'top': 0
					});
				} else if (windowTop > stopTop) {
					$this.css({
						'position': 'absolute',
						'top': stopTop
					});
				} else {
					$this.css({
						'position': 'relative',
						'top': 0
					});
				}
			} else {
				if (windowTop > elementTop) {
					$this.addClass($class);
				} else {
					$this.removeClass($class);
				}
			}

			if (settings.scrollUp !== null && settings.scrollDown !== null) {
				if (windowTop > windowLastTop) {
					settings.scrollDown.apply(this, settings.scrollDown);
					if (settings.debug === true) {
						console.log("scrollDown triggered.");
					}
				} else {
					settings.scrollUp.apply(this, settings.scrollUp);
					if (settings.debug === true) {
						console.log("scrollUp triggered.");
					}
				}
				windowLastTop = windowTop;
			}
		});
	};
}(jQuery));

/* ------------------
 *	Accordion Plugin
 * ------------------ */

(function ($) {
	$.fn.Accordion = function (options) {

		var settings = $.extend({
			help: false,
			debug: false,
			class: 'active',
			switch: 1,
			openFirst: false,
			openAll: false,
			onClick: null,
		}, options);

		if (typeof (options) === "number") {
			settings.switch = options;

		} else if (typeof (options) === "string") {
			switch (options) {
				case "openFirst":
				case "First":
				case "first":
					settings.openFirst = true;
					break;
				case "openAll":
				case "All":
				case "all":
					settings.openAll = true;
			}
		}

		if (settings.help) {
			console.log(
				"Accordion ver. 180810 \n " +
				"Toggles class to initiate accordions to the container" +
				"Options: \n" +
				"help: boolean, shows this message on true. Default is false. \n" +
				"debug: boolean, shows variables and logs for debugging. Default is false. \n" +
				"class: string(className), Class that is toggled onto the selected element. Default is 'active'.\n" +
				"switch: number, controls how many accordions to be opened at once. Default is 1, as one opens at a time.\n" +
				"openFirst: boolean, opens first accordion when document is ready. Default is false.\n" +
				"openAll: boolean, opens all accordions when document is ready, and resets 'switch' parameter to 0  when true. Default is false.\n" +
				"OnClick: function, calls a function on clicking a button, default is null.");
		}

		if (settings.debug) {
			console.log(
				"Settings: \n" +
				"help : " + settings.help + "\n" +
				"debug : " + settings.debug + "\n" +
				"class : " + settings.class + "\n" +
				"switch : " + settings.switch+"\n" +
				"stopsAt : " + settings.stopsAt + "\n" +
				"openFirst : " + settings.openFirst + "\n" +
				"openAll : " + settings.openAll + "\n" +
				"onClick: " + settings.onClick
			);
		}

		var $this = this;
		var $class = settings.class;
		var container = $this.find(".accordion-container");
		var button = $this.find(".accordion-button");
		var content = $this.find(".accordion-content");
		var activeArray = [];

		container.each(function () {
			activeArray.push($(this));
		});

		if (settings.openFirst) {
			container.first().addClass($class);
		}

		if (settings.openAll) {
			container.each(function () {
				$(this).addClass($class);
			});
			settings.switch = 0;
		}

		switch (true) {
			case (settings.switch === 0):
				button.click(function () {
					$(this).parent().toggleClass($class);
					if (settings.debug) {
						console.log($(this).Selector() + " accordion toggled.");
					}
				});
				break;

			case (settings.switch >= 1 && settings.openAll === false):

				var clickedArray = [];

				for (var i = 0; i < container.length; i++) {
					clickedArray.push(0);
				}

				if (container.first().hasClass($class)) {
					clickedArray[0] = 1;
				}

				button.click(function () {

					var buttonIndex = $(this).parent().index();

					if (clickedArray[buttonIndex] < 1) {

						for (var i = 0; i <= clickedArray.length; i++) {

							if (clickedArray[i] > 0) {
								activeArray[i].addClass($class);
								clickedArray[i] += 1;
							}

							if (clickedArray[i] > settings.switch) {
								clickedArray[i] = 0;
								activeArray[i].removeClass($class);
							}
						}

						clickedArray[buttonIndex] = 1;
						$(this).parent().addClass($class);

					} else {

						for (var i = 0; i <= clickedArray.length; i++) {

							if (clickedArray[i] > 0) {
								activeArray[i].addClass($class);
							}

							if (clickedArray[i] > clickedArray[buttonIndex]) {
								clickedArray[i] -= 1;
							}
						}

						clickedArray[buttonIndex] = 0;
						activeArray[buttonIndex].removeClass($class);
					}

					if (settings.debug) {
						console.log("clickedArray : " + clickedArray + "\n"	);
						console.log("activeArray : " + activeArray + "\n"	);
					}

					settings.onClick !== null ? settings.onClick.apply(this, settings.onClick) : null;
				});
				// switch break
		}
		// switch end
	};
}(jQuery));

/* ---------------
 *	Select Plugin
 * --------------- */

 (function ($) {

	$.fn.Select = function (options) {

		var settings = $.extend({
			help: false,
			container: "select-container",
			current: "select-current",
			option: "select-option",
			hidden: "hidden"
		}, options);

		if (settings.help) {
			console.log(
				"Select ver. 181025 \n " +
				"Stylize a select tag. The <select> has to be the child of the selector." +
				"Options: \n" +
				"help: boolean, shows this message on true. Default is false. \n" +
				"container: string(className), Class of the div that holds the whole customized select. Default is 'select-container'. \n" +
				"current: string(className), Class of the div that holds the selected option on display. Default is 'select-current'. \n" +
				"option: string(className), Class of the div that holds the options. Default is 'select-option'. \n" +
				"hidden: string(className), Class toggled onto the options container to displaythe options. Default is 'hidden'."
			);
		}

		if ( typeof(options) == "string" ) {
			settings.hidden = options;
		}

		var $this = this;
		var $select = $this.find("select");
		var $options = $select.children();
		var $hidden = settings.hidden;
		var optionsArray = [];

		$select.addClass("hidden"); // temp
		var selectHTML = $select.find(":selected").html();

		$this.append('<div class="' + settings.container + '"></div>');

		$this.find("." + settings.container).append('<div class="' + settings.current + '"><span>' + selectHTML + '</span></div>');
		$this.find("." + settings.container).append('<ul class="' + $hidden + '"></ul>');

		$options.each(function () {
			optionsArray.push($(this));
		});

		for (var i = 0; i < $options.length; i++) {

			//var value = optionsArray[i].val();
			var html = optionsArray[i].html();

			$this.find("." + settings.container + " > ul").append('<li class="' + settings.option + '"><span>' + html + '</span></li>');

			if (optionsArray[i][0].hasAttribute("disabled")) {
				$this.find("." + settings.container + " > ul > li:first-child").remove();
			}
		}

		var $ul = $this.find("." + settings.container + " > ul");
		var $current = $this.find("." + settings.current);
		var $li = $this.find("." + settings.option);

		$li.each(function () {
			if ($(this).children().html() == selectHTML) {
				$(this).addClass("active");
			}
		});

		$current.click(function () {
			$ul.toggleClass($hidden);
		});

		$li.click(function () {

			var j;

			if ($options[0].hasAttribute("disabled")) {
				j = $(this).index() + 1;
			} else {
				j = $(this).index();
			}

			$select[0].selectedIndex = j;

			$li.removeClass("active");
			$(this).addClass("active");

			var selectHTML = $select.find(":selected").html();

			$current.children().html(selectHTML);

			$ul.addClass($hidden);
		});
	};
})(jQuery);

/* -------------------
 *	Scroll Into View
 * ------------------- */

(function ($) {

	$.fn.ScrolledIn = function (options) {

		var settings = $.extend({
			help: false,
			debug: false,
			class: "active",
			direction: "both",
			offsetTop: 0,
			offsetBottom: 0,
			fullyIn: false,
			window: window
		}, options);

		if (settings.help) {
			console.log(
				"ScrolledIn ver. 180823 \n " +
				"Toggle class to selector when scroll in view." +
				"Options: \n" +
				"help: boolean, shows this message on true. Default is false. \n" +
				"debug: boolean, shows variables and logs for debugging. Default is false. \n" +
				"class: string(className), The class to be toggled onto the selected element. Default is 'active'. \n" +
				"direction: string, Control whether the class would be toggled out when selected element is out of the screen. 'linear' is where the class are not toggled off, setting to 'linear' nulls offsetTop; 'both' is where the class will be toggled off. Default is 'both'. \n" +
				"offsetTop: integer, Offset from the top of the screen for the class to be toggled. Positive value offsets from the top. Default is 0. \n" +
				"offsetBottom: integer, Offset from the bottom of the screen for the class to be toggled. Positive value offsets from the bottom. Default is 0. \n" +
				"fullyIn: boolean, Toggles class when the selector is completely in view. Default is false. \n" +
				"window: string(Object), The master wrapper that holds the scrolling components. Default is 'window'. \n"
			);
		}

		if (settings.debug === true) {
			console.log(
				"Settings: \n" +
				"help : " + settings.help + "\n" +
				"debug : " + settings.debug + "\n" +
				"class : " + settings.class + "\n" +
				"direction : " + settings.direction + "\n" +
				"offsetTop : " + settings.offsetTop + "\n" +
				"offsetBottom : " + settings.offsetBottom + "\n" +
				"fullyIn : " + settings.fullyIn + "\n" +
				"window : " + settings.window
			);
		}

		if (typeof (options) === "string") {
			settings.class = options;
		}

		if (typeof (options) === "number") {
			settings.offsetTop = options;
			settings.offsetBottom = options;
		}

		var $this = this;
		var $class = settings.class;
		var $window = settings.window;

		if (settings.fullyIn === true) {

			var $height = $this.height() / 2;

			settings.offsetTop = $height;
			settings.offsetBottom = $height;

			if (settings.debug) {
				console.log(
					"New offsets at fullyIn : true\n" +
					"height : " + $height + "\n" +
					"offsetTop : " + settings.offsetTop + "\n" +
					"offsetBottom : " + settings.offsetBottom
				);
			}
		}

		$($window).scroll(function () {
			var windowTop = $($window).scrollTop();
			var windowBottom = $($window).scrollTop() + $($window).height();

			if (settings.debug) {
				console.log("windowTop: " + windowTop);
				console.log("windowBottom: " + windowBottom);
			}

			$this.each(function () {
				var target;
				if (settings.window === window) {
					target = $(this).offset().top + 0.5 * $(this).height();
				} else {
					target = $(this).offset().top + 0.5 * $(this).height() + windowTop;
				}

				if (settings.debug) {
					console.log("target: " + target);
				}

				if (settings.direction === "both") {
					if (target > windowTop + settings.offsetTop && target < windowBottom - settings.offsetBottom) {
						$(this).addClass($class);

						if (settings.debug) {
							console.log($class + " added to " + $(this).Selector());
						}
					} else {
						$(this).removeClass($class);
					}
				} else if (settings.direction === "linear") {
					if (target < windowBottom - settings.offsetBottom + settings.offsetTop) {
						$(this).addClass($class);
						if (settings.debug) {
							console.log($class + " added to " + $(this).Selector());
						}
					}
				}

			});
		});
	};
})(jQuery);

/* ----------
 *	Tooltips
 * ---------- */

(function ($) {

	$.fn.Tooltips = function (options) {

		var settings = $.extend({
			help: false,
			class: "active",
			contentClass: "tooltips-wrapper",
			content: "<p><i>Placeholder</i></p>",
			type: "hover",
			followMouse: true
		}, options);

		if (settings.help) {
			console.log(
				"Tooltips ver. 180813 \n " +
				"Create and activate tooltips by toggling class." +
				"Options: \n" +
				"help: boolean, shows this message on true. Default is false. \n" +
				"class: string(className), The class to be toggled onto the selected element. Default is 'active'. \n" +
				"contentClass: string(className), Name of the class which is toggled onto the selected element. Default is 'tooltips-wrapper'. \n" +
				"content: string(HTML), Defines the output within the tooltip, usually a HTML. Default is '<p><i>Placeholder</i></p>'. \n" +
				"type: string, Declares the method of interactivity for the activated. Options are 'hover', where the class is toggled in on hover, and 'click' where the class is toggled in on click. Default is 'hover'. \n" +
				"followMouse: boolean, Controls whether the tooltip's position should be relative to cursor. Default is true."
			);
		}
		console.log(settings.content);

		var $this = this;
		var $class = settings.class;
		var $contentClass = settings.contentClass;
		var $content = settings.content;

		$(this).prepend('<div class="' + $contentClass + '">' + $content + '</div>');

		var $tooltip = $("." + $contentClass);

		if (settings.type === "hover") {
			$this.not("." + $contentClass).on("mouseenter", function () {
				$this.addClass($class);
			});

			if (settings.followMouse === true) {
				$this.on("mousemove", function (event) {
					var coorX = event.pageX - $this.offset().left;
					var coorY = event.pageY - $this.offset().top;

					var percX = coorX / $this.width() * 100;
					var percY = coorY / $this.height() * 100;

					$tooltip.css({
						"top": percY + "%",
						"left": percX + "%"
					});
				});
			}

			$this.on("mouseleave", function () {
				$this.removeClass($class);
			});
		}

		if (settings.type === "click") {

			$("body").on("click", function () {
				$this.removeClass('active');
			});

			$this.on("click", function (event) {

				event.stopPropagation();

				if (settings.followMouse === true) {

					var coorX = event.pageX - $this.offset().left;
					var coorY = event.pageY - $this.offset().top;

					var percX = coorX / $this.width() * 100;
					var percY = coorY / $this.height() * 100;

					$tooltip.css({
						"top": percY + "%",
						"left": percX + "%"
					});
				}

				$this.toggleClass($class);
			});
		}
	};

})(jQuery);

/* -----------
 *	Sequencer
 * ----------- */

(function ($) {

	$.fn.SequenceModal = function (options) {

		var settings = $.extend({
			help: false,
			class: "active",
			buttonNext: 'button[name="next"]',
			buttonPrev: 'button[name="prev"]',
			buttonClose: 'button[name="close"]',
		}, options);

		if (settings.help) {
			console.log(
				"Sequencer ver 180815. \n" +
				"Display a set of elements of the same class in sequence of the html by toggling class. \n" +
				"Options: \n" +
				"help: boolean, Show this message and some other details when true. Default is false. \n" +
				"class: string(className), Class that is added to the selected element when triggered into the sequence modals. Default is 'active'. \n" +
				"buttonNext: string(selector), The selector of the button that displays the next element in the sequence Default is 'button[name='next']'. \n" +
				"buttonPrev: string(selector), The selector of the button that displays the previous element in the sequence. Default is 'button[name='prev']'. \n" +
				"buttonClose: string(selector), The selector of the button that closes the sequence. Default is 'button[name='prev']'. \n");
		}

		var $this = this;
		var $class = settings.class;
		var $next = $this.find(settings.buttonNext);
		var $prev = $this.find(settings.buttonPrev);
		var $close = $this.find(settings.buttonClose);
		var sequenceArray = [];

		$this.each(function () {
			sequenceArray.push($(this));
		});

		sequenceArray[0].addClass($class);

		for (var i = 0; i < sequenceArray.length; i++) {
			if (sequenceArray[i].hasClass($class)) {

				var index = i;

				$($next).click(function () {
					index = index + 1;
					$this.removeClass($class);
					sequenceArray[index].addClass($class);
				});

				$($prev).click(function () {
					index = index - 1;
					$this.removeClass($class);
					sequenceArray[index].addClass($class);
				});
			}
		}

		sequenceArray[0].find($prev).remove();
		sequenceArray[sequenceArray.length - 1].find($next).remove();

		$($close).click(function () {
			closeSequencer();
		});

		function closeSequencer() {
			$this.removeClass($class);
			index = 0;
		}

	};
})(jQuery);

/* --------------
 *	While Scroll 	//incomplete
 * -------------- */

(function ($) {
	$.fn.Scrolling = function (options) {

		var settings = $.extend({
			help: false,
			class: "scrolled",
			timeOut: 0100,
			scrollUp: null,
			scrollDown: null
		}, options);

		if (settings.help) {
			console.log(
				"Scrolling ver 180824. \n" +
				"Attach class to element while scrolling. \n" +
				"Options: \n" +
				"help: boolean, Show this message and some other details when true. Default is false. \n" +
				"class: string(className), Class that is toggled to the selected element when scrolling. Default is 'scrolled'. \n" +
				"timeOut: number(time), Modify the time for class to be toggled out. Default is '0100'. \n " +
				"scrollUp: string(className), Toggle a class to selected element when scrolling up. Overwrites the 'class' option. Default is 'null'. \n" +
				"scrollDown: string(className), Toggle a class to selected element when scrolling down. Overwrites the 'class' option. Default is 'null'. "
			);
		}

		var $this = this;
		var $class = settings.class;
		var $timeOut = settings.timeOut;
		var $scrollUp = settings.scrollUp;
		var $scrollDown = settings.scrollDown;


		if (typeof (options) === "string") {
			settings.class = options;
		}
		if (typeof (options) === "number") {
			settings.timeOut = options;
		}

		var windowLastTop = 0;

		$(window).scroll(function () {

			var windowTop = $(window).scrollTop();

			if (settings.scrollUp !== null && settings.scrollDown !== null) {
				if (windowTop > windowLastTop) {
					$this.addClass($scrollUp);
				} else {
					$this.addClass($scrollDown);
				}

				windowLastTop = windowTop;

				setTimeout(function () {
					$this.removeClass($scrollUp);
					$this.removeClass($scrollDown);
				}, $timeOut);

			} else {
				$this.addClass($class);

				setTimeout(function () {
					$this.removeClass($class);
				}, $timeOut);

			}
		});
	};
})(jQuery);

/* -------------------
 *	Scroll Horizontal
 * ------------------- */

 (function($) {
  	$.fn.scrollHorizontal = function(options) {

  		var $this = this;

  		var settings = $.extend({
  			help : false,
  			debug : false,
  			window: $this,
  			target: $this.children(),
  			margin: 0,
  			sensitivityX : 1,
  			sensitivityY : 0.7,
  			function: null
  		}, options);

     if (settings.help) {
 			console.log(
 				"scrollHorizontal ver 190227. \n" +
 				"Makes x-overflowing children scrollable on wheel up or down. \n" +
 				"Options: \n" +
 				"help: boolean, Show this message and some other details when true. Default is false. \n" +
 				"window: Object/HTML Element, the object in which the mouse wheel event is triggered on. Default is the selected element. \n" +
         "target: HTML Element, the objects that will be scrolling horizontally. Default is the children of selected element \n" +
         "margin: number, the margin added to the left and right of the parent of the target. Default is 0. \n" +
         "sensitivityX: number, the increment factor on the horizontal scrolling based on vertical wheel event. Default is 1. \n" +
         "sensitivityY: number, the increment factor on the horizontal scrolling based on horizontal wheel event. Default is 0.7. \n" +
         "function: function, a callback function on each mouse wheel event, Default is 'null' \n"
 			);
 		}

  		var sensitivityX = settings.sensitivityX;
  		var sensitivityY = settings.sensitivityY;
  		var $window = settings.window;
  		var $function = settings.function;
  		var $margin = settings.margin;

  		var current = 0;

     var $target = settings.target;
     var targetWidth = $target.outerWidth(true) * $target.length;
     var targetActualWidth = targetWidth - $window.width() + $margin * 2;

     $target.parent().css('marginLeft', $margin + 'px');

  		$window.on("wheel", function (ev) {

  			ev.preventDefault();

  			var deltaY, deltaX;

  			deltaY = sensitivityY * (parseInt(ev.originalEvent.deltaY));
  			deltaX = sensitivityX * (parseInt(ev.originalEvent.deltaX));

  			current += deltaY;
  			current += deltaX;

  			var scroll;

  			if (current >= targetActualWidth ) {
  				current = targetActualWidth ;
  			} else if (current <= 0 ) {
  				current = 0 ;
  			}
       scroll = current;

       if ( settings.debug ) {
         console.log({$target, targetWidth, targetActualWidth, current});
       }

  			if ( $function !== null ) {
  				$function.apply(this, $function);
  			}

  			$target.parent().css('transform', 'translateX(-' + scroll + 'px)');
  		});
  	};
  })(jQuery);

/* ----------------
 *	Automate Dates
 * ---------------- */

(function ($) {
  $.fn.AutomateDates = function (options) {

    var settings = $.extend({
      help: false,
      yearRange: 50,
      displayToday: true,
      day: "[name='dobD']",
      month: "[name='dobM']",
      year: "[name='dobY']",
      dateOffset: 0,
      monthOffset: 0,
      yearOffset: 0,
      yearStart: "center",
      monthType: "Mmm",
    }, options);

    if (settings.help) {
      console.log(
        "AutomateDates ver 190118. \n" +
        "Formates select tag for dates. \n" +
        "Options: \n" +
        "help: boolean, Show this message and some other details when true. Default is false. \n" +
        "yearRange: interger, Appends the selectable range for years. Default is 50. \n" +
        "displayToday: boolean, Display current date if set to true. Displays the values set in attribute 'data-date' of each respective selectors of to the first day of the year if set to false. Default is true. \n" +
        "day: string(selector), Find the child select tag that gives the value of the date. Default is '[name*='day']'. \n" +
        "month: string(selector), Find the child select tag that gives the value of the month. Default is '[name*='month']'. \n" +
        "year: string(selector), Find the child select tag that gives the value of the year. Default is '[name*='year']'. \n" +
        "dayOffset: interger, Offsets the date value. Resets to 1 if input given is invalid. Default is 0. \n" +
        "monthOffset: interger, Offsets the month value. Resets to January if input given is invalid. Default is 0. \n" +
        "yearOffset: interger, Offsets the year value. Resets to the lowest year of the set year range if input given is invalid. Default is 0. \n" +
        "yearStart: string, Set the default selected year within the yearRange option. Available values are 'start', 'center', 'end'. Default is center. \n" +
        "monthType: string, Outputs the month format. Available values are 'Mmm' : Jan, 'mmm': jan, 'n' : 1, 'nn': 01. Default is 'Mmm'. \n"
      );
    }

    var $this = this;
    var yearRange = settings.yearRange;
    var dateOffset = settings.dateOffset;
    var monthOffset = settings.monthOffset;
    var yearOffset = settings.yearOffset;
    var $day = $this.find(settings.day);
    var $month = $this.find(settings.month);
    var $year = $this.find(settings.year);

    var daysInCurrMonth;

    switch (settings.monthType) {
      case "Mmm":
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        break;
      case "mmm":
        var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
        break;
      case "n":
        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        break;
      case "nn":
        var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        break;
    }

    function daysInMonth(month, year) {
      var extraDay = 0;
      if ( month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11 ) {
        extraDay = 1;
      } else if ( month == 1 ) {
        extraDay = -1;
      } else if ( month == 1 && ( year % 4 == 0 ) ) {
        extraDay = -2;
      }
      return (30 + extraDay);
    }

    var today = new Date();
    var day = today.getUTCDate();
    var month = today.getUTCMonth();
    var year = today.getUTCFullYear();

    daysInCurrMonth = daysInMonth(month, year);

    // Year
    if ( settings.yearStart == "start" ) {
      for (var i = 0; i <= yearRange; i++) {
        var opt = document.createElement('option');
        opt.value = i + year;
        opt.text = i + year;
        $year.append(opt);
      }
    } else if ( settings.yearStart == "center" ) {
      for (var i = 0 - (yearRange / 2); i <= (yearRange / 2); i++) {
        var opt = document.createElement('option');
        opt.value = i + year;
        opt.text = i + year;
        $year.append(opt);
      }
    } else if ( settings.yearStart == "end" ) {
      for (var i = year; i > year - yearRange; i--) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.text = i;
        $year.append(opt);
      }
    }

    // Month
    for (var i = 0; i < 12; i++) {
      var opt = document.createElement('option');
      opt.value = months[i];
      opt.text = months[i];
      $month.append(opt);
    }

     // Day
    for (var i = 0; i < (daysInCurrMonth); i++) {
      var opt = document.createElement('option');
      opt.value = i + 1;
      opt.text = i + 1;
      $day.append(opt);
    }

    function display_date(value, select, add) {
      var current_value = $this.find("[value=" + value + "]").text();
      var option = select.children();
      add == undefined ? add = 0 : null;

      option.each(function () {
        if ($(this).val() === current_value) {
          var index = $(this).index();
          $(option[index + add]).attr("selected", "selected");
        }
      });
    }

    if ( settings.displayToday ) {
      display_date(day, $day, dateOffset);
      display_date(months[month], $month, monthOffset);
      display_date(year, $year, yearOffset);
    } else {
      display_date($day.data("date"), $day, dateOffset);
      display_date(months[$month.data("date") - 1], $month, monthOffset);
      display_date($year.data("date"), $year, yearOffset);
    }

    /* --- Change handler for months --- */
		$month.change(function () {
      var newMonth = months.indexOf($month.val()),
        newYear = $year.val(),
        newDay = $day.val();

      daysInCurrMonth = daysInMonth(newMonth, newYear);
        $day.empty();

      $day.innerHTML = "";
      for (var i = 0; i < daysInCurrMonth; i++) {
        var opt = document.createElement('option');
        opt.value = i + 1;
        if ( opt.value === newDay ) {
          opt.selected = true;
        }
        opt.text = i + 1;
        $day.append(opt);
      }
    });
  }
})(jQuery);

/* -----------------------------------------------------
 *						Functions
 * ----------------------------------------------------- */

/* ----------------------
 *	Value and Type check
 * ---------------------- */

function check(a, b) {

	// where b = "a";

	if (isset(a)) {
		console.log(b + " is '" + a + "' and its a " + typeof (a));
	} else {
		console.log(b + " is undefined");
	}
}

/* ----------------------------------------------------
 *	Validate definition of a variable and/or constant
 * ---------------------------------------------------- */

function isset(a) {
	if (typeof (a) !== 'undefined') {
		return a;
	}
}

/* ----------------------
 *  Modify LESS variable
 * ---------------------- */

function modifyLESS(property, value) {

	if (typeof (property) !== "string") {
		console.error("First arguement should be a string.");
	} else {
		if (property[0] !== "@") {
			property = "@" + property;
		}
	}
	if (typeof (property) !== "string") {
		console.error("Second arguement should be a string.");
	}

	var array = {
		[property]: value
	}
	console.log(array);
	return less.modifyVars(array);
}

/* // Default Template:
less.modifyVars({
  '@variable1': 'value1',
  '@variable2': 'value2'
});
*/

/* ----------------
 * 	Animate Scroll
 * ---------------- */
//190131 renamed from 'autoScroll'

function animateScroll(speed, offset) {
	/* from CSS-Tricks */
  speed == undefined ? speed = 0300 : null;
  offset == undefined ? offset = 0 : null;

	$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
		if (
			location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
			location.hostname === this.hostname
		) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top + offset
				}, speed, function () {
					var $target = $(target) + offset;
				});
			}
		}
	});
}

/// needs ScollToPlugin
/// https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/plugins/ScrollToPlugin.min.js
function tweenScroll(speed, offset, ease) {
	speed == undefined ? speed = 1 : null;
	offset == undefined ? offset = 0 : null;
	ease == undefined ? ease = Power3.easeOut : null;

	let $script = document.createElement('script');
	$script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/plugins/ScrollToPlugin.min.js";
	$("body script").before($script);

  let $anchor = $('a[href*="#"]').not('[href="#"]').not('[href="#0"]');
	$anchor.click(function (ev) {
    ev.preventDefault();
    let href = $(this).attr("href");
    console.log(href);
		TweenMax.to(window, speed, { scrollTo:{ y: href, offsetY: offset }, ease: ease } );
	});
}

/* -------------------------
 *	Scroll Event Up or Down
 * ------------------------- */

var windowLastTop = 0; // this goes outside and before scroll function

// this function goes into a scroll bind function
function scrollDircEvent(windowTop, fnDown, fnUp) {

	if (windowTop > windowLastTop) {
		fnDown.apply(this, fnDown);
		// Scroll Down code
	} else {
		fnUp.apply(this, fnUp);
		// Scroll Up code
	}
	windowLastTop = windowTop;
}

/* ------
 * 	Tabs
 * ------ */

function tab() {

	var tabContent = $(".tab-content");

	$(".tab-button").click(function () {
		$(".tab-button").siblings().removeClass("active");
		$(this).addClass("active");

		var index = $(this).index() + 1;

		tabContent.removeClass("active");
		$(".tab-content:nth-child(" + index + ")").addClass("active");
	});

}

/* ---------------
 *	DetectChange
 * --------------- */

/// Detect Mutation

function detectMutation(selector) {

	var targetNode = document.querySelector(selector);
	var config = {
		attributes: true,
		childList: true,
		subtree: true
	};

	var callback = function (mutationsList) {
		for (var mutation of mutationsList) {
			if (mutation.type === 'childList') {
				console.log('A child node has been added or removed.');

			} else if (mutation.type === 'attributes') {
				console.log('The ' + mutation.attributeName + ' attribute was modified.');
			}
		}
	};

	var observer = new MutationObserver(callback);

	observer.observe(targetNode, config);
}

/// Detect DOM Changes

function detectDOMChange(selector, name) {
	if ( typeof(name) == "undefined" || name == "" ) {
		name = "DOMToCheck"
	}
	var storage = sessionStorage.getItem(name);
	var $selector = $(selector);
	var change = new Boolean;

	if ( storage == null ) {
		sessionStorage.setItem(name, $selector.html());
	} else {
		if ( $selector.html() == storage ) {
			change = false;
		} else {
			change = true;
			sessionStorage.setItem(name, $selector.html());
		}
		return change;
	}
}

/* ---------
 *  Cookies
 * --------- */
/// 181127
/// From W3School
/// url: https://www.w3schools.com/js/js_cookies.asp

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

/* -----------
 *	Parallax
 * ----------- */
// Deprecated as multiple on scroll fires slows down the site, find 'commons.less: parallax' instead
// Works across browser tho.

function parallax(element, intensity, offset, type) {
	console.info("parallax(element: DOM Object, intensity: interger, offset: interger, type: number(1-5))");
	var target = element.offset().top;
	var inlineIntensity = element.attr("parallax-intensity");
	var inlineOffset = element.attr("parallax-offset");

	if (typeof (inlineIntensity) !== "undefined" && inlineIntensity !== "" && typeof (intensity) !== "undefined") {
		intensity = inlineIntensity;
	} else if (typeof (inlineIntensity) !== "undefined" && inlineIntensity == "" && typeof (intensity) !== "undefined") {
		console.warn("Attribute 'parallax-intensity' at " + element.attr("id") + " is empty. Intensity is set at 8.");
		intensity = 8;
	} else if (typeof (inlineIntensity) == "undefined" && typeof (intensity) == "undefined") {
		return intensity;
	}
	if (typeof (intensity) !== "number") {
		console.warn("Intensity at " + element.attr("id") + " should be a number. Intensity is set at 8.");
		intensity = 8;
	}

	if (typeof (inlineOffset) !== "undefined" && inlineOffset !== "" && typeof (offset) !== "undefined") {
		offset = inlineOffset;
	} else if (typeof (inlineOffset) !== "undefined" && inlineOffset == "" && typeof (offset) !== "undefined") {
		offset = 0;
	} else if (typeof (inlineOffset) == "undefined" && typeof (offset) == "undefined") {
		offset = 0;
	}
	if (typeof (offset) !== "number") {
		console.warn("Offset at " + element.attr("id") + " should be a number.");
		offset = 0;
	}

	if (type < 1 || type > 5) {
		console.log("Forth parameter " + type + "in parallax()(" + element.attr("id") + ") is set out of available values. \nValues: 1 = 'background-position'; 2 = 'margin-top'; 3 = 'padding-top'; 4 = 'top'. \nValue is set to 1. ");
		type = 1;
	}

	// Debug
	//	console.log(element.attr("id") + ", intensity : " + intensity + ", type : " + type + ", target : " + target + ".");

	$(window).scroll(function () {
		var windowTop = $(window).scrollTop();
		var diff = windowTop - target;

		if (intensity === 1) {

			switch (type) {
				case 1:
					element.css('background-attachment', 'fixed');
					break;
				case 2:
					element.css('margin-top', diff);
					break;
				case 3:
					element.css('padding-top', diff);
					break;
				case 4:
					element.css('top', diff);
					break;
				case 5:
					element.css('transform', 'translateY(' + diff + ')');
					break;
				default:
					element.css('background-attachment', 'fixed');
			}

		}

		if (intensity > 1 && (windowTop >= target - $(window).height() * 2)) {
			var translation = diff / intensity - offset + 'px';

			switch (type) {
				case 1:
					element.css('background-position', 'center ' + translation);
					break;
				case 2:
					element.css('margin-top', translation);
					break;
				case 3:
					element.css('padding-top', translation);
					break;
				case 4:
					element.css('top', translation);
					element.bind("style", function () {
						console.warn("If this is not working, your selector is lacking 'position: relative/absolute' css property.");
					});
					break;
				case 5:
					element.css('transform', 'translateY(' + translation + ')');
					break;
				default:
					element.css('background-position', 'center ' + translation);
			}
		}
	});
}

/* -------------------
 *	<img> svg to svg
 * ------------------- */

function imgToSvg() {
	jQuery('img.svg').each(function () {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			}

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});
}

/* ---------------
 * 	Sticky Things
 * --------------- */
// deprecated, find "Sticky Plugin" instead

function sticky(element, benchmark, offset) {
	var windowTop = $(window).scrollTop();
	var markTop = benchmark.height() + benchmark.offset().top - $(window).scrollTop() - offset;

	if (windowTop > markTop) {
		element.addClass("sticky");
	} else {
		element.removeClass("sticky");
	}
}

/* ---------------------------------------------------------------------
 * 	Force Footer at bottom if window height is greater that doc height
 * --------------------------------------------------------------------- */

function adaptiveFooter(element) {

	/* version 180829 */

	if (!isset(element)) {
		element = $("footer");
	} else {
		if (typeof(element) !== "string") {
			console.error("Arguement in adaptiveFooter() should be a string(selector)");
			return;
		} else {
			element = $(element);
			if ( !isset(element.offset()) ) {
				console.error("Selector in adaptiveFooter() doesn't exist in this document.");
				return;
			}
		}
	}

	if ( element.offset().top < $(window).height() ) {
		element.css({
			'position' : 'fixed',
			'bottom' : '0'
		});
	}
}

/* -----------------------------------
 *	Generate random number with range
 * ------------------------------------ */

function randomNumberRanged(max, min) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ----------------
 *	Generate color
 * ---------------- */
// Author : Mohsen
// Source : https://stackoverflow.com/questions/1484506/random-color-generator

 function randomColor() {
 	return  '#'+(Math.random()*0xFFFFFF<<0).toString(16);
 }

 /* -----------------------
  *	Generate random string
  * ----------------------- */
/// Version: 181203
function random_str(length, keyspace, randomise) {
  keyspace == undefined ? keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' : null;
  randomise == undefined ? randomise = false : null;

  if ( randomise == true ) {
    keyspace = keyspace.split('').sort(function(){return 0.5 - Math.random()}).join('');
  }

  var output = "";
  for (var i = 0; i < length; i++) {
    output += keyspace.charAt(Math.floor(Math.random() * keyspace.length));
  }

  return output;
}

/* ---------------------------------------
 *	Force Landscape Orientation on Mobile
 * ---------------------------------------- */

function forceLandscape(float) {

	/* version 180825 */

	if (!isset(float)) {
		float = "left";
	} else {
		float = float.toLocaleLowerCase();
		if (float !== "left" && float !== "right") {
			float = "left";
			console.warn("Parameter in forceLandscape() should be either 'left' or 'right'.");
		}
	}

	var raw = []; // add ','
	//var selectorsRaw = ",main, section, div"; // temp
	var container = "main";

	$("body *").each(function () {
		if ($(this).width() === $(window).width()) {
			raw.push($(this)[0].tagName.toLowerCase());
		}
	});

	var proccessed = [];

	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	proccessed = raw.filter(onlyUnique);

	if (proccessed.indexOf("script") > -1) {
		proccessed.splice(proccessed.indexOf("script"), 1);
	}

	var array = "," + proccessed.join(", ");

	if (float === "right") {
		var orientation =
			'transform: rotate(90deg);' +
			'transform-origin: right top;' +
			'width: 100vh;' +
			'height: 100vw;' +
			'overflow-x: hidden;' +
			'position: absolute;' +
			'top: 100%;' +
			'right: 0;' +
			'transition: all 0.25 ease';
	} else {
		var orientation =
			'transform: rotate(-90deg);' +
			'transform-origin: left top;' +
			'width: 100vh;' +
			'height: 100vw;' +
			'overflow-x: hidden;' +
			'position: absolute;' +
			'top: 100%;' +
			'left: 0;' +
			'transition: all 0.25 ease';
	}

	var style =
		'/* ----- Force Landscape ----- */' +
		'@media screen and (min-width: 320px) and (max-width: 767px) and (orientation: portrait) {' +
		'html {' + orientation + '}' +
		'body ' + array + '{' +
		'width: 100%;' +
		'height: 100%;' +
		'} ' +

		container + ' {' +
		'overflow-x: hidden;' +
		'}';

	$("head").append('<style id="forcedLandscape">' + style + "</style>");

}

/// end Extensions

/* -----------------------------------
  Generate Options for Date in Account
  ----------------------------------- */

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function populateDates() {
	var today = new Date(),
		day = today.getUTCDate(),
		month = today.getUTCMonth(),
		yearRange = 80,
		year = today.getUTCFullYear() - yearRange,
		daysInCurrMonth = daysInMonth(month, year);

	// Year
	for (var i = 0; i <= yearRange; i++) {
		var opt = document.createElement('option');
		opt.value = i + year;
		opt.text = i + year;
		yeardropdown.append(opt);
	}

	// Month
	for (var i = 0; i < 12; i++) {
		var opt = document.createElement('option');
		opt.value = months[i];
		opt.text = months[i];
		monthdropdown.append(opt);
	}

	// Day
	for (var i = 0; i < daysInCurrMonth; i++) {
		var opt = document.createElement('option');
		opt.value = i + 1;
		opt.text = i + 1;
		daydropdown.append(opt);
	}

	function display_current_date(a, b) {

		var current_value = $("[value=" + a + "]").text();
		var c = b.children();

		c.each(function () {
			if ($(this).val() === current_value) {
				$(this).attr("selected", "selected");
			}
		});

	}

	display_current_date(day, daydropdown);
	display_current_date(months[month], monthdropdown);
	display_current_date(year + yearRange, yeardropdown);

}
/*
var daydropdown = document.getElementById("ctl00_CP1_ddlDay"),
	monthdropdown = document.getElementById("ctl00_CP1_ddlMonth"),
	yeardropdown = document.getElementById("ctl00_CP1_ddlYear");
*/
var daydropdown = $("select[name*='Day']"),
	monthdropdown = $("select[name*='Month']"),
	yeardropdown = $("select[name*='Year']"),
	daysInCurrMonth;


/* --- Change handler for months --- */
monthdropdown.onchange = function () {
	var newMonth = months.indexOf(monthdropdown.value) + 1,
		newYear = yeardropdown.value;

	daysInCurrMonth = daysInMonth(newMonth, newYear);

	daydropdown.innerHTML = "";
	for (var i = 0; i < daysInCurrMonth; i++) {
		var opt = document.createElement('option');
		opt.value = i + 1;
		opt.text = i + 1;
		daydropdown.appendChild(opt);
	}

};

/* ----------------------
 *	Detect Touch Device
 * ---------------------- */

var isTouchScreen = 'ontouchstart' in document.documentElement;

/* // Goes in event 'onDocumentClick'
if (isTouchScreen) {
  // Do something if a touch screen
}
else {
  // Not a touch screen (i.e. desktop)
}
*/

/* ----------------
 *	Detect User Os
 * ---------------- */
/// Author	: Vladyslav Turak
/// Source	: https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

/* ----------------
 *	Detect Server
 * ---------------- */
/// 181127
/// Deprecated, use fetchFile() instead.

var servename = window.location.host;
var $rootPath;

if ( servename === "localhost" || servename.split(".").shift() === "192" || servename.split(".").shift() === "172" ) {
  $rootPath = "/folder/";
} else {
  $rootPath = "";
}

/* ------------------------
 *	Detect Element Loading		// WIP
 * ------------------------ */
// Not perfect if file is cached

function getElementLoadingPercentage(element, callback) {
	var el = $(element);
	var n = el.length;
	var l = 0;
	var p = 0;

	el.each(function() {
		$(this).on("load", function(){
			l += 1;
			p = (l / n * 100 );
			callback(p);
		});
	});
}

/* -----------------------
 *	Append Uploaded Image
 * ----------------------- */
// As a code instead of snippet, as each case is different

function appendUploadedImage(input, output, callback) {

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		var $this = $(input);
		$(output).find("img").remove();

		reader.onload = function (e) {
			var img = document.createElement("img");
			img.setAttribute('src', e.target.result);
			$(output).append(img);
		};

		if ( $this.attr("data-image") ) {
			var data = $this.attr("data-image");
			$this.attr('name', data);
		}

		reader.readAsDataURL(input.files[0]);
		callback !== undefined ? callback() : null;
	} else {
    $(output).find("img").remove();
  }
}

/* --------------
 *	Validations
 * --------------*/
/// 190319

function alphanumericsOnly(a, escape) {
	$(a).keydown(function (ev) {
		var key = ev.key;
		if ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z") || (key >= 0 && key <= 9) || key == " " || key == "." || key == "," || key == escape) {
			return true;
		} else {
			return false;
		}
	});
}

function alphabhetsOnly(a, escape) {
	$(a).keydown(function (ev) {
	var key = ev.key;
		if ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z") || key == " " || key == "." || key == "," || key == escape) {
			return true;
		} else {
			return false;
		}
	});
}

function numbersOnly(a, escape) {
	$(a).keydown(function (ev) {
		var key = ev.key
		if ((key >= 0 && key <= 9) || key == "ArrowLeft" || key == "ArrowRight" || key == "Tab" || key == "Backspace" || key == "Delete" || key == "." || key == escape) {
			return true;
		} else {
			return false;
		}
	});
}

function emailOnly(a, escape) {
	$(a).keydown(function (ev) {
		var key = ev.key;
		if ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z") || (key >= 0 && key <= 9) || key == "@" || key == "." || key == escape) {
			return true;
		} else {
			return false;
		}
	});
}

function limitLength(input, limit) {
	$(input).keydown(function(ev){
    	var key = ev.key;
		var length = $(input).val().length;
    	if ( key == "ArrowLeft" || key == "ArrowRight" || key == "Tab" || key == "Backspace" || key == "Delete" ) return true;
		return length >= limit ? false : null;
	});
}

/* --------------
 *	Ticking Time
 * --------------*/
// 181015

function getTickingTime(unit) {
	var t = new Date();
	var time;
	unit = unit.toLowerCase();

	switch (unit) {
		case "h":
		case "hour":
		case "hours":
			time = t.getHours();
			break;

		case "m":
		case "min":
		case "minute":
		case "minutes":
			time = t.getMinutes();
			break;

		case "ms":
		case "msec":
		case "millisecond":
		case "milliseconds":
			time = t.getMilliseconds();
			break;

		default:
		case "s":
		case "sec":
		case "second":
		case "seconds":
			time = t.getSeconds();
	} // switch end

	requestAnimationFrame(getTickingTime);
	return time;
}

/* ---------------------------
 *	Return numbers with comma
 * --------------------------- */
 // 181217

const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function commaNumbers(el) {
	$(el).each(function() {
	  var num = parseInt($(this).html());
	  var out = numberWithCommas(num);
	  $(this).html(out);
	});
}

/* ---------------------------------
 *	Return File or Folder from Root
 * --------------------------------- */
 // previously known as fetchFile, fetch_file
 // 190228

 function returnFile(file, manual = 0) {
 	location.hostname == "localhost" || location.hostname.split(".").shift() ==  ( "192" || "172"|| "127" ) ? manual += 1 : null;
 	var array = window.location.pathname.split("/");
 	array.shift();
 	var depth = array.length;
 	var back = "../";
 	return back.repeat(depth - ( manual + 1 )) + file;
 }

function returnFolder() {
	var array = window.location.pathname.split("/");
	var depth = array.length;
	return array[depth - 2];
}

/* ------------
 *	Ajax Form
 * ------------ */
// 190123

function ajaxForm(form, url, appendData, callback) {
  var data = new FormData($(form)[0]);
  appendData !== null ? appendData(data) : null;
  $.ajax({
    url: url,
    type: "post",
    data: data,
    processData: false,
    contentType: false,
    success: function(result) {
      callback(result);
    }
  });
}

/* ----------------------------
 *	Get Data from Location URL
 * ---------------------------- */
// 190424

let locationGet = (param) => {
  let search = location.search.substring(1);
  let get = {};
  search.split("&").map(element => {
    var key = element.split("=")[0];
    var values = element.split("=").slice(1);
    var value = decodeURIComponent(values.join("="));
    get[key] = value;
  });
  return param == undefined ? get : get[param];
}

/* ---------------
 *	CompletedForm
 * --------------- */
// 190319

let completedForm = (form, callback) => {
	let $this = $(form);
	let array = [];
	let total = 0;
	/// initiate
	$this.find("input[name], textarea").each(function(){
		var attr = $(this).attr("name");
		if ( !array.includes(attr) ) {
			array.push(attr);
			total++;
		}
	});

	let count = 0;
	/// check
	$this.find("input[type=text], input[type=number], input[type=email], input[type=password], input[type=hidden],  textarea").each(function() {
		if ( $(this).val().length > 0 ) { count++; }
	});

	$this.find("input[type=radio]:checked").each(function() {
		if ( $(this).length > 0 ) { count++; }
	});

	var name = "";
	$this.find("input[type=checkbox]:checked").each(function() {
		if ( $(this).attr("name") !== name ) {
			count++;
			name = $(this).attr("name");
		}
	});

  $this.find("input[type=file]").each(function() {
		if ( $(this)[0].files[0] !== undefined ) { count++; }
	});

	$this.find("select option:selected").each(function() {
		if ( $(this).val().length > 0 ) { count++; }
	});

  callback !== undefined ? callback(count, total) : null;

	if ( count >= total ) {
		return true;
	} else {
		return false;
	}
}

/* ------------------------
 *	Throttle and Debounce
 * ------------------------ */
/// 190319
/// author: Jhey Tompkins, url: https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf

const debounce = (func, delay) => {
	let inDebounce
	return function() {
		const context = this
		const args = arguments
		clearTimeout(inDebounce)
		inDebounce = setTimeout(() => func.apply(context, args), delay)
	}
}

const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

/**
 *	Camel Case a Sentence
 *	Author: dexter
 *	Source: https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
 */

String.prototype.toCamelCaseSentence = function() {
		return this.replace(/\w\S*/g, function(txt){
			 return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	 });
	}


/// end commons.js
