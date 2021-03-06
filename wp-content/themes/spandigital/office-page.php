<?php
/**
 * Template Name: WORKING AT SPAN
 *
 * This is your custom page template. You can create as many of these as you need.
 * Simply name is "page-whatever.php" and in add the "Template Name" title at the
 * top, the same way it is here.
 *
 * When you create your page, you can just select the template and viola, you have
 * a custom page template to call your very own. Your mother would be so proud.
 *
 * For more info: http://codex.wordpress.org/Page_Templates
 *
 * @package Spandigital
 */
$id = $post->ID;

get_header(); ?>

    <div id="contents" class="office">

        <?php
        	$bg_color = get_field( "background_color", $id );
            $bg_img = get_field( "hero_image", $id );
            $bg_pos = get_field( "hero_image_position", $id );
            $header_text = get_field( "header_text", $id );
            $body_text = get_field( "body_text", $id );

            echo '<section class="hero ' . $bg_color . '"';

            if ($bg_img) echo ' style="background-image:url(' . $bg_img . '); background-position:' . $bg_pos . ';"';

            echo '><div class="wrapper';

            if ($body_text)
            {
            	echo ' align-left"><h3>' . $header_text . '</h3>';
            	echo '<p>' . $body_text . '</p>';
            }
            else
            {
            	echo '"><h2>' . $header_text . '</h2>';
            }
        ?>
            </div>
        </section>

        <?php
            $sections = get_field("sect_select");

            if( $sections ):

                foreach( $sections as $sect):
                    setup_postdata($sect);

                    $sect_type = get_field( "sect_type", $sect );
                    $tpl_name = "sections";

                    if (!$sect_type)
                    {
                        $sect_type = "quotes";
                        $tpl_name = "quotes";
                    }
                    
                    // get_template_part('single', $mod_type);
                    // include(locate_template('single-' . $tpl_name . '.php'));
                    require(locate_template('single-' . $tpl_name . '.php'));

                endforeach;
                wp_reset_postdata();

            endif;
        ?>

    </div> <!-- end content -->

<?php get_footer(); ?>
