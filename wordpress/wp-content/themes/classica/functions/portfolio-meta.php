<?php

/*-----------------------------------------------------------------------------------

	Add image upload metaboxes to Portfolio items

-----------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------------*/
/*	Define Metabox Fields
/*-----------------------------------------------------------------------------------*/

$prefix = 'tz_';
 
$meta_box = array(
	'id' => 'tz-meta-box',
	'title' => 'Images',
	'page' => 'portfolio',
	'context' => 'normal',
	'priority' => 'high',
	'fields' => array(
	array(
			'name' => 'Image Thumbnail',
			'desc' => '210px x 160px',
			'id' => 'upload_image_thumb',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button_thumb',
			'type' => 'button',
			'std' => 'Browse'
		),
		
	array(
			'name' => 'Image 1 Height',
			'desc' => 'Enter the height of the first image.',
			'id' => 'image1_height',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => 'Image 1',
			'desc' => '700px x unlimited',
			'id' => 'upload_image',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button',
			'type' => 'button',
			'std' => 'Browse'
		),
	array(
			'name' => 'Image 2',
			'desc' => '700px x unlimited',
			'id' => 'upload_image2',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button2',
			'type' => 'button',
			'std' => 'Browse'
		),
	array(
			'name' => 'Image 3',
			'desc' => '700px x unlimited',
			'id' => 'upload_image3',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button3',
			'type' => 'button',
			'std' => 'Browse'
		),
	array(
			'name' => 'Image 4',
			'desc' => '700px x unlimited',
			'id' => 'upload_image4',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button4',
			'type' => 'button',
			'std' => 'Browse'
		),
	array(
			'name' => 'Image 5',
			'desc' => '700px x unlimited',
			'id' => 'upload_image5',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button5',
			'type' => 'button',
			'std' => 'Browse'
		),
	array(
			'name' => 'Image 6',
			'desc' => '700px x unlimited',
			'id' => 'upload_image6',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button6',
			'type' => 'button',
			'std' => 'Browse'
		),
	array(
			'name' => 'Image 7',
			'desc' => '700px x unlimited',
			'id' => 'upload_image7',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button7',
			'type' => 'button',
			'std' => 'Browse'
		),
	array(
			'name' => 'Image 8',
			'desc' => '700px x unlimited',
			'id' => 'upload_image8',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button8',
			'type' => 'button',
			'std' => 'Browse'
		),
	array(
			'name' => 'Image 9',
			'desc' => '700px x unlimited',
			'id' => 'upload_image9',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button9',
			'type' => 'button',
			'std' => 'Browse'
		),
	array(
			'name' => 'Image 10',
			'desc' => '700px x unlimited',
			'id' => 'upload_image10',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => '',
			'desc' => '',
			'id' => 'upload_image_button10',
			'type' => 'button',
			'std' => 'Browse'
		),
	),
	
);

// Added v1.1
$meta_box_video = array(
	'id' => 'tz-meta-box-video',
	'title' => 'Video Settings',
	'page' => 'portfolio',
	'context' => 'normal',
	'priority' => 'high',
	'fields' => array(
	array(
			'name' => 'Youtube or Vimeo URL',
			'desc' => __('If you are using YouTube or Vimeo, please enter in the page URL here.', 'framework'),
			'id' => 'tz_video_url',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => 'Embedded Code',
			'desc' => __('If you are using something other than YouTube or Vimeo, paste the embed code here. Width is best at 700px with any height.<br><br> This field will override the above.', 'framework'),
			'id' => 'tz_embed_code',
			'type' => 'textarea',
			'std' => ''
		),
	array(
			'name' => 'Video Height',
			'desc' => __('Please enter the video height. 500 = (500px).', 'framework'),
			'id' => 'tz_video_height',
			'type' => 'text',
			'std' => ''
		),
	array(
			'name' => 'Additional Info',
			'desc' => __('Any content added here will display above the video. Feel free to use any HTML.', 'framework'),
			'id' => 'tz_additional_info',
			'type' => 'textarea',
			'std' => ''
		)
	),
	
);

//----

add_action('admin_menu', 'tz_add_box');


/*-----------------------------------------------------------------------------------*/
/*	Add metabox to edit page
/*-----------------------------------------------------------------------------------*/
 
function tz_add_box() {
	global $meta_box, $meta_box_video;
 
	add_meta_box($meta_box['id'], $meta_box['title'], 'tz_show_box', $meta_box['page'], $meta_box['context'], $meta_box['priority']);
	// Added v1.1
	add_meta_box($meta_box_video['id'], $meta_box_video['title'], 'tz_show_box_video', $meta_box_video['page'], $meta_box_video['context'], $meta_box_video['priority']);
	//-----
}


/*-----------------------------------------------------------------------------------*/
/*	Callback function to show fields in meta box
/*-----------------------------------------------------------------------------------*/

