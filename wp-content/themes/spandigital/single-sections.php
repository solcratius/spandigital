<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Spandigital
 */

	$sect_title = get_the_title( $sect );
	$sect_id = get_field( "sect_name", $sect );
	$sect_bg = get_field( "sect_bg", $sect );
	$sect_text = get_field( "sect_text", $sect );

	echo '<section id="' . $sect_id . '" class="' . $sect_bg . '"><div class="wrapper';

	if ($sect_type == "careers") echo ' wide';

	echo '">';

	if ($sect_title && $sect_type != "careers") echo '<h4>' . $sect_title . '</h4>';

	if ($sect_type == "careers")
	{
		$sect_headline = get_field( "careers_headline", $sect );
		
		echo '<div class="col"><h2 class="small">' . $sect_headline . '</h2>';
		if ($sect_text) echo '<h4>' . $sect_text . '</h4>';
	}
	else
	{
		if ($sect_text) echo '<p>' . $sect_text . '</p>';
	}
?>



<?php
	if( $sect_type == "capabilities" ):

		echo '</div>';
	    $c_items = get_field('capabilities_items', $sect);

		if ($c_items):

			$c_headline_arr = array();
			$c_text_arr = array();

			echo '<div class="wrapper wide"><ul class="nav-items">';

			foreach($c_items as $c_item)
			{
				setup_postdata( $c_item );

				$c_headline = $c_item['headline'];
				$c_text = $c_item['item_text'];

				array_push($c_headline_arr, $c_headline);
				array_push($c_text_arr, $c_text);

				echo '<li class="nav"><a href="#">' . $c_item['item_name'] . '<div class="arrow-icon"></div></a>';
				echo '<div class="contents"><h2 class="smaller">' . $c_headline . '</h2>' . $c_text . '</div></li>';
			}

			echo '<span class="active-bar"></span></ul>';
			wp_reset_postdata();

			echo '<ul class="contents">';

			$c_total = count($c_items);
			$c_n = 0;

			while ( $c_n < $c_total)
			{
				echo '<li class="item"><h2 class="smaller">' . $c_headline_arr[$c_n] . '</h2><div class="divider"></div>';
				echo $c_text_arr[$c_n] . '</li>';

				$c_n ++;
			}

			echo '</ul>';

		endif;

	endif;
?>



<?php if( $sect_type == "work" ):

    echo '</div>';
    $work_items = get_field('work_items', $sect);
    $show_case_studies = get_field('show_case_studies', $sect);

	if ($work_items):

		$w_text_arr = array();

		echo '<div class="wrapper wide"><ul class="logos">';

		foreach($work_items as $work_item)
		{
			setup_postdata( $work_item );

			$work_name = $work_item['item_name'];
			$work_logo = $work_item['logo'];
			$work_logo_h = $work_item['logo_hover'];
			$work_link = $work_item['item_link'];
			$work_text = $work_item['item_text'];

			if (!$work_logo_h) $work_logo_h = $work_logo;

			array_push($w_text_arr, $work_text);

			if ($show_case_studies) echo '<li class="logo-img"><img src="' . $work_logo . '" alt="' . $work_name . '" />';
			else echo '<li class="logo"><a href="' . $work_link . '" style="background-image:url(' . $work_logo . ');">';

			if ($show_case_studies) echo '</li>';
			else echo '<img src="' . $work_logo_h . '" alt="' . $work_name . '" /></a></li>';
		}

		wp_reset_postdata();

		echo '</ul>';

		if ($show_case_studies) {
			$case_studies_text = get_field('case_studies_text', $sect);
			$case_study_items = get_field('case_study_items', $sect);
			$case_study_total = count($case_study_items);

			echo '<div class="case-studies-header">' . $case_studies_text . '</div>';

			if ($case_study_items) {

				echo '<ul class="case-study-items">';

				foreach($case_study_items as $case_study_item)
				{
					setup_postdata( $case_study_item );

					$item_name = $case_study_item['item_name'];
					$item_image = $case_study_item['item_img'];
					$item_obj = $case_study_item['item_obj'];

					if( $item_obj ):

                        $item_id = $item_obj -> ID;

                        if (!$item_name) $item_name = get_the_title($item_id);
                        if (!$item_image) $item_image = get_field('hero_image', $item_id);
                        $item_link = get_permalink($item_id);

                    endif;

                    if ($case_study_total > 2)
                    {
                    	echo '<li class="large">';
                    	$case_study_total = 0;
                    }
                    else
                    {
                    	echo '<li>';
                    }

                    echo '<a href="' . $item_link . '">';
                    echo '<img src="' . $item_image . '" />';
                    echo '<h3>' . $item_name . '</h3><span>View Case Study</span></a></li>';
				}

				wp_reset_postdata();

				echo '</ul>';
			}

		} else {

			echo '<ul class="contents">';

			$w_total = count($work_items);
			$w_n = 0;

			while ( $w_n < $w_total)
			{
				echo '<li class="item">' . $w_text_arr[$w_n] . '</li>';
				$w_n ++;
			}

			echo '</ul>';

		}

	endif;

