/* =========================================================
*	PreloaderPro 1.0
*	Author: Alexander Bech / www.alexanderbech.com
*	http://github.com/AlexanderBech/PreloaderPro.js
* ========================================================== */
(function ($){
	var _default = {
		loadBar: null, // Preloader to animate
		callBack: '' // Callback when all images are loaded
	};
	$.fn.preloaderPro = function(options){
  		var _opts = $.extend({}, _default, options),
  			$container = this;
  		// Script options
		_opts.preloader = '';
		_opts.items = new Array();
		_opts.doneStatus = 0;
		_opts.doneNow = 0;
		_opts.selectorPreload = "body";
		_opts.ieLoadFixTime = 2000;
		_opts.ieTimeout = '';
		_opts.containerHtml = '';

  		function init(){
			if(navigator.userAgent.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/) == "MSIE 6.0,6.0"){
				// Stop if IE6
				return false;
			}

			_opts.containerHtml = $container.html(); // Save html
			getImages($container); // Get images in html
			$container.html(''); // Remove html
			createPreloading(); // Preload
			
			// IE fix
			_opts.ieTimeout = setTimeout(function(){
				var ie = navigator.userAgent.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/);
				if(ie[0].match("MSIE")){
					while ((100 / _opts.doneStatus) * _opts.doneNow < 100) {
						imgCallback();
					}
				}
			}, _opts.ieLoadFixTime);
		}

		init();
		
		function imgCallback(){
			_opts.doneNow ++;
			animateLoader();
		}
		
		function getImages(selector){
			_opts.items = new Array();
			var everything = $(selector).find("*:not(script)").each(function() {
				var url = "";
				
				if ($(this).css("background-image") != "none" && $(this).css("background-image").indexOf('url(') !== -1){
					var url = $(this).css("background-image");
				} else if (typeof($(this).attr("src")) != "undefined" && $(this).prop('tagName').toLowerCase() == "img") {
					var url = $(this).attr("src");
				}
				
				url = url.replace("url(\"", "");
				url = url.replace("url(", "");
				url = url.replace("\")", "");
				url = url.replace(")", "");
				
				if (url.length > 0) {
					_opts.items.push(url);
				}
			});
		}
		
		function createPreloading(){

			// Preload container
			_opts.preloader = $("<div></div>").appendTo(_opts.selectorPreload);
			$(_opts.preloader).css({
				height: 	"0px",
				width:		"0px",
				overflow:	"hidden"
			});
			
			var length = _opts.items.length;
			_opts.doneStatus = length;

			if(length == 0){
				// If no images - done
				doneLoad();
				return false;
			}

			// Show preloader
			$(_opts.loadBar).css({'width':'0'}).show();
			
			for (var i = 0; i < length; i++) {
				var imgLoad = $("<img></img>");
				$(imgLoad).unbind("load");
				$(imgLoad).bind("load", function() {
					imgCallback();
				});
				$(imgLoad).attr("src", _opts.items[i]);
				$(imgLoad).appendTo($(_opts.preloader));
			}
		}
		
		function animateLoader(){
			var perc = (100 / _opts.doneStatus) * _opts.doneNow,
				cPerc = $(_opts.loadBar).data('percent') || 0;

			// Only update bar with higher value
			if(perc < cPerc){
				return false;
			}

			// Update with previous percentage and new percentage as maximum
			$(_opts.loadBar).css({ 'width': cPerc+'%', 'max-width': perc+'%' });

			// Update current percentage
			$(_opts.loadBar).data('percent', perc);

			// Done?
			if(perc > 99){
				doneLoad();
			}

			// Animate bar
			$(_opts.loadBar).stop().animate({
				width: perc + "%"
			}, 500, "linear");
		}
		
		function doneLoad(){
			//prevent IE from calling the fix
			clearTimeout(_opts.ieTimeout);

			// Insert html again
			$container.html(_opts.containerHtml);

			// Hide preloader
			$(_opts.loadBar).delay(500).slideUp(300);

			// Hide preload container
			$(_opts.preloader).remove();

			// Callback
			_opts.callBack();
		}

  	};
})(jQuery);