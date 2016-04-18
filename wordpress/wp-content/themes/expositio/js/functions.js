/**
 * Theme functions file
 *
 * Contains handlers for navigation, accessibility, header sizing
 * footer widgets and Featured Content slider
 *
 */
var _tablet_width = 950;
var _window = jQuery(window);
var _document = jQuery(document);
var _body = jQuery('body');

function fullHeight(el) {
	return el.height() + parseInt(el.css('padding-top')) + parseInt(el.css('padding-bottom'))
		+ parseInt(el.css('border-top-width')) + parseInt(el.css('border-bottom-width'));
}

function fixLinks(items) {
	items.each(function() {
		var item = jQuery(this);
		var img = item.find('img');
		if (img.length === 1) {
			item.addClass('image_link');
		}
	});
}

(function($) {
	// Footer hacks
	var fixed = {
		header: false,
		helper: false,
		footer: false,
		page: false,
		init: function() {
			this.header = $('#masthead');
			this.helper = $('#header-helper');
			this.footer = $('#colophon');
			if (this.header.length == 1 && this.footer.length == 1) {
				this.page = $('#page');
				_window.on('ready load resize', fixed.process);
				_window.on('scroll', fixed.updateScroll);
			}
		},
		process: function() {
			if (_window.width() > _tablet_width) {
				var single = $('body.single .site-main .content-area .hentry');
				if (single.length == 0) {
					single = $('body.page .site-main .main-content .hentry');
				}
				if (single.length == 1) {
					var article_height = fullHeight(single);
					if (article_height > fixed.header.height()) {
						fixed.header.height(article_height);
					}
				}

				var header_content_height = $('.site-title').height()
					+ fullHeight($('#primary-navigation')) + fullHeight(fixed.footer);
				if (fixed.header.height() < header_content_height) {
					fixed.header.height(header_content_height);
				}
				if (fullHeight(fixed.header) < _body.height()) {
					fixed.header.removeAttr('style');
				}

				// forces vertical scrollbar on horizontal page, but doesn't mess up gallery
				fixed.helper.height(fullHeight(fixed.header));

				fixed.page.css('padding-bottom', '');
			} else {
				fixed.page.css('padding-bottom', fullHeight(fixed.footer));
			}
		},
		updateScroll: function() {
			// header is fixed so this scrolls it vertically
			var header_top = ($('#wpadminbar').length != 0 ? $('#wpadminbar').height() : 0)
				- _window.scrollTop();
			fixed.header.css('top', header_top);
		}
	};
	fixed.init();

	// index gallery
	var index = {
		el: false,
		images: [],
		count: 0,
		first_image: false,
		init: function() {
			this.el = $('body.home .main-content');
			if (this.el.length == 1) {
				this.update();
				if (this.count != 0) {
					this.first_image = $(this.images[0]);
					_window.on('ready load resize', index.process);
				}
			}
		},
		update: function() {
			index.images = index.el.find('img');
			index.count = index.images.length;
		},
		process: function() {
			var height = index.first_image.height();
			var padding = parseInt(index.first_image.parents('.post').css('padding-right'));
			index.images.each(function() {
				var image = $(this);
				if (_window.width() > _tablet_width) {
					var ratio = image.attr('width') / image.attr('height');
					var width = Math.round(height * ratio);
					image.css('width', width + 'px');
					image.parents('.post').css('width', width + padding + 'px');
				}
			});
		}
	};
	index.init();

	// single page gallery
	var gallery = {
		duration: 300,
		el: false,
		images: [],
		count: 0,
		first_image: false,
		init: function() {
			this.el = $('.gallery-animated');
			if (this.el.length == 1) {
				this.update();
				if (this.count != 0) {
					this.first_image = $(this.images[0]);
					_window.on('ready load resize', gallery.process);
				}
			}
		},
		update: function() {
			gallery.images = gallery.el.find('img');
			gallery.count = gallery.images.length;
		},
		process: function() {
			var height = gallery.first_image.height();
			var padding = parseInt(gallery.first_image.parent().css('padding-right'));
			gallery.images.each(function() {
				var image = $(this);
				image.off('click');
				if (_window.width() > _tablet_width) {
					var ratio = image.attr('width') / image.attr('height');
					var width = Math.round(height * ratio);
					image.css('width', width + 'px');
					image.parent().css('width', width + padding + 'px');
					image.on('click', function(event) {
						event.preventDefault();
						gallery.move(image);
					});
				}
			});
		},
		move: function(image) {
			var scroll = _window.scrollLeft();
			var window_width = _window.width();
			var offset = gallery.offset(image, window_width);
			var index = image.parent().index();
			if (offset == scroll) { // current image clicked
				if (index != gallery.count - 1) { // not last image clicked
					offset = gallery.offset($(gallery.images[index + 1]), window_width);
				} else {
					offset = gallery.offset(gallery.first_image, window_width);
				}
			}
			if (offset != scroll) {
				$('html, body').stop().animate({ scrollLeft: offset }, gallery.duration);
			}
		},
		offset: function(image, window_width) {
			var offset = image.offset().left;
			var width = image.width();
			if (width < window_width) {
				offset -= Math.round((window_width - width) / 2);
			}
			return offset;
		}
	};
	gallery.init();

	// Infinite loading for index page
	var loading = {
		start_from: 500,
		el: false,
		nav: false,
		loader: false,
		enabled: true,
		ajax: false,
		init: function() {
			this.el = $('.paging-navigation a');
			if (this.el.length == 1) {
				this.nav = this.el.parent();
				this.loader = $('#infinite-loader');
				_window.on('ready load resize scroll.loading', loading.process);
			}
		},
		process: function() {
			if (loading.enabled && !loading.ajax) {
				var ajax = false;
				if (_window.width() > _tablet_width) {
					if (_window.scrollLeft() > _document.width() - _window.width() - loading.start_from) {
						ajax = true;
					}
				}
				else {
					if (_window.scrollTop() > _document.height() - _window.height() - loading.start_from) {
						ajax = true;
					}
				}
				if (ajax) {
					loading.loader.addClass('active');
					loading.ajax = true;
					$.ajax({
						type: 'GET',
						url: loading.el.attr('href'),
						dataType: 'html',
						success: function(response) {
							var html = $(response);
							var next_link = html.find('.paging-navigation a');
							var items = html.find('#main-content .hentry');
							items.each(function() {
								$(this).insertBefore(loading.nav);
							});
							index.update();
							index.process();
							if (next_link.length == 1) {
								loading.el.attr('href', next_link.attr('href'));
								loading.ajax = false;
							}
							else {
								_window.off('scroll.loading');
							}
							loading.loader.removeClass('active');
						}
					});
				}
			}
		}
	};
	loading.init();

	// load animations
	var load_effect = {
		duration: 300,
		menu_duration: 100,
		els: [],
		loader: $('#infinite-loader'),
		init: function() {
			var els = $('.nav-menu li');
			if (els.length != 0) {
				els.each(function() {
					load_effect.els.push($(this));
				});
			}
			$('a').on('click', function(e) {
				e.preventDefault();
				var _this = $(this);
				// close mobile menu if it's open, redirect otherwise
				if (_body.hasClass('toggled-on') && _this.parents('#page').length == 1
					&& _this.parents('#primary-navigation').length == 0
				) {
					load_effect.menuOff();
				} else {
					load_effect.loader.show();
					var href = $(this).attr('href');
					$('.site').css('opacity', 0);
					setTimeout(function() {
						window.location = href;
					}, load_effect.duration);
				}
			});
			_window.on('ready pageshow', function() {
				load_effect.loader.show();
				$('.site').css('opacity', 1);
				setTimeout(function() {
					load_effect.loader.hide();
					if (load_effect.els.length != 0) {
						load_effect.process();
					}
				}, load_effect.duration);
			});
		},
		process: function() {
			$(load_effect.els[0]).animate(
				{ opacity: 1 },
				load_effect.menu_duration,
				function() {
					load_effect.els.shift();
					if (load_effect.els.length != 0) {
						load_effect.process();
					}
				}
			);
		},
		menuOn: function() {
			loading.enabled = false;
			$('#wrapper').addClass('overflow_fix');
			_body.addClass('toggled-on');
		},
		menuOff: function() {
			_body.removeClass('toggled-on');
			setTimeout(function() {
				$('#wrapper').removeClass('overflow_fix');
			}, load_effect.duration);
			loading.enabled = true;
		}
	};
	load_effect.init();

	fixLinks($('.entry-content a, .entry-summary a'));

	// Enable menu toggle for small screens.
	(function() {
		var nav = $('#primary-navigation');
		if (!nav) {
			return;
		}

		var button = $('.menu-toggle');
		if (!button) {
			return;
		}

		// Hide button if menu is missing or empty.
		var menu = nav.find('.nav-menu');
		if (!menu || !menu.children().length) {
			button.addClass('hidden');
			return;
		}

		$('.menu-toggle').on('click', function(e) {
			e.stopPropagation();
			load_effect.menuOn();
		});

		$('#navigation-close').on('click', function() {
			load_effect.menuOff();
		});

		$('#primary-navigation').on('click', function(event) {
			event.stopPropagation();
		});

		$('#page').on('click', function() {
			if (_body.hasClass('toggled-on')) {
				load_effect.menuOff();
			}
		});
	})();
})(jQuery);
