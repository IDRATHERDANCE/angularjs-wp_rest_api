<?php

/* These are functions specific to the included option settings and this theme */


/*-----------------------------------------------------------------------------------*/
/* Output Custom CSS from theme options
/*-----------------------------------------------------------------------------------*/

function tz_head_css() {

		$shortname =  get_option('tz_shortname'); 
		$output = '';
		
		$custom_css = get_option('tz_custom_css');
		
		if ($custom_css <> '') {
			$output .= $custom_css . "\n";
		}
		
		// Output styles
		if ($output <> '') {
			$output = "<!-- Custom Styling -->\n<style type=\"text/css\">\n" . $output . "</style>\n";
			echo $output;
		}
	
}

add_action('wp_head', 'tz_head_css');


/*-----------------------------------------------------------------------------------*/
/* Add Body Classes for Layout
/*-----------------------------------------------------------------------------------*/

add_filter('body_class','tz_body_class');
 
function tz_body_class($classes) {
	$shortname = get_option('tz_shortname');
	$layout = get_option($shortname .'_layout');
	if ($layout == '') {
		$layout = 'layout-2cr';
	}
	$classes[] = $layout;
	return $classes;
}


/*-----------------------------------------------------------------------------------*/
/* Add Favicon
/*-----------------------------------------------------------------------------------*/

function tz_favicon() {
	$shortname = get_option('tz_shortname');
	if (get_option($shortname . '_custom_favicon') != '') {
	echo '<link rel="shortcut icon" href="'. get_option('tz_custom_favicon') .'"/>'."\n";
	}
	else { ?>
	<link rel="shortcut icon" href="<?php echo bloginfo('stylesheet_directory') ?>/admin/images/favicon.ico" />
	<?php }
}

add_action('wp_head', 'tz_favicon');


/*-----------------------------------------------------------------------------------*/
/* Show analytics code in footer */
/*-----------------------------------------------------------------------------------*/

function tz_analytics(){
	$shortname =  get_option('tz_shortname');
	$output = get_option($shortname . '_google_analytics');
	if ( $output <> "" ) 
		echo stripslashes($output) . "\n";
}
add_action('wp_footer','tz_analytics');


/*-----------------------------------------------------------------------------------*/
/* Show Slider JS if enabled from options
/*-----------------------------------------------------------------------------------*/

function tz_home_js() {
	
	if (is_page_template('template-home.php') ) {
		
		$autoplay = get_option('tz_slider_autoplay');
		
		?>
    	
        <script type="text/javascript">

		jQuery(document).ready(function() {
			
			if (jQuery().slides) {
				
				jQuery("#slider").slides({
					preload: true,
					effect: 'fade',
					fadeSpeed: 250,
					<?php if($autoplay != '') : ?>
					play: <?php echo $autoplay; ?>,
					<?php endif; ?>
					crossfade: true,
					generatePagination: false,
					autoHeight: true
				});
			}
			
		});
    
    </script>
    <?php
	}
}

add_action('wp_head', 'tz_home_js');


/*-----------------------------------------------------------------------------------*/
/* Show Slider JS on Portfolio pages if enabled
/*-----------------------------------------------------------------------------------*/

function tz_portfolio_js() {
	
	if (get_post_type() == 'portfolio' ) { 
	
	$autoplay = get_option('tz_portfolio_slider_autoplay');
	
	?>
    	
        <script type="text/javascript">

		jQuery(document).ready(function() {
			
			if (jQuery().slides) {
				
				jQuery("#slider").slides({
					preload: true,
					effect: 'fade',
					<?php if($autoplay != '') : ?>
					play: <?php echo $autoplay; ?>,
					<?php endif; ?>
					fadeSpeed: 250,
					// v 1.1 update, disable crossfade. Doesn't look too god with differnet sized images.
					//crossfade: true,
					generatePagination: false,
					autoHeight: true
				});
			}
			
		});
    
    </script>
    <?php
	}
}

