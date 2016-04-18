<?php get_header(); ?>

			<h1 class="page-title">
				<?php 
				global $post;
				if(get_post_meta($post->ID, 'heading_value', true) != ''): 
					echo get_post_meta($post->ID, 'heading_value', true); 
				else: 
					the_title();
				endif; 
				?>
            </h1>
            
            <!--BEGIN .page-back -->
            <div class="page-back">
            	<span class="back"><a href="<?php echo get_permalink(get_option('tz_portfolio_page')); ?>"><?php _e('&larr; Back to the Portfolio', 'framework'); ?></a></span>
            <!--END .page-back -->
            </div>
            
            <!--BEGIN #recent-portfolio  .home-recent -->
            <div id="recent-portfolio" class="home-recent portfolio-recent clearfix">
            
                <?php while (have_posts()) : the_post(); ?>
                <!--BEGIN .sidebar -->
            	<div class="sidebar">
                    
                    <?php the_content(); ?>
                    
                <!--END .sidebar -->
                </div>
                
                <!--BEGIN .recent-wrap -->
                <div class="recent-wrap">
                    
                        <!--BEGIN .hentry -->
                        <div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
                        
                        	<!--Added for Version 1.1 Classica Theme by Orman Clark-->
                            
                            <?php 
							$add_info = get_post_meta(get_the_ID(), 'tz_additional_info', true); 
							$video_url = get_post_meta(get_the_ID(), 'tz_video_url', true);
							$embeded_code = get_post_meta(get_the_ID(), 'tz_embed_code', true);
							?>
                            
                            <?php if($video_url !='' || $embeded_code != '') : ?>
                            
                            <!--BEGIN .video_slide -->
                            <div class="video_slide">

                           		<?php if($add_info != '') : ?>
                                <!--BEGIN .video_info -->
                                <div class="video_info">
                                    <?php echo stripslashes(htmlspecialchars_decode($add_info)); ?>
                                </div>
                                <!--END .video_info -->
                                <?php endif; ?> 

                                
                                <!--BEGIN .post_video -->
                                <div class="post_video">
                                
                                	<?php tz_video(get_the_ID()); ?>
                                
                                <!--END .post_video -->
                                </div>
        					
                            <!--END .video_slide -->
                            </div>
                            
                            <?php endif; ?>
                            
                            <!--BEGIN #home-slider .clearfix -->
                            <div id="slider" class="clearfix">
                                
                                <!--BEGIN .slides_container -->
                                <div class="slides_container">
                                
									<?php if(get_post_meta(get_the_ID(), 'upload_image', true) != '') : ?>
                                    <?php
									
									$height = get_post_meta(get_the_ID(), 'image1_height', true);
									
									if($height == '') {
										$image = getimagesize(get_post_meta(get_the_ID(), 'upload_image', true));
										$height = $image[1];
									}
									
									?>
                                    <div><img width="700" height="<?php echo $height; ?>" src="<?php echo get_post_meta(get_the_ID(), 'upload_image', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image2', true) != '') : ?>
                                    <div><img width="700" src="<?php echo get_post_meta(get_the_ID(), 'upload_image2', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image3', true) != '') : ?>
                                    <div><img width="700" src="<?php echo get_post_meta(get_the_ID(), 'upload_image3', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image4', true) != '') : ?>
                                    <div><img width="700" src="<?php echo get_post_meta(get_the_ID(), 'upload_image4', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image5', true) != '') : ?>
                                    <div><img width="700" src="<?php echo get_post_meta(get_the_ID(), 'upload_image5', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image6', true) != '') : ?>
                                    <div><img width="700" src="<?php echo get_post_meta(get_the_ID(), 'upload_image6', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image7', true) != '') : ?>
                                    <div><img width="700" src="<?php echo get_post_meta(get_the_ID(), 'upload_image7', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image8', true) != '') : ?>
                                    <div><img width="700" src="<?php echo get_post_meta(get_the_ID(), 'upload_image8', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image9', true) != '') : ?>
                                    <div><img width="700" src="<?php echo get_post_meta(get_the_ID(), 'upload_image9', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image10', true) != '') : ?>
                                    <div><img width="700" src="<?php echo get_post_meta(get_the_ID(), 'upload_image10', true); ?>" alt="<?php the_title(); ?>"></div>
                                    <?php endif; ?>
                                
                                <!--END .slides_container -->
                                </div>
                                
                                <?php if(get_post_meta(get_the_ID(), 'upload_image2', true) != '' && get_option('tz_portfolio_enable_slider') != 'false') : ?>
                                <!--BEGIN .pagination -->
                                <ul class="pagination">
                                    
                                    <li><a href="#"></a></li>
									<?php if(get_post_meta(get_the_ID(), 'upload_image2', true) != '') : ?>
                                    <li><a href="#"></a></li>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image3', true) != '') : ?>
                                    <li><a href="#"></a></li>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image4', true) != '') : ?>
                                    <li><a href="#"></a></li>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image5', true) != '') : ?>
                                    <li><a href="#"></a></li>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image6', true) != '') : ?>
                                    <li><a href="#"></a></li>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image7', true) != '') : ?>
                                    <li><a href="#"></a></li>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image8', true) != '') : ?>
                                    <li><a href="#"></a></li>
                                    <?php endif; ?>
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image9', true) != '') : ?>
                                    <li><a href="#"></a></li>
                                    <?php endif; ?>
									<?php if(get_post_meta(get_the_ID(), 'upload_image10', true) != '') : ?>
                                    <li><a href="#"></a></li>
                                    <?php endif; ?>
                                    
                                <!--END .pagination -->
                                </ul>
                                <?php endif; ?>
                                                                
                            <!--END #home-slider -->
                            </div>
                        
                        <!--END .hentry-->  
                        </div>

                <!--END .recent-wrap -->
                </div>
                <?php endwhile; ?>
                
            <!--END #recent-portfolio .home-recent -->
            </div>
			
            <!--BEGIN #recent-posts .home-recent -->
            <div id="recent-posts" class="home-recent clearfix">
            	
                <!--BEGIN .sidebar -->
            	<div class="sidebar">

                    <h3><?php echo stripslashes(get_option('tz_related_portfolio_title')); ?></h3>
                    
                    <p><?php echo stripslashes(get_option('tz_related_portfolio_description')); ?></p>

                <!--END .sidebar -->
                </div>
                
                <!--BEGIN .recent-wrap -->
                <div class="recent-wrap">

						<?php 
						
						//Set the starter count
						$start = 3;
						//Set the finish count
						$finish = 1;
						
						$postId = get_the_ID();
						
                        $related = get_posts_related_by_taxonomy($postId, 'skill-type', get_the_ID());
						
						//Get the total amount of posts
						$post_count = $related->post_count;
						
                        while ($related->have_posts()) : $related->the_post(); 
						
                        ?>
                        
							<?php if(is_multiple($start, 3)) : /* if the start count is a multiple of 3 */ ?>
                            <!--BEGIN .hentry-wrap -->
                            <div id="recent-portfolio-detail" class="hentry-wrap clearfix"> 
                            <?php endif; ?>

                                <!--BEGIN .hentry -->
                                <div <?php post_class(); ?> id="related-post-<?php the_ID(); ?>">
                                
                                    <?php if(get_post_meta(get_the_ID(), 'upload_image_thumb', true) != '') : ?>
                                    
                                        <div class="post-thumb">
                                            <a title="<?php the_title(); ?>" href="<?php the_permalink(); ?>">
                                                <img src="<?php echo get_post_meta(get_the_ID(), 'upload_image_thumb', true); ?>" alt="<?php the_title(); ?>">
                                            </a>
                                        </div>  
                                    
                                    <?php else: 
                                    
                                        if ( (function_exists('has_post_thumbnail')) && (has_post_thumbnail()) ) : ?>
                                        <div class="post-thumb">
                                            <a title="<?php the_title(); ?>" href="<?php the_permalink(); ?>">
                                                <?php the_post_thumbnail('thumbnail-post'); /* post thumbnail settings configured in functions.php */ ?>
                                            </a>
                                        </div>
                                        <?php endif; ?>
                                        
                                    <?php endif; ?>
                                                    
                                    <h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s', 'framework'), get_the_title()); ?>"> <?php the_title(); ?></a></h2>
                
                                    <!--BEGIN .entry-content -->
                                    <div class="entry-content">
                                        <?php the_excerpt(); ?>
                                    <!--END .entry-content -->
                                    </div>
                                
                                <!--END .hentry-->  
                                </div>
                            
                            <?php if(is_multiple($finish, 3) || $post_count == $finish) : /* if the finish count is a multiple of 3 or equals the total posts */  ?>
                            <!--END .hentry-wrap-->  
                            </div>
                            <?php endif; ?>
                        
                        <?php
						$start++;
						$finish++;
						?>
                        
                        <?php endwhile; wp_reset_query(); ?>
                        
                <!--END .recent-wrap -->
                </div>
            
            <!--END #recent-posts .home-recent -->
            </div>
            
            <!--BEGIN .home-recent -->
            <div id="home-border" class="home-recent clearfix">
                <!--BEGIN .sidebar -->
            	<div class="sidebar">
                <!--END .sidebar -->
                </div>
                <!--BEGIN .recent-wrap -->
                <div class="recent-wrap"> 
                <!--END .recent-wrap -->
                </div>
            <!--END #recent-portfolio .home-recent -->
            </div>
            
<?php get_footer(); ?>