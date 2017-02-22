<?php
/**
 * Spandigital functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Spandigital
 */

if ( ! function_exists( 'spandigital_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function spandigital_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Spandigital, use a find and replace
	 * to change 'spandigital' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'spandigital', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'spandigital' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'gallery',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'spandigital_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif;
add_action( 'after_setup_theme', 'spandigital_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function spandigital_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'spandigital_content_width', 640 );
}
add_action( 'after_setup_theme', 'spandigital_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function spandigital_scripts() {
	wp_enqueue_style( 'font-style', 'https://cloud.typography.com/6741912/6289372/css/fonts.css' );
	
	// wp_enqueue_style( 'font-style', 'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900' );
	
	wp_enqueue_style( 'spandigital-style', get_stylesheet_uri() );

	wp_enqueue_script('jquery');
	wp_enqueue_script( 'jquery', get_template_directory_uri() . '/js/jquery/dist/jquery.js', '1.1.1', true );
	wp_enqueue_script( 'jquery-easing', get_template_directory_uri() . '/js/jquery/easing/jquery.easing.js', '1.1.1', true );

	 wp_enqueue_script( 'slick', get_template_directory_uri() . '/js/slick.min.js', '1.6.0', true );

	// wp_enqueue_script( 'spandigital-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );
	wp_enqueue_script( 'spandigital-script', get_template_directory_uri() . '/js/main.min.js', array(), '20161205', true );

	wp_enqueue_script( 'network-anim-script', get_template_directory_uri() . '/js/particle-network.js', array(), '20170212', true );
	
	wp_enqueue_script( 'spandigital-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'spandigital_scripts' );

/**
 * Implement the Custom Header feature.
 */
// require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
// require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
// require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
// require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
// require get_template_directory() . '/inc/jetpack.php';




function my_login_logo() { ?>
	<style type="text/css">
		#login h1 a, .login h1 a {
			background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/login-logo.png);
			background-size: 320px;
	        width: 320px;
	        height: 140px;
		}
	</style>
<?php }

add_action( 'login_enqueue_scripts', 'my_login_logo' );

