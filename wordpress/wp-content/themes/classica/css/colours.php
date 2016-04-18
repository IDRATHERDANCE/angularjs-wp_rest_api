<?php 
header("Content-type: text/css");

if(file_exists('../../../../wp-load.php')) :
	include '../../../../wp-load.php';
else:
	include '../../../../../wp-load.php';
endif; 

ob_flush(); 
?>

/*==========================================================================================
	
This file contains styles related to the colour scheme of the theme

==========================================================================================*/

<?php 
$primary = get_option('tz_primary_colour');
$hover = get_option('tz_primary_hover_colour');
?>


a,
.tz_tweet_widget ul li span a { color: <?php echo $primary; ?>; }

a:hover,
#commentform small span,
.tz_blog .entry-title a:hover,
.tz_tweet_widget ul li span a:hover,
#primary .entry-meta a:hover,
.recent-wrap .entry-title a:hover,
.tab-comments h3 a:hover,
.author-tag { color: <?php echo $hover; ?>; }

::selection { background: <?php echo $hover; ?>; color: #fff; }

::-moz-selection { background: <?php echo $hover; ?>; color: #fff; }

<?php ob_end_flush(); ?>