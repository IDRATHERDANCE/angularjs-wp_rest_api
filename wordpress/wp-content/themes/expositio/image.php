<?php
/**
 * The template for displaying image attachments
 */

// Retrieve attachment metadata.
$metadata = wp_get_attachment_metadata();

get_header();
?>

	<section id="primary" class="content-area image-attachment">
		<div id="content" class="site-content" role="main">

<?php while (have_posts()): the_post(); ?>

			<header class="entry-header">
				<?php the_title('<h1 class="entry-title">', '</h1>'); ?>
				<div class="entry-meta">
					<div class="full-size-link">
						<a href="<?php echo wp_get_attachment_url(); ?>"><?php echo $metadata['width']; ?> &times; <?php echo $metadata['height']; ?></a>
					</div>
					<div class="parent-post-link">
						<a href="<?php echo get_permalink($post->post_parent); ?>" rel="gallery"><?php echo get_the_title($post->post_parent); ?></a>
					</div>
				</div>
			</header><!--
			--><article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<div class="entry-content">
					<div class="entry-attachment">
						<div class="attachment">
							<?php expositio_the_attached_image(); ?>
						</div><!-- .attachment -->
	<?php if (has_excerpt()) : ?>
						<div class="entry-caption">
							<?php the_excerpt(); ?>
						</div><!-- .entry-caption -->
	<?php endif; ?>
					</div><!-- .entry-attachment -->
					<?php
					the_content();
					wp_link_pages(array(
						'before' => '<div class="page-links"><span class="page-links-title">'.__('Pages:', 'expositio').'</span>',
						'after' => '</div>',
						'link_before' => '<span>',
						'link_after' => '</span>',
					));
					?>

					<nav id="image-navigation" class="navigation image-navigation">
						<div class="nav-links">
						<?php previous_image_link(false, '<div class="previous-image">'.__('Previous Image', 'expositio').'</div>'); ?>
						<?php next_image_link(false, '<div class="next-image">'.__('Next Image', 'expositio').'</div>'); ?>
						</div><!-- .nav-links -->
					</nav><!-- #image-navigation -->
				</div><!-- .entry-content -->
			</article><!-- #post-## -->

<?php endwhile; ?>

		</div><!-- #content -->
	</section><!-- #primary -->

<?php
get_footer();
