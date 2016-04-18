<?php

/*-----------------------------------------------------------------------------------

	Add "Heading" custom fields to pages + posts

-----------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------------*/
/*	Define Metabox Fields
/*-----------------------------------------------------------------------------------*/

$tz_heading_meta_boxes = array(
	"heading" => array(
		"name" => "heading",
		"type" => "input",
		"std" => "",
		"title" => "Heading"
		)
);


/*-----------------------------------------------------------------------------------*/
/*	Show fields in meta box
/*-----------------------------------------------------------------------------------*/

function tz_heading_meta_boxes() {
global $post, $tz_heading_meta_boxes;
	
	foreach($tz_heading_meta_boxes as $meta_box) {
		
		echo'<input type="hidden" name="'.$meta_box['name'].'_noncename" id="'.$meta_box['name'].'_noncename" value="'.wp_create_nonce( plugin_basename(__FILE__) ).'" />';
		
		echo'<h4>'.$meta_box['title'].'</h4>';
		
		if( $meta_box['type'] == "input" ) { 
		
			$meta_box_value = get_post_meta($post->ID, $meta_box['name'].'_value', true);
		
			if($meta_box_value == "")
				$meta_box_value = $meta_box['std'];
		
			echo'<input type="text" name="'.$meta_box['name'].'_value" value="'.$meta_box_value.'" style="width:90%"/><br />';
			
		} elseif( $meta_box['type'] == "textarea" ) { 
		
			$meta_box_value = get_post_meta($post->ID, $meta_box['name'].'_value', true);
		
			if($meta_box_value == "")
				$meta_box_value = $meta_box['std'];
		
			echo'<textarea name="'.$meta_box['name'].'_value" value="'.$meta_box_value.'" style="width:90%">'.stripslashes($meta_box_value).'</textarea><br />';
			echo '<p>'.$meta_box['desc'].'</p>';
			
		} elseif ( $meta_box['type'] == "select" ) {
			
			echo'<select name="'.$meta_box['name'].'_value">';
			
			foreach ($meta_box['options'] as $option) {
                
				echo'<option';
				if ( get_post_meta($post->ID, $meta_box['name'].'_value', true) == $option ) { 
					echo ' selected="selected"'; 
				} elseif ( $option == $meta_box['std'] ) { 
					echo ' selected="selected"'; 
				} 
				echo'>'. $option .'</option>';
			
			} 
			
			echo'</select>';
			
			}elseif ( $meta_box['type'] == "upload" ) {
			
				echo 'upload box';
				
			}
		
	}

}


/*-----------------------------------------------------------------------------------*/
/*	Add metabox to pages
/*-----------------------------------------------------------------------------------*/

function create_meta_box() {
global $theme_name, $tz_heading_meta_boxes, $port_meta_boxes;
	if (function_exists('add_meta_box') ) {
	add_meta_box( 'new-meta-boxes', __('Heading', 'framework'), 'tz_heading_meta_boxes', 'post', 'normal', 'high' );
	add_meta_box( 'new-meta-boxes', __('Heading', 'framework'), 'tz_heading_meta_boxes', 'page', 'normal', 'high' );
	add_meta_box( 'new-meta-boxes', __('Heading', 'framework'), 'tz_heading_meta_boxes', 'portfolio', 'normal', 'high' );
	}
}


/*-----------------------------------------------------------------------------------*/
/*	Save data when post is edited
/*-----------------------------------------------------------------------------------*/

function save_postdata( $post_id ) {
	global $post, $tz_heading_meta_boxes, $port_meta_boxes;  
		foreach($tz_heading_meta_boxes as $meta_box) {  

		
		// Verify  
		if ( !wp_verify_nonce( $_POST[$meta_box['name'].'_noncename'], plugin_basename(__FILE__) )) {  
		return $post_id;  
		}  
	
	if ( 'page' == $_POST['post_type'] ) {  
	if ( !current_user_can( 'edit_page', $post_id ))  
	return $post_id;  
	} else {  
	if ( !current_user_can( 'edit_post', $post_id ))  
	return $post_id;  
	}  
	
	$data = $_POST[$meta_box['name'].'_value'];  
	
	if(get_post_meta($post_id, $meta_box['name'].'_value') == "")  
	add_post_meta($post_id, $meta_box['name'].'_value', $data, true);  
	elseif($data != get_post_meta($post_id, $meta_box['name'].'_value', true))  
	update_post_meta($post_id, $meta_box['name'].'_value', $data);  
	elseif($data == "")  
	delete_post_meta($post_id, $meta_box['name'].'_value', get_post_meta($post_id, $meta_box['name'].'_value', true));  
	}
	
	if($port_meta_boxes) {
		
		foreach($port_meta_boxes as $meta_box) {  
			
			// Verify  
			if ( !wp_verify_nonce( $_POST[$meta_box['name'].'_noncename'], plugin_basename(__FILE__) )) {  
			return $post_id;  
			}  
		
		if ( 'page' == $_POST['post_type'] ) {  
		if ( !current_user_can( 'edit_page', $post_id ))  
		return $post_id;  
		} else {  
		if ( !current_user_can( 'edit_post', $post_id ))  
		return $post_id;  
		}  
		
		$data = $_POST[$meta_box['name'].'_value'];  
		
		if(get_post_meta($post_id, $meta_box['name'].'_value') == "")  
		add_post_meta($post_id, $meta_box['name'].'_value', $data, true);  
		elseif($data != get_post_meta($post_id, $meta_box['name'].'_value', true))  
		update_post_meta($post_id, $meta_box['name'].'_value', $data);  
		elseif($data == "")  
		delete_post_meta($post_id, $meta_box['name'].'_value', get_post_meta($post_id, $meta_box['name'].'_value', true));  
		}
	
	}
	
}

add_action('admin_menu', 'create_meta_box');
add_action('save_post', 'save_postdata');



?>