function tz_show_box() {
	global $meta_box, $post;
 	
	echo '<p style="padding:10px 0 0 0;">'.__('Upload an image and then click "insert into post". To delete an image, simply clear the field.', 'framework').'</p>';
	// Use nonce for verification
	echo '<input type="hidden" name="tz_meta_box_nonce" value="', wp_create_nonce(basename(__FILE__)), '" />';
 
	echo '<table class="form-table">';
 
	foreach ($meta_box['fields'] as $field) {
		// get current post meta data
		$meta = get_post_meta($post->ID, $field['id'], true);
		switch ($field['type']) {
 
			
			//If Text		
			case 'text':
			
			echo '<tr style="border-top:1px solid #eeeeee;">',
				'<th style="width:25%"><label for="', $field['id'], '"><strong>', $field['name'], '</strong><span style=" display:block; color:#999; margin:5px 0 0 0;">'. $field['desc'].'</span></label></th>',
				'<td>';
			echo '<input type="text" name="', $field['id'], '" id="', $field['id'], '" value="', $meta ? $meta : stripslashes(htmlspecialchars(( $field['std']), ENT_QUOTES)), '" size="30" style="width:75%; margin-right: 20px; float:left;" />';
			
			break;
 
			//If Button	
			case 'button':
				echo '<input style="float: left;" type="button" class="button" name="', $field['id'], '" id="', $field['id'], '"value="', $meta ? $meta : $field['std'], '" />';
				echo 	'</td>',
			'</tr>';
			
			break;
		}

	}
 
	echo '</table>';
}

// Added v1.1
function tz_show_box_video() {
	global $meta_box_video, $post;
 	
	echo '<p style="padding:10px 0 0 0;">'.__('These settings enable you to embed videos into your portfolio pages.', 'framework').'</p>';
	// Use nonce for verification
	echo '<input type="hidden" name="tz_meta_box_nonce" value="', wp_create_nonce(basename(__FILE__)), '" />';
 
	echo '<table class="form-table">';
 
	foreach ($meta_box_video['fields'] as $field) {
		// get current post meta data
		$meta = get_post_meta($post->ID, $field['id'], true);
		switch ($field['type']) {
 
			
			//If Text		
			case 'text':
			
			echo '<tr style="border-top:1px solid #eeeeee;">',
				'<th style="width:25%"><label for="', $field['id'], '"><strong>', $field['name'], '</strong><span style="line-height:20px; display:block; color:#999; margin:5px 0 0 0;">'. $field['desc'].'</span></label></th>',
				'<td>';
			echo '<input type="text" name="', $field['id'], '" id="', $field['id'], '" value="', $meta ? $meta : $field['std'],'" size="30" style="width:75%; margin-right: 20px; float:left;" />';
			
			break;
			
			//If textarea		
			case 'textarea':
			
			echo '<tr style="border-top:1px solid #eeeeee;">',
				'<th style="width:25%"><label for="', $field['id'], '"><strong>', $field['name'], '</strong><span style="line-height:18px; display:block; color:#999; margin:5px 0 0 0;">'. $field['desc'].'</span></label></th>',
				'<td>';
			echo '<textarea name="', $field['id'], '" id="', $field['id'], '" value="', $meta ? $meta : $field['std'], '" rows="8" cols="5" style="width:100%; margin-right: 20px; float:left;">', $meta ? $meta : $field['std'], '</textarea>';
			
			break;
 
			//If Button	
			case 'button':
				echo '<input style="float: left;" type="button" class="button" name="', $field['id'], '" id="', $field['id'], '"value="', $meta ? $meta : $field['std'], '" />';
				echo 	'</td>',
			'</tr>';
			
			break;
		}

	}
 
	echo '</table>';
}
//------
 
add_action('save_post', 'tz_save_data');


/*-----------------------------------------------------------------------------------*/
/*	Save data when post is edited
/*-----------------------------------------------------------------------------------*/
 
function tz_save_data($post_id) {
	global $meta_box, $meta_box_video;
 
	// verify nonce
	if (!wp_verify_nonce($_POST['tz_meta_box_nonce'], basename(__FILE__))) {
		return $post_id;
	}
 
	// check autosave
	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		return $post_id;
	}
 
	// check permissions
	if ('page' == $_POST['post_type']) {
		if (!current_user_can('edit_page', $post_id)) {
			return $post_id;
		}
	} elseif (!current_user_can('edit_post', $post_id)) {
		return $post_id;
	}
 
	foreach ($meta_box['fields'] as $field) {
		$old = get_post_meta($post_id, $field['id'], true);
		$new = $_POST[$field['id']];
 
		if ($new && $new != $old) {
			update_post_meta($post_id, $field['id'], $new);
		} elseif ('' == $new && $old) {
			delete_post_meta($post_id, $field['id'], $old);
		}
	}
	
	// Added v1.1
	foreach ($meta_box_video['fields'] as $field) {
		$old = get_post_meta($post_id, $field['id'], true);
		$new = $_POST[$field['id']];
 
		if ($new && $new != $old) {
			update_post_meta($post_id, $field['id'], stripslashes(htmlspecialchars($new)));
		} elseif ('' == $new && $old) {
			delete_post_meta($post_id, $field['id'], $old);
		}
	}
	//----
}


/*-----------------------------------------------------------------------------------*/
/*	Queue Scripts
/*-----------------------------------------------------------------------------------*/
 
function tz_admin_scripts() {
	wp_enqueue_script('media-upload');
	wp_enqueue_script('thickbox');
	wp_register_script('tz-upload', get_template_directory_uri() . '/functions/js/upload-button.js', array('jquery','media-upload','thickbox'));
	wp_enqueue_script('tz-upload');
}
function tz_admin_styles() {
	wp_enqueue_style('thickbox');
}
add_action('admin_print_scripts', 'tz_admin_scripts');
add_action('admin_print_styles', 'tz_admin_styles');