endif; ?>



<?php if( $sect_type == "leadership" ):

    echo '</div>';
    $leaders_items = get_field('leadership_items', $sect);

	if ($leaders_items):

		echo '<div class="wrapper">';

		foreach($leaders_items as $leaders_item)
		{
			setup_postdata( $leaders_item );

			$leader_name = $leaders_item['item_name'];
			$leader_title = $leaders_item['item_title'];
			$leader_photo = $leaders_item['item_photo'];
			$leader_bio = $leaders_item['bio_text'];

			echo '<div class="col"><a class="bio-btn" href=#><div class="leader-photo"><img src="' . $leader_photo . '" /></div>';
			echo '<p class="name">' . $leader_name . '</p><p class="small title">' . $leader_title . '</p>';
			echo '<span class="bio-label">Read Bio</span></a>';
			echo '<div class="bio-box"><h6>' . $leader_name . '</h6><p>' . $leader_bio . '</p><a class="close-btn" href="#">Close</a></div></div>';
		}
		wp_reset_postdata();

	endif;

endif; ?>



<?php
	if( $sect_type == "careers" ):
		$careers_detail = get_field( "careers_detail_text", $sect );
		$careers_btn_label = get_field( "careers_btn_label", $sect );
		$careers_btn_link = get_field( "careers_btn_link", $sect );
		$job_opening_url = get_field( "job_opening_url", $sect );
?>
	</div>
	<div class="divider"></div>
	<div class="col">
		<p><?php echo $careers_detail; ?></p>
		<a href="<?php echo $careers_btn_link; ?>" class="sect-btn"><?php echo $careers_btn_label; ?></a>
		<p class="job-opening-label">Already interested?</p>
		<a href="<?php echo $job_opening_url; ?>" class="job-opening-btn">Check out our current job openings.</a>
	</div>
<?php endif; ?>



<?php if( $sect_type == "offices" ):

	echo '</div>';
    $ghub_items = get_field('global_hub_items', $sect);
    
	if ($ghub_items):

		echo '<div class="wrapper">';

		foreach($ghub_items as $ghub_item)
		{
			setup_postdata( $ghub_item );

			$hub_name = $ghub_item['item_name'];
			$hub_map_img = $ghub_item['item_map_image'];
			$hub_map_img_h = $ghub_item['item_map_image_h'];
			$hub_map_url = $ghub_item['item_map_url'];
			$hub_address = $ghub_item['item_address'];
			if (!$hub_map_img_h) $hub_map_img_h = $hub_map_img;

			echo '<div class="col"><a class="map" href="' . $hub_map_url . '" target="_blank" style="background-image:url(';
			echo $hub_map_img . ');"><img src="' . $hub_map_img_h . '" /></a>';
			echo '<h5>' . $hub_name . '</h5><p>' . $hub_address . '</p></div>';
		}
		wp_reset_postdata();
	endif;

endif; ?>



