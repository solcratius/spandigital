<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Spandigital
 */

// global $post;
// $id = $post->ID;

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<!-- <body class="nav-open"> -->

	<header id="header" class="<?php echo the_field( "background_color" ); ?>-bg">
    
	    <div class="masthead">
            <a class="logo-container" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="SPAN DIGITAL">
                <h1 class="sprite-logo"><span>SPAN DIGITAL</span></h1>
            </a>
        </div>
        <div class="menu-container">
            <a id="nav-toggle" href="#">
                <div></div>
                <div></div>
                <div></div>
            </a>

            <a id="nav-close" href="#">
                <div></div>
                <div></div>
            </a>

            <nav id="site-navigation" class="navigation" role="navigation" aria-label="<?php esc_attr_e( 'Main page', 'spandigital' ); ?>">
                <?php
                    wp_nav_menu( array(
                        'theme_location' => 'primary',
                        'menu_class'     => 'primary-menu',
                     ) );
                ?>
            </nav>
        </div>
        
    </header>
