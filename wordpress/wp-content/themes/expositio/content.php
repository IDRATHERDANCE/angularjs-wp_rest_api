<?php
/**
 * The default template for displaying content
 *
 * Used for both single and index/archive/search.
 */

$content = wpShower::filteredContent();
if ($content != ''):
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php
		if (is_single()) the_title('<h1 class="entry-title">', '</h1>');
		else the_title('<h1 class="entry-title"><a href="'.esc_url(get_permalink()).'" rel="bookmark">', '</a></h1>');
		?>
	</header>

	<?php if (is_search()): ?>
	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
	<?php else: ?>
	<div class="entry-content">
		<?php
		echo $content;
		wp_link_pages(array(
			'before' => '<div class="page-links"><span class="page-links-title">'.__('Pages:', 'expositio').'</span>',
			'after' => '</div>',
			'link_before' => '<span>',
			'link_after' => '</span>',
		));
		?>
	</div><!-- .entry-content -->
	<?php endif; ?>
</article><!--

--><?php
endif;

expositio_formatted_gallery();
