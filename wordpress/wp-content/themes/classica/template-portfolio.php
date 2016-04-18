<?php
/*
Template Name: Portfolio
*/
?>

<?php get_header(); ?>

			<h1 class="page-title">
				<?php 
				global $post;
				if(get_post_meta($post->ID, 'heading_value', true) != ''): 
					echo get_post_meta($post->ID, 'heading_value', true); 
				else: 
					_e('Some of my recent work.', 'framework'); 
				endif; 
				?>
            </h1>
            
            <!--BEGIN #recent-portfolio  .home-recent -->
            <div id="recent-portfolio" class="home-recent portfolio-recent clearfix">
            	
                <?php while (have_posts()) : the_post(); ?>
                <!--BEGIN .sidebar -->
            	<div class="sidebar">
                    
                    <?php the_content(); ?>
                    
                    <h3><?php _e('Filter:', 'framework'); ?></h3>
                    
                    <ul id="filter">
                      <li class="segment-1"><a data-value="all" href="#">All</a></li>
                      <?php wp_list_categories(array('title_li' => '', 'taxonomy' => 'skill-type', 'walker' => new Portfolio_Walker())); ?>
                    </ul>
                    
                <!--END .sidebar -->
                </div>
                <?php endwhile; ?>
                
                <!--BEGIN .recent-wrap -->
                <div class="recent-wrap">
				
                	<ul id="items" class="image-grid">
                    
                    	<?php 
						$count = 1;
                        $query = new WP_Query();
                        $query->query('post_type=portfolio&posts_per_page=-1');
                        while ($query->have_posts()) : $query->the_post(); 
						$terms = get_the_terms( get_the_ID(), 'skill-type' );
					
                        ?>
                        	
                            <li data-id="id-<?php echo $count; ?>" class="<?php if($terms) : foreach ($terms as $term) { echo 'term-'.$term->term_id.' '; } endif; ?>">
                    
                            <!--BEGIN .hentry -->
                            <div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
                                
                                <div class="post-thumb">
                                    <?php tz_lightbox(get_the_ID()); ?>
                                </div>
                                
                                <div class="count hidden"><?php echo $count; ?></div>
                                 
                                <h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s', 'framework'), get_the_title()); ?>"> <?php the_title(); ?></a></h2>
            
                                <!--BEGIN .entry-content -->
                                <div class="entry-content">
                                    <?php the_excerpt(); ?>
                                <!--END .entry-content -->
                                </div>
                            
                            <!--END .hentry-->  
                            </div>
                        
                        <?php
						$count++;
						?>
                        
                        </li>
                        
                        <?php endwhile; wp_reset_query(); ?>
                      
                    </ul>
                        
                <!--END .recent-wrap -->
                </div>

            <!--END #recent-portfolio .home-recent -->
            </div>
            

<?php get_footer(); ?>