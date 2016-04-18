<?php get_header(); ?>

<div class="content-title">
   
    
 <!--  <a href="javascript: void(0);" id="mode"<?php // if ($_COOKIE['mode'] == 'list') echo ' class="flip"'; ?>></a>-->
      <a href="javascript: void(0);" id="mode"<?php  if ($_COOKIE['mode'] != 'list') echo ' class="flip"'; ?>></a> 
</div>

<?php query_posts(array(
        //'post__not_in' => $exl_posts,
        'category_name' => 'Selected Works',
		'paged' => $paged,
    )
); ?>


<?php get_template_part('loop'); ?>

<?php wp_reset_query(); ?>

<?php get_template_part('pagination'); ?>

<?php get_footer(); ?>
