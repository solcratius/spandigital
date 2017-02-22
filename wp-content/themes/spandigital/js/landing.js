SPANDIGITAL.namespace( 'main.landing' );

SPANDIGITAL.main.landing = (function($) {
	var OBJ_MAIN,
  		OBJ_NAV,
  		OBJ_RDATA;

	var $WIN,
		$ROOT,
		$BODY,
		$CONTENT,
		$HERO,
		$CONTENT_BODY,
		$CONTENT_SECT,
		$SECT_MEDIA;
		
	var init = function() {
	    cacheDom();
	    OBJ_MAIN = SPANDIGITAL.main;
  		OBJ_NAV = SPANDIGITAL.main.nav;
	    
	    console.log("LANDING!!!!");
	};

	var handler = function(id) {
	    if (id >= 100) homePage_handler.init();

	    photoBtn_handler.init();
	};

	var cacheDom = function() {
		$WIN = $(window);
		$ROOT = $('html, body');
		$BODY = $('body');
		$CONTENT = $('#content');
		$HERO = $CONTENT.find('.hero');
		$CONTENT_BODY = $CONTENT.find('.content-body');
		$CONTENT_SECT = $CONTENT_BODY.find('.section');
		$SECT_MEDIA = $CONTENT_BODY.find('.section.media');
	};

	var homePage_handler = {
		$HOME_START_BTN: null,

		init: function() {
			this.$HOME_START_BTN = $HERO.find('a.home-start-btn');
			this.$HOME_START_BTN.on('click', this.home_start_on.bind(this));
		},

		home_start_on: function(e) {
		    e.stopPropagation();
		    e.preventDefault();

		    OBJ_MAIN.anchorAnim(1);
		}
	};
	
	var photoBtn_handler = {
		$PHOTO_BTN: null,

		init: function() {
			this.$PHOTO_BTN = $CONTENT_SECT.find('a.photo-btn');
			this.$PHOTO_BTN.on('click', this.photo_btn_on.bind(this));
		},

		photo_btn_on: function(e) {
			e.stopPropagation();
		    e.preventDefault();

		    var $THIS = $(e.currentTarget),
		    	postParam,
		    	_gallery = false;

		    postParam = OBJ_MAIN.getUrl_Param($THIS.attr('href'));

		    if (postParam['post-type'] == "gallery" && postParam['amount'] > 1) _gallery = true;
		    modal_layer.show(postParam, photoBtn_handler.photo_callback, _gallery);
		},

		photo_callback: function() {
			console.log("cb - photoBtn");
		}
	};

	var modal_layer = {
		$MODAL: null,
		$MODAL_CLOSE_BTN: null,
		$MODAL_GRID_BTN: null,
		$MODAL_SLIDE_BTN: null,
		$MODAL_P_ITEM_BTN: null,
		$MODAL_PHOTO: null,
		$MODAL_CONTAINER: null,
		$MODAL_UL: null,
		$MODAL_TITLE: null,

		cbHolder: null,
		curP: null,
		totalP: null,

		init: function (_gallery) {
			this.$MODAL = $('#modal-layer');
			this.$MODAL_CLOSE_BTN = this.$MODAL.find('.close-btn');
			this.$MODAL_CONTAINER = this.$MODAL.find('#container');
			this.$MODAL_PHOTO = this.$MODAL_CONTAINER.find('.photo-container');
			this.$MODAL_TITLE = this.$MODAL_CONTAINER.find('.title');

			if (_gallery) {
				this.$MODAL_GRID_BTN = this.$MODAL_CONTAINER.find('.grid-btn');
				this.$MODAL_SLIDE_BTN = this.$MODAL_CONTAINER.find('.slide-btn');
				this.$MODAL_UL = this.$MODAL_CONTAINER.find('ul');

				this.$MODAL_GRID_BTN.on('click', this.grid_view_on.bind(this));
				this.$MODAL_SLIDE_BTN.on('click', this.slide_btn_on.bind(this));
			}

			this.$MODAL_CLOSE_BTN.on('click', this.hide.bind(this));
		},

		show: function(data, cb, _gallery) {
			this.init(_gallery);
			if (cb) this.cbHolder = cb;

			if (_gallery) this.$MODAL_CONTAINER.addClass('gallery-module');
			else this.$MODAL_CONTAINER.removeClass('gallery-module');
			console.log("data: "+data['title']);
			if (data['title']) this.set_title(data);

			if (data['post-type'] == "gallery") this.set_gallery(data);
			else  this.set_photo(data);

			this.$MODAL.fadeIn(250, 'easeInOutCubic');
			$BODY.addClass('lock-scroll');
		},

		hide: function(e) {
			e.stopPropagation();
		    e.preventDefault();

		    if (modal_layer.cbHolder != null) modal_layer.cbHolder();
		    $BODY.removeClass('lock-scroll');
		    modal_layer.$MODAL_CONTAINER.removeClass();
		    modal_layer.$MODAL_TITLE.html('');

			modal_layer.$MODAL.fadeOut(250, 'easeInOutCubic', function() {
				if (modal_layer.$MODAL_CLOSE_BTN) modal_layer.$MODAL_CLOSE_BTN.off();
				if (modal_layer.$MODAL_GRID_BTN) modal_layer.$MODAL_GRID_BTN.off();
				if (modal_layer.$MODAL_SLIDE_BTN) modal_layer.$MODAL_SLIDE_BTN.off();
				modal_layer.$MODAL = null;
				modal_layer.$MODAL_CLOSE_BTN = null;
				modal_layer.$MODAL_GRID_BTN = null;
				modal_layer.$MODAL_SLIDE_BTN = null;
				modal_layer.$MODAL_CONTAINER = null;
				modal_layer.$MODAL_TITLE = null;
				modal_layer.cbHolder = null;
				modal_layer.totalP = null;

				modal_layer.$MODAL_P_ITEM_BTN = null;
			});
		},

		set_title: function(data) {
			this.$MODAL_TITLE.html(data['title']);
			if (data['date']) this.$MODAL_TITLE.append('<span>' + data['date'] + '</span>');
		},

		set_gallery: function(data) {
			var temp_Content = "";
			this.totalP = data['amount'];

			for (var i = 0; i < this.totalP; i ++)
			{
				temp_Content += '<li><a class="p_item_btn" href="images/pics/pic' + (i+1) + '.jpg"><div class="thumbnail"><img src="images/pics/pic' + (i+1) + '.jpg" /></div></a></li>';
			}

			this.$MODAL_UL.html(temp_Content);
			this.$MODAL_CONTAINER.addClass('grid-view');

			this.$MODAL_P_ITEM_BTN = this.$MODAL_UL.find('a.p_item_btn');
			this.$MODAL_P_ITEM_BTN.on('click', this.photo_item_on.bind(this));
		},

		set_photo: function(data) {
			this.$MODAL_PHOTO.html('<div class="thumbnail"><img src="images/pics/pic30.jpg" /></div>');
		},

		photo_item_on: function(e) {
			e.stopPropagation();
		    e.preventDefault();

		    var $THIS = $(e.currentTarget);
		    this.curP = $THIS.parent().index();
		    console.log(this.curP);

		    this.$MODAL_CONTAINER.removeClass('grid-view');
		    this.$MODAL_PHOTO.html('<div class="thumbnail"><img src="' + $THIS.attr('href') + '" /></div>');
		},

		grid_view_on: function(e) {
			e.stopPropagation();
		    e.preventDefault();

			this.$MODAL_CONTAINER.addClass('grid-view');
		    this.$MODAL_PHOTO.html('');
		},

		slide_btn_on: function(e) {
			e.stopPropagation();
		    e.preventDefault();

		    var $THIS = $(e.currentTarget);

		    if ($THIS.hasClass('left'))
		    {
		    	if (this.curP > 0) this.curP -= 1;
		    	else this.curP = this.totalP - 1;

		    	console.log("LEFT " + this.curP);
		    }
		    else
		    {
		    	if (this.curP < (this.totalP - 1)) this.curP += 1;
		    	else this.curP = 0;

		    	console.log("RIGHT " + this.curP);
		    }

		    var imgSrc = this.$MODAL_UL.find('li').eq(this.curP).find('a.p_item_btn').attr('href');
	    	this.$MODAL_PHOTO.html('<div class="thumbnail"><img src="' + imgSrc + '" /></div>');
		}
	};

	return {
		init: init,
		handler: handler,
		modalOn: function(content, cb) { modal_layer.show(content, cb); },
		modalOff: function() { modal_layer.hide(); }
	};
})(jQuery);