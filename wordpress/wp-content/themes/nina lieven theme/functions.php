<?php
	






function insert_delete_category() {

$pages = get_pages(); 
    

  foreach ( $pages as $page ) {
  	

      
 $option = strtolower($page->post_title);
 
$pattern = '/\s+/';

$pag_n = preg_replace($pattern, '-', $option);
    
      
   $sit[] = $pag_n;
  	  
	  wp_insert_term(
		$pag_n,
		'category',
		array(
		  'description'	=> 'Use this This category for post on the page '. $pag_n,
		  'slug' 		=> $pag_n
		)
	);  

}
    



global $wpdb;

    
    $page_nms = $wpdb->get_results("SELECT post_name FROM $wpdb->posts WHERE post_type = 'page' AND post_status = 'trash' ");
    

 
  foreach ( $page_nms as $tra ) {
   
$bla = $tra->post_title;
    $sa = get_cat_ID($bla);
    if ($sa!=0){
     
        wp_delete_category($sa); 
            }
       }

  
    
    
   $cats = get_categories(hide_empty,false);
    
foreach ( $cats as $ca ) {

     $pag_c[] = $ca->slug;
    


}
    
$result=array_diff($pag_c, $sit);
     
    foreach ( $result as $ru ) {
   


    $sva = get_cat_ID($ru);
    if ($sva!=0){
     
        wp_delete_category($sva); 
            }
       }
    
    
   } 
    







add_action( 'after_setup_theme', 'insert_delete_category');





//add_filter('json_prepare_post', 'json_api_encode_acf');
//
//function json_api_encode_acf($post) {
//    
//    $acf = get_fields($post['ID']);
//    
//    if (isset($post)) {
//      $post['acf'] = $acf;
//    }
//
//    return $post;
//
//}











