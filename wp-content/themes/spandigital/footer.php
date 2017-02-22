<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Spandigital
 */
?>
	
	<footer id="footer">
	    <div class="wrapper">
            <div class="social-channel">
                <a class="sprite-fb" href="<?php the_field( "facebook_url" ); ?>" target="_blank">Facebook</a>
                <a class="sprite-tw" href="<?php the_field( "twitter_url" ); ?>" target="_blank">Twitter</a>
                <a class="sprite-in" href="<?php the_field( "linkedin_url" ); ?>" target="_blank">LinkedIn</a>
            </div>
            <div class="copyright"><?php the_field( "footer_copyrights" ); ?></div>
	    </div>
	</footer>
    
    <div id="modal-layer">
        <div class="frame">
            <div class="wrapper">
                <div class="jobs-content container preload"></div>
            </div>
        </div>
        
        <a href="#" class="close-btn">Close</a>

    </div>

<?php wp_footer(); ?>

</body>
</html>
