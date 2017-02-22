<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Spandigital
 */
$id = $post->ID;

get_header(); ?>

    <div id="contents" class="case-study">

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

        <section class="case-highlights grey-l">
            <div class="wrapper">
                <div class="col headline"><?php the_field('top_headline', $id); ?></div>
                <div class="divider"></div>
                <div class="col">
                    <h5 class="orange-txt">Highlights</h5>
                    <?php the_field('top_text', $id); ?>
                </div>
            </div>
        </section>

        <section class="case-body">
            <div class="wrapper">
                <div class="col headline">
                <?php
                    $body_headline = get_field('body_headline', $id);
                    $intro_label = get_field('intro_label', $id);
                    $intro_text = get_field('intro_text', $id);

                    if ($intro_text)
                    {
                        echo '<div class="body-mobileOnly">';
                        if ($intro_label) echo '<h5 class="orange-txt">' . $intro_label . '</h5>';
                        echo $intro_text . '</div>';
                    }

                    if ($body_headline) echo '<span class="bar"></span>' . $body_headline;
                ?>
                </div>
                <div class="col">
                <?php
                    if ($intro_text)
                    {
                        echo '<div class="sub-section body-desktopOnly">';
                        if ($intro_label) echo '<h5 class="orange-txt">' . $intro_label . '</h5>';
                        echo $intro_text . '</div>';
                    }

                    $challenge_label = get_field('challenge_label', $id);
                    $challenge_text = get_field('challenge_text', $id);

                    if ($challenge_text)
                    {
                        echo '<div class="sub-section">';
                        if ($challenge_label) echo '<h5 class="orange-txt">' . $challenge_label . '</h5>';
                        echo $challenge_text . '</div>';
                    }

                    $solution_label = get_field('solution_label', $id);
                    $solution_text = get_field('solution_text', $id);

                    if ($solution_text)
                    {
                        echo '<div class="sub-section">';
                        if ($solution_label) echo '<h5 class="orange-txt">' . $solution_label . '</h5>';
                        echo $solution_text . '</div>';
                    }
                ?>
                </div>
            </div>
        </section>

        <?php
            $sect = get_field("quote")[0];

            if( $sect ):
                setup_postdata($sect);

                $sect_type = "quotes";
                require(locate_template('single-quotes.php'));

                wp_reset_postdata();
            endif;
        ?>

        <section class="case-results">
            <div class="wrapper">
                <div class="col headline">
                <?php
                    $results_headline = get_field('results_headline', $id);
                    $results_label = get_field('results_label', $id);
                    $results_text = get_field('results_text', $id);

                    if ($results_headline) echo '<span class="bar"></span>' . $results_headline;
                ?>
                </div>
                <div class="col">
                <?php
                    if ($results_text)
                    {
                        echo '<div class="sub-section">';
                        if ($results_label) echo '<h5 class="orange-txt">' . $results_label . '</h5>';
                        echo $results_text . '</div>';
                    }
                ?>
                </div>
            </div>
        </section>


        <?php
            $case_studies = get_field("case_studies", $id);

            if( $case_studies ):
                echo '<section class="case-studies grey-l"><div class="wrapper"><h4>More Case Studies</h4></div>';
                echo '<div class="wrapper wide"><ul>';

                foreach($case_studies as $case_study)
                {
                    setup_postdata( $case_study );

                    $item_name = $case_study['item_name'];
                    $item_image = $case_study['item_image'];
                    $item_obj = $case_study['item_object'];

                    if( $item_obj ):

                        $item_id = $item_obj -> ID;

                        if (!$item_name) $item_name = get_the_title($item_id);
                        if (!$item_image) $item_image = get_field('hero_image', $item_id);
                        $item_link = get_permalink($item_id);

                    endif;

                    echo '<li><a href="' . $item_link . '">';
                    echo '<img src="' . $item_image . '" />';
                    echo '<h3>' . $item_name . '</h3><span>View Case Study</span></a></li>';
                }
                wp_reset_postdata();

                echo '</ul></div></section>';
            endif;
        ?>

        <?php
            $enable_global_hub = get_field("enable_global_hub_section", $id);

            if( $enable_global_hub ):
            	$sect_type = "offices";

            	$global_hub_query = new WP_Query(
			        array(
			            'name' => 'our-global-hubs',
			            'post_type' => 'sections'
			        )
			    );

			    $sect = get_the_ID($global_hub_query->the_post());
				if ( !$sect ) $sect = 86;

                setup_postdata($sect);

                require(locate_template('single-sections.php'));
                wp_reset_postdata();
            endif;
        ?>

    </div> <!-- end content -->

<?php get_footer(); ?>

