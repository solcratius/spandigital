<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Spandigital
 */
?>

<section class="quotes">
	<span class="shadow-top"></span>
	<div class="wrapper">
		<span class="sprite-quote"></span>
		<p><?php the_field( "quote_text", $sect ); ?></p>
	</div>
</section>