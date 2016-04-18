<?php
/**
 * Plugin Name: Retract fields from JSON API
 * Description: Retract fields from JSON API
 * Author: IDRATHERDANCE
 * Author URI: 
 * Version: 0.1
 * Plugin 
 */

function qod_remove_extra_data( $data, $post, $context ) {

  if ( $context !== 'view' || is_wp_error( $data ) ) {
    return $data;
  }

  unset( $data['author'] );
  unset( $data['status'] );
  unset( $data['comment_status'] );
  unset( $data['ID'] );
    unset( $data['date'] );
    unset( $data['date_gmt'] );
    unset( $data['date_tz'] );
    unset( $data['featured_image'] );
    unset( $data['format'] );
    unset( $data['guid'] );
    unset( $data['link'] );
    unset( $data['menu_order'] );
    unset( $data['modified'] );
    unset( $data['modified_gmt'] );
    unset( $data['modified_tz'] );
    unset( $data['parent'] );
    unset( $data['ping_status'] );
    unset( $data['sticky'] );

    


  return $data;
}

add_filter( 'json_prepare_post', 'qod_remove_extra_data', 12, 3 );
