<?php
/**
 * The template used for displaying page content
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php the_title('<header class="entry-header"><h2 class="entry-title">', '</h1></header><!-- .entry-header -->'); ?>

	<div class="entry-content">
		<?php
		the_content();
		wp_link_pages(array(
			'before' => '<div class="page-links"><span class="page-links-title">'.__('Pages:', 'expositio').'</span>',
			'after' => '</div>',
			'link_before' => '<span>',
			'link_after' => '</span>',
		));
		?>
	</div><!-- .entry-content -->
</article><!--

--><?php expositio_formatted_gallery(); ?>
