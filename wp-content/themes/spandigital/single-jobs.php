<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Spandigital
 */

require('../../../wp-load.php');
$id = $_POST['postID'];
?>

<h5><?php echo get_the_title($id); ?></h5>

<h6 class="location">
<?php
	$loc = get_field('job_location', $id);
	$country = ", USA";
	if ($loc == "cape town") $country = ", South Africa";

	echo ucwords( strtolower( $loc ) ) . $country;
?>
</h6>

<?php the_field('job_description', $id); ?>

<span class="label">You’ll love it here if:</span>
<?php the_field( 'job_character', $id ); ?>

<span class="label">We offer:</span>
<?php the_field( 'job_benefits', $id ); ?>

<a href="<?php the_field( 'apply_btn_url', $id ); ?>" class="apply-btn" target="_blank">Apply Now</a>