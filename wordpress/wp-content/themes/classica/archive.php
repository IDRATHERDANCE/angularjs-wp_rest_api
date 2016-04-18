<?php get_header(); ?>
<?php /* Get author data */
	if(get_query_var('author_name')) :
	$curauth = get_userdatabylogin(get_query_var('author_name'));
	else :
	$curauth = get_userdata(get_query_var('author'));
	endif;
?>			
			<?php if (have_posts()) : ?>			
	
	 	  	<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
	 	  	<?php /* If this is a category archive */ if (is_category()) { ?>
				<h1 class="page-title"><?php printf(__('All posts in %s', 'framework'), single_cat_title('',false)); ?></h1>
	 	  	<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
				<h1 class="page-title"><?php printf(__('All posts tagged %s', 'framework'), single_tag_title('',false)); ?></h1>
	 	  	<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
				<h1 class="page-title"><?php _e('Archive for', 'framework') ?> <?php the_time('F jS, Y'); ?></h1>
	 	 	 <?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
				<h1 class="page-title"><?php _e('Archive for', 'framework') ?> <?php the_time('F, Y'); ?></h1>
	 		<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
				<h1 class="page-title"><?php _e('Archive for', 'framework') ?> <?php the_time('Y'); ?></h1>
		  	<?php /* If this is an author archive */ } elseif (is_author()) { ?>
				<h1 class="page-title"><?php _e('All posts by', 'framework') ?> <?php echo $curauth->display_name; ?></h1>
	 	  	<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				<h1 class="page-title"><?php _e('Blog Archives', 'framework') ?></h1>
	 	  	<?php } ?>
            
			<!--BEGIN #primary .hfeed-->
			<div id="primary" class="hfeed">
            		
			<?php while (have_posts()) : the_post(); ?>
				
				<!--BEGIN .hentry -->
				<div <?php post_class(); ?> id="post-<?php the_ID(); ?>">	
                			
					<h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s', 'framework'), get_the_title()); ?>"> <?php the_title(); ?></a></h2>
                    
                    <?php /* if the post has a WP 2.9+ Thumbnail */
					if ( (function_exists('has_post_thumbnail')) && (has_post_thumbnail()) ) { ?>
					<div class="post-thumb">
						<a title="<?php printf(__('Permanent Link to %s', 'framework'), get_the_title()); ?>" href="<?php the_permalink(); ?>"><?php the_post_thumbnail('thumbnail-archive'); /* post thumbnail settings configured in functions.php */ ?></a>
					</div>
					<?php } ?>
					<!--BEGIN .clearfix -->
                    <div class="clearfix">		
                    
                        <!--BEGIN .entry-meta .entry-header-->
                        <div class="entry-meta entry-header">
                            <span class="author"><?php _e('By', 'framework') ?> <?php the_author_posts_link(); ?></span>
                            <span class="published"><?php _e('On', 'framework') ?> <strong><?php the_time( get_option('date_format') ); ?></strong></span>
                            <span class="entry-categories"><?php _e('In', 'framework') ?> <?php the_category(', ') ?></span>
                            <span class="comment-count"><?php _e('With', 'framework') ?> <?php comments_popup_link(__('No Comments', 'framework'), __('1 Comment', 'framework'), __('% Comments', 'framework')); ?></span>
                            <span class="permalink"><img src="<?php echo get_template_directory_uri(); ?>/images/permalink_icon.png" alt="<?php printf(__('Permanent Link to %s', 'framework'), get_the_title()); ?>" /><a title="<?php printf(__('Permanent Link to %s', 'framework'), get_the_title()); ?>" href="<?php the_permalink(); ?>"><?php _e('Permalink', 'framework') ?></a></span>
                            <?php edit_post_link( __('edit', 'framework'), '<span class="edit-post">[', ']</span>' ); ?>
                        <!--END .entry-meta entry-header -->
                        </div>
    
                        <!--BEGIN .entry-content -->
                        <div class="entry-content ">
                            <?php the_content(__('Continue Reading &rarr;', 'framework')); ?>
                        <!--END .entry-content -->
                        </div>
                        
                    <!--END .clearfix -->
				    </div>     
                          
				<!--END .hentry-->  
				</div>

				<?php endwhile; ?>

			<!--BEGIN .navigation .page-navigation -->
			<div class="navigation page-navigation">
				<div class="nav-next"><?php next_posts_link(__('&larr; Older Entries', 'framework')) ?></div>
				<div class="nav-previous"><?php previous_posts_link(__('Newer Entries &rarr;', 'framework')) ?></div>
			<!--END .navigation .page-navigation -->
			</div>

			<?php else : ?>

				<!--BEGIN #post-0-->
				<div id="post-0" <?php post_class(); ?>>
				
					<h2 class="entry-title"><?php _e('Error 404 - Not Found', 'framework') ?></h2>
				
					<!--BEGIN .entry-content-->
					<div class="entry-content">
						<p><?php _e("Sorry, but you are looking for something that isn't here.", "framework") ?></p>
					<!--END .entry-content-->
					</div>
				
				<!--END #post-0-->
				</div>

			<?php endif; ?>
			<!--END #primary .hfeed-->
			</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>