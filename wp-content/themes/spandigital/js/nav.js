SPANDIGITAL.namespace( 'main.nav' );

SPANDIGITAL.main.nav = (function($) {
	var OBJ_MAIN,
  		OBJ_SECT;

	var $ROOT,
		$BODY,
		$HEADER,
		$CONTENTS,
		$NAV_ON,
		$NAV_OFF,
		$NAV_BTN,
		$HOME_BTN,
		$MODAL;

	var homeURL,
		pageType,
		scrollbarW;
		
	var init = function() {
	    OBJ_MAIN = SPANDIGITAL.main;
  		OBJ_SECT = SPANDIGITAL.main.landing;

	    pageType = OBJ_MAIN.get_pageType();
	    cache_dom();
	    homeURL = $HOME_BTN.attr('href');
	    scrollbarW = getScrollbarWidth();

	    nav_handler.init();
	    nav_modal.init();

	    if (pageType == 'office')
	    {
	    	nav_openings.init();
	    	nav_office_gallery.init();
	    	nav_corporate_initiatives.init();
	    }
	    else if (pageType == 'case-study')
	    {
	    	// nav_openings.init();
	    }
	    else
	    {
	    	$HOME_BTN.on('click', function(e) {
	    		e.preventDefault();
		    	e.stopPropagation();

		    	var delay = (OBJ_MAIN.getM_view()) ? 250 : 500;

		    	$BODY.removeClass('nav-open');
			    $BODY.removeAttr('style');
			    setTimeout(function() {
					$BODY.removeClass('nav-on');
				}, delay);
				// $HEADER.delay(0).animate({
				// 	scrollTop: 0
				// }, 500);

				OBJ_MAIN.anchorAnim(0);
	    	});

	    	$CONTENTS.find('a.start-arrow').on('click', function(e) {
	    		e.preventDefault();
		    	e.stopPropagation();

		    	OBJ_MAIN.anchorAnim(1, "start");
	    	});

	    	nav_capabilities.init();
		    nav_work.init();
		    nav_leadership.init();
		    nav_career.init();
	    }

	    anchorLinkInit();
	};

	var cache_dom = function() {
		$ROOT = $('html, body');
		$BODY = $('body');
		$HEADER = $('#header');
		$CONTENTS = $('#contents');
		$NAV_ON = $('#nav-toggle');
		$NAV_OFF = $('#nav-close');
		$NAV_BTN = $HEADER.find('.navigation a');
		$HOME_BTN = $HEADER.find('.navigation ul.primary-menu li:first-child a');
		$MODAL = $('#modal-layer');
	};

	var getScrollbarWidth = function() {
	    var outer = document.createElement("div");
	    outer.style.visibility = "hidden";
	    outer.style.width = "100px";
	    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

	    document.body.appendChild(outer);

	    var widthNoScroll = outer.offsetWidth;
	    // force scrollbars
	    outer.style.overflow = "scroll";

	    // add innerdiv
	    var inner = document.createElement("div");
	    inner.style.width = "100%";
	    outer.appendChild(inner);        

	    var widthWithScroll = inner.offsetWidth;

	    // remove divs
	    outer.parentNode.removeChild(outer);

	    return widthNoScroll - widthWithScroll;
	};

	var nav_handler = {
		init: function() {
			$NAV_ON.on('click', this.nav_toggle_on.bind(this));
			$NAV_OFF.on('click', this.nav_close_on.bind(this));
			$NAV_BTN.on('click', this.nav_btn_on.bind(this));
		},
		nav_toggle_on: function(e) {
			e.preventDefault();
		    e.stopPropagation();

			if ($BODY.hasClass('nav-open'))
			{

				$BODY.removeClass('nav-open');
				$BODY.removeAttr('style');
				setTimeout(function() {
					$BODY.removeClass('nav-on');
				}, 500);
			}
			else
			{
				$BODY.addClass('nav-on');
				$BODY.addClass('nav-open');
				$BODY.css("paddingRight", scrollbarW + "px");

				if (OBJ_MAIN.getM_view() && $('section#leadership .col').hasClass('on'))
				{
					$('section#leadership .col').removeClass('on');
					$BODY.removeClass('lock-scroll');
				}
			}
		},
		nav_close_on: function(e) {
			e.preventDefault();
		    e.stopPropagation();

			if ($BODY.hasClass('nav-open'))
			{
				$BODY.removeClass('nav-open');
				$BODY.removeAttr('style');
				setTimeout(function() {
					$BODY.removeClass('nav-on');
				}, 500);
			}
		},
		nav_btn_on: function(e) {
		    e.stopPropagation();

		    var delay = (OBJ_MAIN.getM_view()) ? 250 : 500;

		    $BODY.removeClass('nav-open');
		    $BODY.removeAttr('style');
		    setTimeout(function() {
				$BODY.removeClass('nav-on');
			}, delay);
			// $HEADER.delay(0).animate({
			// 	scrollTop: 0
			// }, 500);
		}
	};

	var nav_capabilities = {
		$sect: null,
		$item: null,
		$bar: null,
		$contents: null,
		id: 0,
		init: function() {
			this.$sect = $CONTENTS.find('section#capabilities');
			this.$item = this.$sect.find('ul.nav-items li.nav');
			this.$bar = this.$sect.find('ul.nav-items span.active-bar');
			this.$contents = this.$sect.find('ul.contents li.item');
			var $btn = this.$item.find('a');

			$btn.on('mouseover', this.btn_hover.bind(this));
			$btn.on('mouseout', this.btn_hout.bind(this));
			$btn.on('click', this.btn_clicked.bind(this));

			var that = nav_capabilities;

			that.$item.eq(that.id).addClass('on');
			that.$contents.eq(that.id).addClass('on');

			if(OBJ_MAIN.getM_view())
		    {
		    	var desH = that.$item.eq(that.id).find('.contents').outerHeight() + that.$item.find('a').outerHeight();
			    that.$item.eq(that.id).css('height', desH + 'px');
		    }
		},
		update:function() {
			var that = nav_capabilities;
			var tempID = that.$sect.find('ul.nav-items li.on').index();

			if(that.$contents.is(':visible'))
			{
				that.$item.removeAttr('style');

				if (!tempID) tempID = 0;
		    	that.$item.eq(tempID).addClass('on');
			    that.$bar.stop().css('left', ((20 * tempID) + 10) + '%');
			    that.$contents.removeClass('on');
			    that.$contents.eq(tempID).addClass('on');
			}
			else
			{
				var desH = that.$item.eq(tempID).find('.contents').outerHeight() + that.$item.find('a').outerHeight();
			    that.$item.eq(tempID).css('height', desH + 'px');
			}
		},
		btn_hover: function(e) {
			e.preventDefault();
		    e.stopPropagation();

		    var curId = $(e.currentTarget).parent().index(),
		    	that = nav_capabilities;

		    that.$bar.stop().css('left', ((20 * curId) + 10) + '%');
		},
		btn_hout: function(e) {
			e.preventDefault();
		    e.stopPropagation();

		    var that = nav_capabilities;

		    that.$bar.stop().css('left', ((20 * that.id) + 10) + '%');
		},
		btn_clicked: function(e) {
			e.preventDefault();
		    e.stopPropagation();

		    var curId = $(e.currentTarget).parent().index(),
		    	that = nav_capabilities;

		    that.id = curId;

		    if(that.$contents.is(':visible'))
		    {
		    	that.$item.removeClass('on');
		    	that.$item.eq(curId).addClass('on');

			    that.$bar.stop().css('left', ((20 * curId) + 10) + '%');
			    that.$contents.removeClass('on');
			    that.$contents.eq(that.id).addClass('on');

			    OBJ_MAIN.posTopUpdate();
		    }
		    else
		    {
			    if (that.$item.eq(curId).hasClass('on'))
		    	{
		    		that.$item.removeClass('on');
		    		that.$item.removeAttr('style');
		    	}
		    	else
		    	{
		    		that.$item.removeClass('on');
		    		that.$item.eq(curId).addClass('on');

		    		that.$item.removeAttr('style');
				    var desH = that.$item.eq(curId).find('.contents').outerHeight() + that.$item.find('a').outerHeight();
				    that.$item.eq(curId).css('height', desH + 'px');
		    	}
		    	
		    	setTimeout(function() {
		    		OBJ_MAIN.posTopUpdate();

		    		$ROOT.animate({
				        scrollTop: (that.$item.eq(curId).offset().top - 60) + 'px'
				    }, 250, 'easeInOutCubic');
		    	}, 510);
		    }
		}
	};

	var nav_work = {
		$sect: null,
		$item: null,
		$content: null,
		init: function() {
			this.$sect = $CONTENTS.find('section#work');
			this.$item = this.$sect.find('ul.logos li.logo');
			this.$content = this.$sect.find('ul.contents li.item');
			var $logo = this.$item.find('a');

			$logo.on('mouseover', this.logo_hover.bind(this));
			this.$content.removeClass('on');
		},
		logo_hover: function(e) {
			e.preventDefault();
		    e.stopPropagation();

		    var curId = $(e.currentTarget).parent().index(),
		    	that = nav_work;

		    that.$content.removeClass('on');
		    that.$content.eq(curId).addClass('on');
		}
	};

	var nav_leadership = {
		$sect: null,
		$item: null,
		$close_btn: null,
		init: function() {
			this.$sect = $CONTENTS.find('section#leadership');
			this.$item = this.$sect.find('.col');
			this.$close_btn = this.$item.find('.bio-box a.close-btn');
			var $btn = this.$item.find('a.bio-btn');

			$btn.on('click', this.btn_clicked.bind(this));
			this.$close_btn.on('click', this.closebtn_clicked.bind(this));
			this.$item.removeClass('on');
		},
		btn_clicked: function(e) {
			e.preventDefault();
		    e.stopPropagation();

		    var curId = $(e.currentTarget).parent().index(),
		    	that = nav_leadership;

		    if(OBJ_MAIN.getM_view()) $BODY.addClass('lock-scroll');
		    that.$item.removeClass('on');
		    that.$item.eq(curId).addClass('on');
		},
		closebtn_clicked: function(e) {
			e.preventDefault();
		    e.stopPropagation();

		    var this_item = $(e.currentTarget).parent().parent();
		    this_item.removeClass('on');
		    if(OBJ_MAIN.getM_view()) $BODY.removeClass('lock-scroll');
		}
	};

	var nav_career = {
		$sect: null,
		init: function() {
			this.$sect = $CONTENTS.find('section#careers');
			var $job_opening = this.$sect.find('a.job-opening-btn');

			$job_opening.on('click', this.job_opening_clicked.bind(this));
		},
		job_opening_clicked: function(e) {
			e.preventDefault();
		    e.stopPropagation();

		    var url = homeURL + e.target.getAttribute("href");
		    console.log(url);
		    window.open(url, '_self', false);
		}
	};

	var nav_openings = {
		$box: null,
		$modal_content: null,
		init: function() {
			this.$box = $CONTENTS.find('section#openings .box');
			// this.$jobs_modal = $CONTENTS.find('section#openings #jobs-modal');
			this.$modal_content = $MODAL.find('.jobs-content');

			var $btn = this.$box.find('.job-nav a');
			var $jobs_item = this.$box.find('ul li a');

			this.$box.addClass('jobs-sf');

			$btn.on('click', this.btn_clicked.bind(this));
			$jobs_item.on('click', this.job_item_clicked.bind(this));
		},
		btn_clicked: function(e) {
			e.preventDefault();
		    e.stopPropagation();

		    var my_id = $(e.currentTarget).index();

		    if (my_id > 0)
		    {
		    	nav_openings.$box.addClass('jobs-cpt');
		    	nav_openings.$box.removeClass('jobs-sf');
		    }
		    else
		    {
		    	nav_openings.$box.addClass('jobs-sf');
		    	nav_openings.$box.removeClass('jobs-cpt');
		    }
		},
		job_item_clicked: function(e) {
			e.preventDefault();
		    e.stopPropagation();

		    var job_data = $(e.currentTarget).attr('href'),
		    	job_id = job_data.substring(job_data.indexOf('#')+1);
		    	
		    nav_modal.on("jobs");

		    $.ajax({
		        url:job_data,
		        type: 'POST',
		        data: {postID: job_id},//'<?=$post->ID;?>', galleryCategory: $(this).attr("data-content")},
		        success: function(resp) {
		        	nav_modal.$container.removeClass('preload');
		            nav_openings.$modal_content.html(resp);

		            nav_openings.$modal_content.find('a').on('click', function(e) {
						e.preventDefault();
				    	e.stopPropagation();

				    	var url = e.target.getAttribute("href");
				    	
						nav_modal.off();
						window.open(url, '_blank');
						nav_openings.$modal_content.find('a').off('click');
					});
		        }
		    });
		},
		
	};

	var nav_office_gallery = {
		$container: null,
		init: function() {
			this.$container = $('#office-gallery .container');
			this.gallery_on();
		},
		gallery_on: function() {
			this.$container.slick({
		        dots: true,
				infinite: true,
				speed: 300,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true
		    });
		},
		gallery_off: function() {
			this.$container.slick('unslick');
		}
	};
	
	var nav_corporate_initiatives = {
		$container: null,
		init: function() {
			this.$container = $('#corporate-initiatives .container');
			this.corporate_on();
		},
		corporate_on: function() {
			this.$container.slick({
		        dots: true,
				infinite: true,
				speed: 300,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true
		    });
		},
		corporate_off: function() {
			this.$container.slick('unslick');
		}
	};

	var nav_modal = {
		$container: null,
		init: function() {
			this.$container = $MODAL.find('.container');
			var $close_btn = $MODAL.find('.close-btn');
			$close_btn.on('click', this.close_clicked.bind(this));
		},
		on: function(type) {
			$MODAL.addClass(type);
			$BODY.addClass('lock-scroll');
			$MODAL.addClass('on');
		},
		off: function() {
			$MODAL.removeClass('on');
			$BODY.removeClass('lock-scroll');
			setTimeout(function() {
				$MODAL.removeClass();
				nav_modal.$container.html("");
				nav_modal.$container.addClass('preload');
			}, 500);
		},
		close_clicked: function(e) {
			e.preventDefault();
		    e.stopPropagation();
		    
		    nav_modal.off();
		}
	};

	var anchorLinkInit = function() {
		$('a[href*="#"]:not([href="#"])').on("click", function(e) {
			e.preventDefault();
			e.stopPropagation();

			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
			{
		    	var target = $(this.hash);//,
		    		// anchorName = $(this).attr('href').split('#')[1];
		    	// target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		    	if (target.length && pageType == 'home') OBJ_MAIN.anchorAnim(target.index());//, target.selector);
		    	if (pageType !== 'home') window.open(homeURL + "?dlink=" + this.hash.slice(1), '_self', false);
		    }
		});
	};

	return {
		init: init,
		capabilities_update: nav_capabilities.update
	};
})(jQuery);