<?php
	if( $sect_type == "beliefs" ):

		echo '</div>';
	    $belief_items = get_field('beliefs_items', $sect);

		if ($belief_items):

			echo '<div class="wrapper wide"><ul>';

			foreach($belief_items as $belief_item)
			{
				setup_postdata( $belief_item );

				echo '<li><h5>' . $belief_item['item_title'] . '</h5>';
				echo '<p class="smaller">' . $belief_item['item_text'] . '</p></li>';
			}
			wp_reset_postdata();
			echo '</ul>';

		endif;

	endif;
?>



<?php
	if( $sect_type == "openings" ):

		echo '</div>';
	    $opening_items = get_field('current_opening_list', $sect);
	    $sf_pos_array = array();
	    $cpt_pos_array = array();

		if ($opening_items):

			echo '<div class="wrapper wide box"><div class="job-nav"><a class="jobs-sf" href="#">San Francisco</a><a class="jobs-cpt" href="#">Cape Town</a><span class="active-bar"></span></div>';

			foreach($opening_items as $opening_item)
			{
				setup_postdata( $opening_item );

				$job_id = $opening_item -> ID;
				$job_loc = get_field('job_location', $job_id);

				if ($job_loc == "san francisco") array_push($sf_pos_array, $job_id);
				if ($job_loc == "cape town") array_push($cpt_pos_array, $job_id);
			}
			wp_reset_postdata();
			echo '<ul class="sf clearfix">';

			$sf_total = count($sf_pos_array);
			$sf_n = 0;

			while ( $sf_n < $sf_total)
			{
				$sf_job_url = get_template_directory_uri() . '/single-jobs.php#' . $sf_pos_array[$sf_n];

				echo '<li class="job"><a href="' . $sf_job_url . '">' . get_the_title($sf_pos_array[$sf_n]) . '</a></li>';

				$sf_n ++;
			}

			echo '</ul>';

			echo '<ul class="cpt clearfix">';

			$cpt_total = count($cpt_pos_array);
			$cpt_n = 0;

			while ( $cpt_n < $cpt_total)
			{
				$cpt_job_url = get_template_directory_uri() . '/single-jobs.php#' . $cpt_pos_array[$cpt_n];

				echo '<li class="job"><a href="' . $cpt_job_url . '">' . get_the_title($cpt_pos_array[$cpt_n]) . '</a></li>';

				$cpt_n ++;
			}

			echo '</ul>';

		endif;

	endif;
?>



<?php 
	if( $sect_type == "office_gallery" ):

		echo '</div>';
	    $gallery_items = get_field('office_gallery_items', $sect);

		if ($gallery_items):

			echo '<div class="wrapper wide"><div class="container">';

			foreach($gallery_items as $gallery_item)
			{
				setup_postdata( $gallery_item );

				$gallery_photo = $gallery_item['photo'];
				$gallery_caption = $gallery_item['caption'];

				echo '<div><img src="' . $gallery_photo . '" alt="' . ($gallery_caption ? $gallery_caption : '') . '" /></div>';
			}
			wp_reset_postdata();
			echo '</div>';

		endif;

	endif;
?>



<?php 
	if( $sect_type == "corporate_initiatives" ):

		echo '</div>';
	    $corporate_items = get_field('corporate_initiatives_photos', $sect);

		if ($corporate_items):

			echo '<div class="wrapper col-2 all"><div class="container">';

			foreach($corporate_items as $corporate_item)
			{
				setup_postdata( $corporate_item );

				$corporate_photo = $corporate_item['photo'];
				$corporate_caption = $corporate_item['caption'];

				echo '<div><img src="' . $corporate_photo . '" alt="' . ($corporate_caption ? $corporate_caption : '') . '" /></div>';
			}
			wp_reset_postdata();
			echo '</div></div>';

		endif;

		echo '<div class="wrapper col-2">';
		echo '<h4>' . $sect_title . '</h4>';
		if ($sect_text) echo '<p>' . $sect_text . '</p>';

	endif;
?>

	</div>
</section>