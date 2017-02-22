SPANDIGITAL.namespace( 'main' );

SPANDIGITAL.main = (function($) {
	var OBJ_NAV,
  		OBJ_SECT;

	var $WIN,
		$ROOT,
		$HTML,
		$BODY,
		$HEADER,
		$MASTHEAD,
		$CONTENTS,
		$SECT,
		$HERO;

	var pageType = "home";
		
	var init = function() {
	    cache_dom();
	    var dl_name = getUrlVars()["dlink"];
	    
	    OBJ_NAV = SPANDIGITAL.main.nav;
  		OBJ_SECT = SPANDIGITAL.main.landing;
	    // if (!dl_name) $HTML.addClass('noResize');
		$HTML.addClass('noTouch');
		if ($CONTENTS.hasClass('office')) pageType = "office";
		if (!$CONTENTS.hasClass('home') && !$CONTENTS.hasClass('office')) pageType = "case-study";

		OBJ_SECT.init();

		user_agent.init();
		w_resize.init();
		p_main.init();

		if (pageType == "home")
		{
			p_sect.init();

			$ROOT.animate({ scrollTop: 0 }, 0);

			setTimeout(function() {
				p_sect.setPosTop();
				if (dl_name) dl_init(dl_name);
			}, 10);
		}
		else
		{
			var hash_name = window.location.hash;

			setTimeout(function() {
				$ROOT.animate({ scrollTop: 0 }, 0);

				if (hash_name)
				{
					var navOffSet = (w_resize.m_view) ? 48 : 78;

					$ROOT.animate({
						scrollTop: ($CONTENTS.find('section' + hash_name).offset().top - navOffSet) + 'px'
					}, 750, 'easeInOutCubic');
				}
			}, 10);
		}

		w_scroll.init();
		OBJ_NAV.init();

		// if (dl_name) setTimeout(function() { $HTML.addClass('noResize'); }, 1000);
		setTimeout(function() { $HTML.addClass('noResize'); }, 1000);
	};

	var getUrlVars = function() {
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}

	var dl_init = function(anchor) {
		$SECT.each(function(i) {
			if (anchor == $(this).attr('id'))
			{
				p_sect.anchorAnim(i, "dlink");
				return false;
			}
		});
	};

	var getRandomNum = function(min, max) {
	    return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
	}

	//cache_dom: cache DOM elements for optimization
	var cache_dom = function() {
		$WIN = $(window);
		$ROOT = $('html, body');
		$HTML = $('html');
		$BODY = $('body');
		$HEADER = $('#header');
		$MASTHEAD = $HEADER.find('.masthead');
		$CONTENTS = $('#contents');
		$SECT = $CONTENTS.find('section');
		$HERO = $CONTENTS.find('.hero');
	};

	//user_agent: check for touch device and iOS detection
	var user_agent = {
		isTouch: false,
		init: function() {
			if (this.is_touch_device()) {
				this.isTouch = true;
				$HTML.removeClass('noTouch');
				document.addEventListener("touchstart", function(){}, true); 
			}
		},
		is_touch_device: function () {
  			return 'ontouchstart' in window    // works on most browsers 
			|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
		}
	};

	//w_resize: window resize stops css animation and resets on callback, reposition to top anchor upon resize
	var w_resize = {
		width: 0,
		height: 0,
		m_view: false,
		time: null,
		timeout: false,
		delta: 200,
		init: function() {
			w_resize.width = $WIN.width();
			w_resize.height = $WIN.height();

			if ($MASTHEAD.height() < 70 ) w_resize.m_view = true;
	    	else w_resize.m_view = false;
			
			if (!user_agent.isTouch) $WIN.on('resize', this.start.bind(this));
			else $WIN.on('orientationchange', this.start.bind(this));
		},
		start: function() {
			this.time = new Date();
		    if (w_resize.timeout === false) {
		        w_resize.timeout = true;
		        $HTML.removeClass('noResize');
		        setTimeout(w_resize.end, w_resize.delta);
		    }
		},
		end: function() {
		    if (new Date() - w_resize.time < w_resize.delta) {
		        setTimeout(w_resize.end, w_resize.delta);
		    } else {
		        w_resize.timeout = false;
		        $HTML.addClass('noResize');
		        
		        if ($MASTHEAD.height() < 70 ) w_resize.m_view = true;
	    		else w_resize.m_view = false;

		    	w_resize.width = $WIN.width();
				w_resize.height = $WIN.height();

				p_main.hero_set();
		        p_sect.setPosTop();
		        p_sect.anchorAnim();

		        if (pageType == "home") OBJ_NAV.capabilities_update();
		    }
		}
	};

	//w_scroll: window scroll callback for sticky nav with iOS support
	var w_scroll = {
		lastScrollTop: 0,
		st: 0,
		hash: false,
		init: function() {
			$WIN.on('scroll', this.start.bind(this));
		},
		start: function() {
			this.st = $WIN.scrollTop();
		 	
		 	if (this.st > this.lastScrollTop)
			{				
				if (this.st >= p_main.navH && !$BODY.hasClass('sticky-init')) $BODY.addClass('sticky-init');
				if (this.st > (p_main.heroH - p_main.navH) && !$HEADER.hasClass('sticky-nav')) $HEADER.addClass('sticky-nav');
				if (pageType == "home") p_sect.setPosId(this.st, 'down');
		    }
		    else
		    {
		    	if (this.st < p_main.navH && $BODY.hasClass('sticky-init')) $BODY.removeClass('sticky-init');
		    	if (this.st < (p_main.heroH - p_main.navH) && $HEADER.hasClass('sticky-nav')) $HEADER.removeClass('sticky-nav');
		    	if (pageType == "home") p_sect.setPosId(this.st, 'up');

		    	// console.log("scroll:"+(p_main.heroH - p_main.navH));
		    }
			
		    this.lastScrollTop = this.st;
		    // console.log(this.st);
		}
	};

	//p_main: main page indexing and custom triggers
	var p_main = {
		heroH: 0,
		navH: 0,
		init: function() {
			this.hero_set();
			if (pageType == "home") this.landingAnim();
		},
		hero_set: function() {
			if (pageType == "home")
			{
				this.heroH = $HERO.outerHeight();
				this.navH = $MASTHEAD.height();
			}
			else
			{
				// this.heroH = 41;
				this.navH = 21;
				this.heroH = $HERO.outerHeight() + 41;
			}

			// console.log("heroH:" + this.heroH);
		},
		landingAnim: function() {
			var randNum = getRandomNum(0, 10);
			console.log("hero option: "+ randNum);

			if (randNum < 1)
			{
				$HERO.find('.canvas').addClass('shimmer-anim');
			}
			else if (randNum >= 1 && randNum < 4)
			{
				$HERO.find('.canvas').addClass('line-anim');
				p_main.particle_lines();
			}
			else if (randNum >= 4 && randNum < 7)
			{
				$HERO.find('.canvas').addClass('circle-anim');
				p_main.particle_circles();
			}
			else
			{
				$HERO.find('.canvas').addClass('network-anim');
				p_main.particle_network();
			}
			// else
			// {
			// 	p_main.particle_node();
			// }
		},
		particle_lines: function() {
			$.each($HERO.find(".canvas"), function() {
				var $THIS = $(this),
					vertical_length = ($THIS.height() / 50) * 10;
				
				for (var i = 0; i <= vertical_length; i ++)
				{
					$THIS.append('<span class="particle" style="top:' + getRandomNum(-30, 30) + '%; left:' + getRandomNum(-10, 110) + '%; width:' + getRandomNum(1,5) + 'px; height:' + getRandomNum(20,80) + '%; animation-delay: -' + (getRandomNum(0,30)/10) + 's;"></span>');
				}
			});
		},
		particle_circles: function() {
			$.each($HERO.find(".canvas"), function() {
				var $THIS = $(this),
					firecount = ($THIS.width() / 50) * 20;

				for (var i = 0; i <= firecount; i ++)
				{
					var size = getRandomNum(4, 100);//getRandomNum(8, 12);
					$THIS.append('<span class="particle" style="top:' + getRandomNum(-10,100) + '%; left:' + getRandomNum(-10,100) + '%; width:' + size + 'px; height:' + size + 'px; animation-delay: ' + (getRandomNum(0,50)/10)/*(getRandomNum(0,20)/10)*/ + 's;"></span>');
				}
			});
		},
		particle_network: function() {
			var canvasDiv = document.getElementById('canvas');
			var options = {
				particleColor: '#fff',
				background: 'wp-content/themes/spandigital/images/hero-gradient.png',
				interactive: false,
				speed: 'fast',
				density: 'high'
			};
			var particleCanvas = new ParticleNetwork(canvasDiv, options);
		}
	}

	//p_sect: sections top y position, section id, animate to section top anchors
	var p_sect = {
		id: null,
		posTop: null,
		duration: 100,
		velocity: 1,
		init: function() {
			this.id = 0;
			this.setPosTop();
			this.anchorAnim();
		},
		setPosTop: function() {
			var navOffSet = p_main.navH;
			p_sect.posTop = [];

			if (w_resize.m_view && navOffSet >= 50) navOffSet = 48;
			if (!w_resize.m_view && navOffSet >= 80) navOffSet = 78;

			$SECT.each(function(i) {
				var yPos = $(this).position().top - navOffSet;
				if (yPos < 0) { yPos = 0; }
				if (i == 1) { yPos = yPos + 2; }
				p_sect.posTop.push(Math.floor(yPos));
			});
			
			// console.log(p_sect.posTop);
		},
		setPosId: function(y, dir) {
			if (this.id != null)
			{
				if (dir == "down")
				{
					if (y >= this.posTop[this.id + 1] && this.id < (this.posTop.length-1)) this.id += 1;
				}
				else
				{
					if (y < this.posTop[this.id] && this.id > 0) this.id -= 1;
				}
			}
		},
		anchorAnim: function(i, opt) {
			// console.log("anchor to " + i);
			var delay = (w_resize.m_view) ? 100 : 200;//400;

			if (opt == "start") delay = 0;

			if (i == undefined)
			{
				i = this.id;
				// this.duration = 100;
				this.duration = 50;
				delay = 0;
			}
			else
			{
				this.velocity = Math.abs(this.id - i);
				if (this.velocity <= 0) this.velocity = 1;
				// this.duration = (this.velocity > 2) ? 250 * this.velocity : 500 * this.velocity;
				
				if (this.velocity > 2) this.duration = 250 * this.velocity;
				else if (this.velocity == 2) this.duration = 1000;
				else this.duration = 750;

				this.id = i;
			}

		    $ROOT.delay(delay).animate({
		        scrollTop: this.posTop[i]
		    }, this.duration, 'easeInOutCubic', function() {
		    	if (opt == "dlink")
		    	{
		    		if (window.history.pushState) {
					    // window.history.pushState('', '/', window.location.pathname)
					    history.pushState(null, "", location.href.split("?")[0]);
					} else {
					    window.location.href = window.location.href.split('?')[0];
					}
		    	}
		    });
		}	
	};

	return {
		init: init,
		get_pageType: function() { return pageType; },
		getM_view: function() { return w_resize.m_view; },
		posTopUpdate: function() { p_sect.setPosTop(); },
		anchorAnim: function(i, h) { p_sect.anchorAnim(i, h); }
	};
})(jQuery);
