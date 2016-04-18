<?php get_header(); ?>
			
			<h1 class="page-title">
				<?php 
				$meta = get_post_meta(get_the_ID(), 'heading_value', true);
				if($meta != ''): 
					echo $meta; 
				else: 
					$blog_page = get_option('tz_blog_page');
					$meta = get_post_meta($blog_page, 'heading_value', true);
					echo $meta;
				endif; 
				?>
            </h1>
            
			<!--BEGIN #primary .hfeed-->
			<div id="primary" class="hfeed">
            		
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				
				<!--BEGIN .hentry -->
				<div <?php post_class(); ?> id="post-<?php the_ID(); ?>">	
                			
					<h2 class="entry-title"><?php the_title(); ?></h2>
                    
                    <?php if(get_option('tz_post_img') == 'true') : ?>
                    <?php /* if the post has a WP 2.9+ Thumbnail */
					if ( (function_exists('has_post_thumbnail')) && (has_post_thumbnail()) ) { ?>
					<div class="post-thumb">
						<?php the_post_thumbnail('thumbnail-archive'); /* post thumbnail settings configured in functions.php */ ?>
					</div>
					<?php } ?>
                    <?php endif; ?>
                    
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
                        <div class="entry-content">
                        
                            <?php the_content(); ?>
                            
                        <!--END .entry-content -->
                        </div>
                        
                    <!--END .clearfix -->
				    </div>     
                          
				<!--END .hentry-->  
				</div>

				<?php endwhile; ?>
                
                <?php comments_template('', true); ?>

                <!--BEGIN .navigation .single-page-navigation -->
				<div class="navigation single-page-navigation">
					<div class="nav-previous"><?php previous_post_link('&larr; %link') ?></div>
					<div class="nav-next"><?php next_post_link('%link &rarr;') ?></div>
				<!--END .navigation .single-page-navigation -->
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