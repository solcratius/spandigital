
'use strict';

var SPANDIGITAL = SPANDIGITAL || {};

(function() {

	SPANDIGITAL.namespace = function(nsString) {
	    var parts 	= nsString.split( '.' ),
	        parent 	= SPANDIGITAL,
	        i;

	    if ( parts[0] === 'SPANDIGITAL' ) {
	    	parts = parts.slice(1);
	    }

	    for ( i = 0; i < parts.length; i += 1 ) {
	    	if ( typeof parent[ parts[i] ] === 'undefined' ) {
	        	parent[ parts[i] ] = {};
	      	}
	      	parent = parent[ parts[i] ];
	    }

	    return parent;
	};
})();

//-----------------------------------------------------------------------------------------------

SPANDIGITAL.namespace( 'controller' );

SPANDIGITAL.controller = (function() {

  	var init = function() {
    	var doc = document.documentElement;
    	doc.setAttribute('data-useragent', navigator.userAgent);

    	window.onload = function() {
    		SPANDIGITAL.main.init();
	    	// SPANDIGITAL.main.nav.init();
	    	// SPANDIGITAL.main.landing.init();
	    }
	};

	return {
		init: init
	};

})();

//-----------------------------------------------------------------------------------------------

jQuery(document).ready(function() {
	SPANDIGITAL.controller.init();
});