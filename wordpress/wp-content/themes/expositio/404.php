<?php
/**
 * The template for displaying 404 pages (Not Found)
 */

get_header();
?>

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">
			<header class="page-header">
				<h1 class="page-title"><?php _e('404', 'expositio'); ?></h1>
			</header><!--
			--><div class="page-content">
				<p><?php _e('Oops! It looks like nothing was found at this location.<br><a href="javascript:history.go(-1);">Go back</a> or <a href="/">back to homepage</a>.', 'expositio'); ?></p> 
			</div><!-- .page-content -->
		</div><!-- #content -->
	</div><!-- #primary -->

<?php
get_footer();
