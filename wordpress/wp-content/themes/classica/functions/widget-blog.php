<?php

/*-----------------------------------------------------------------------------------

 	Plugin Name: Custom Blog Widget
 	Plugin URI: http://www.premiumpixels.com
 	Description: A widget that displays your latest blog
 	Version: 1.0
 	Author: Orman Clark
 	Author URI: http://www.premiumpixels.com
 
-----------------------------------------------------------------------------------*/


// Add function to widgets_init that'll load our widget
add_action( 'widgets_init', 'tz_blog_widgets' );

// Register widget
function tz_blog_widgets() {
	register_widget( 'tz_Blog_Widget' );
}

// Widget class
class tz_blog_widget extends WP_Widget {


/*-----------------------------------------------------------------------------------*/
/*	Widget Setup
/*-----------------------------------------------------------------------------------*/
	
function tz_Blog_Widget() {

	// Widget settings
	$widget_ops = array(
		'classname' => 'tz_blog_widget',
		'description' => __('A widget that displays your latest blog posts.', 'framework')
	);

	// Widget control settings
	$control_ops = array(
		'width' => 300,
		'height' => 350,
		'id_base' => 'tz_blog_widget'
	);

	/* Create the widget. */
	$this->WP_Widget( 'tz_blog_widget', __('Custom Blog Widget', 'framework'), $widget_ops, $control_ops );
	
}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
function widget( $args, $instance ) {
	extract( $args );

	// Our variables from the widget settings
	$title = apply_filters('widget_title', $instance['title'] );
	$number = $instance['number'];

	// Before widget (defined by theme functions file)
	echo $before_widget;

	// Display the widget title if one was input
	if ( $title )
		echo $before_title . $title . $after_title;

	// Display blog widget
	?>
		
        <!--BEGIN .tz_blog-->
		<div class="tz_blog">
        	
            <?php 
			$query = new WP_Query();
			$query->query('posts_per_page='. $number);
			while ($query->have_posts()) : $query->the_post(); 
			?>
		
            <!--BEGIN .hentry -->
            <div <?php post_class(); ?> id="post-widget-<?php the_ID(); ?>">
                                
                <h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s', 'framework'), get_the_title()); ?>"> <?php the_title(); ?></a></h2>
                
                <!--BEGIN .entry-meta .entry-header-->
                <div class="entry-meta entry-header">
                    <span class="published"><?php the_time( get_option('date_format') ); ?></span>
                    <span class="meta-sep">&middot;</span>
                    <span class="comment-count"><?php comments_popup_link(__('No Comments', 'framework'), __('1 Comment', 'framework'), __('% Comments', 'framework')); ?></span>
                    <?php edit_post_link( __('edit', 'framework'), '<span class="edit-post">[', ']</span>' ); ?>
                <!--END .entry-meta entry-header -->
                </div>
        
                <!--BEGIN .entry-content -->
                <div class="entry-content">
                    <?php the_excerpt(); ?>
                <!--END .entry-content -->
                </div>
            
            <!--END .hentry-->  
            </div>
			
			<?php endwhile; wp_reset_query(); ?>
		
        <!--END .tz_blog-->
		</div>
	
	
	<?php

	// After widget (defined by theme functions file)
	echo $after_widget;
	
}


/*-----------------------------------------------------------------------------------*/
/*	Update Widget
/*-----------------------------------------------------------------------------------*/
	
function update( $new_instance, $old_instance ) {
	$instance = $old_instance;

	// Strip tags to remove HTML (important for text inputs)
	$instance['title'] = strip_tags( $new_instance['title'] );
	$instance['number'] = strip_tags( $new_instance['number']);

	// No need to strip tags

	return $instance;
}


/*-----------------------------------------------------------------------------------*/
/*	Widget Settings (Displays the widget settings controls on the widget panel)
/*-----------------------------------------------------------------------------------*/
	 
function form( $instance ) {

	// Set up some default widget settings
	$defaults = array(
		'title' => 'From the Blog',
		'number' => 1
	);
	
	$instance = wp_parse_args( (array) $instance, $defaults ); ?>

	<!-- Widget Title: Text Input -->
	<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e('Title:', 'framework') ?></label>
		<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" />
	</p>

	<!-- Embed Code: Text Input -->
	<p>
		<label for="<?php echo $this->get_field_id( 'number' ); ?>"><?php _e('Posts Number:', 'framework') ?></label>
		<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'number' ); ?>" name="<?php echo $this->get_field_name( 'number' ); ?>" value="<?php echo $instance['number']; ?>" />
	</p>

	<?php
	}
}
?>