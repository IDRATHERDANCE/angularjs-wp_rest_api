<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme and one
 * of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query,
 * e.g., it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 */

get_header(); ?>

<div id="main-content" class="main-content">
	<?php
	if (have_posts()):
		// Start the Loop.
		while (have_posts()): the_post();
	?><!--

	--><div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<a class="image_link" href="<?php the_permalink(); ?>">
			<?php echo expositio_image_tag(get_post_thumbnail_id()); ?>
		</a>
		<?php if (get_the_title() != ''): ?>
		<div>
			<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		</div>
		<?php endif; ?>
	</div><!--

	--><?php
		endwhile;
		expositio_paging_nav();
	else:
		// If no content, include the "No posts found" template.
		get_template_part('content', 'none');
	endif;
	?>
</div><!-- #main-content -->

<?php
get_footer();