if(get_option('tz_portfolio_enable_slider') == 'true') {
	add_action('wp_head', 'tz_portfolio_js');
}

/*-----------------------------------------------------------------------------------*/
/* ADDED V1.1 - Check video url functions
/*-----------------------------------------------------------------------------------*/

function tz_video($postid) {
	
	$video_url = get_post_meta($postid, 'tz_video_url', true);
	$height = get_post_meta($postid, 'tz_video_height', true);
	$embeded_code = get_post_meta($postid, 'tz_embed_code', true);
	
	if($height == '')
		$height = 500;

	if(trim($embeded_code) == '') 
	{
		
		if(preg_match('/youtube/', $video_url)) 
		{
			
			if(preg_match('/[\\?\\&]v=([^\\?\\&]+)/', $video_url, $matches))
			{
				$output = '<iframe title="YouTube video player" class="youtube-player" type="text/html" width="700" height="'.$height.'" src="http://www.youtube.com/embed/'.$matches[1].'" frameborder="0" allowFullScreen></iframe>';
			}
			else 
			{
				$output = __('Sorry that seems to be an invalid <strong>YouTube</strong> URL. Please check it again.', 'framework');
			}
			
		}
		elseif(preg_match('/vimeo/', $video_url)) 
		{
			
			if(preg_match('~^http://(?:www\.)?vimeo\.com/(?:clip:)?(\d+)~', $video_url, $matches))
			{
				$output = '<iframe src="http://player.vimeo.com/video/'.$matches[1].'" width="700" height="'.$height.'" frameborder="0"></iframe>';
			}
			else 
			{
				$output = __('Sorry that seems to be an invalid <strong>Vimeo</strong> URL. Please check it again. Make sure there is a string of numbers at the end.', 'framework');
			}
			
		}
		else 
		{
			$output = __('Sorry that is an invalid YouTube or Vimeo URL.', 'framework');
		}
		
		echo $output;
		
	}
	else
	{
		echo stripslashes(htmlspecialchars_decode($embeded_code));
	}
	
}

/*-----------------------------------------------------------------------------------*/
/* ADDED V1.1 - Ue the correct link if lightbox is on/off and include video if needed
/*-----------------------------------------------------------------------------------*/

function tz_lightbox($postid) {
	
	$lightbox = get_option('tz_lightbox');
	$thumb = get_post_meta($postid, 'upload_image_thumb', true);
	$link = get_post_meta($postid, 'upload_image', true);
	$video = get_post_meta($postid, 'tz_video_url', true);
	$height = get_post_meta($postid, 'tz_video_height', true);
	$embed = trim(get_post_meta($postid, 'tz_embed_code', true));
	
	$lightbox_height = $height + 20;
	
	if($thumb == '')
	{
		$thumb = get_the_post_thumbnail($postid, 'thumbnail-post');
	}
	else
	{
		$thumb = '<img src="'.$thumb.'" alt="'.get_the_title().'" />';
	}
	
	if($lightbox == 'true')
	{

		if($embed != '')
		{
			$output = '<a rel="prettyPhoto[gallery]" title="'.get_the_title($postid).'" href="'.get_template_directory_uri().'/includes/portfolio-video.php?id='.$postid.'&iframe=true&width=710&height='. $lightbox_height .'"><span class="overlay"></span>'.$thumb.'</a>';
		}
		elseif($video != '' && $embed == '') 
		{
			$output = '<a rel="prettyPhoto[gallery]" title="'.get_the_title($postid).'" href="'.$video.'"><span class="overlay"></span>'.$thumb.'</a>';
		}
		else
		{
			$output = '<a rel="prettyPhoto[gallery]" title="'.get_the_title($postid).'" href="'.$link.'"><span class="overlay"></span>'.$thumb.'</a>';
		}
		
	}
	else
	{	
		$output = '<a title="'.get_the_title($postid).'" href="'.get_permalink($postid).'">'.$thumb.'</a>';
	}
	
	echo $output;
}


?>