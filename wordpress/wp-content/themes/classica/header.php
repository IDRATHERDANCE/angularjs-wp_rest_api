<!DOCTYPE html>

<!-- BEGIN html -->
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<!-- An Orman Clark design (http://www.premiumpixels.com) - Proudly powered by WordPress (http://wordpress.org) -->

<!-- BEGIN head -->
<head>

	<!-- Meta Tags -->
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	
	<!-- Title -->
	<title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
	
	<!-- Stylesheets -->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Droid+Serif:regular,italic,bold,bolditalic" type="text/css" />
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold" type="text/css" />
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/colours.php" type="text/css" media="screen" />
    
    <?php if(is_page_template('template-portfolio.php')) : ?>
    <!-- prettyPhoto for the portfolio page -->
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/prettyPhoto.css" type="text/css" media="screen" />
    <?php endif; ?>
	
	<!-- RSS & Pingbacks -->
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo( 'name' ); ?> RSS Feed" href="<?php if (get_option('tz_feedburner')) { echo get_option('tz_feedburner'); } else { bloginfo( 'rss2_url' ); } ?>" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    
    <!-- Theme Hook -->
	<?php wp_head(); ?>
    
	<!--[if lte IE 7]>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/ie7.css" type="text/css" media="screen" />
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/DD_belatedPNG_0.0.8a-min.js"></script>
    <script type="text/javascript">
      DD_belatedPNG.fix('.slides-nav a');
    </script>
    <![endif]-->
	

<!-- END head -->
</head>

<!-- BEGIN body -->
<body <?php body_class(); ?>>

	<!-- BEGIN #container -->
	<div id="container">
	
		<!-- BEGIN #header -->
		<div id="header" class="clearfix">
        
        	<!-- BEGIN #upper-wrap -->
			<div id="upper-wrap" class="clearfix">
			
                <!-- BEGIN #logo -->
                <div id="logo">
                    <?php /*
                    If "plain text logo" is set in theme options then use text
                    if a logo url has been set in theme options then use that
                    if none of the above then use the default logo.png */
                    if (get_option('tz_plain_logo') == 'true') { ?>
                    <a href="<?php echo home_url(); ?>"><?php bloginfo( 'name' ); ?></a>
                    <p id="tagline"><?php bloginfo( 'description' ); ?></p>
                    <?php } elseif (get_option('tz_logo')) { ?>
                    <a href="<?php echo home_url(); ?>"><img src="<?php echo get_option('tz_logo'); ?>" alt="<?php bloginfo( 'name' ); ?>"/></a>
                    <?php } else { ?>
                    <a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="<?php bloginfo( 'name' ); ?>" width="350" height="35" /></a>
                    <?php } ?>
                <!-- END #logo -->
                </div>
                
                <!-- BEGIN #primary-nav -->
                <div id="primary-nav">
                    <?php if ( has_nav_menu( 'primary-menu' ) ) { /* if menu location 'primary-menu' exists then use custom menu */ ?>
                    <?php wp_nav_menu( array( 'theme_location' => 'primary-menu' ) ); ?>
                    <?php } else { /* else use wp_list_categories */
                    $primary_exclude = get_option('tz_primary_nav_exclude'); ?>
                    <ul>
                        <?php wp_list_pages( array( 'exclude' => $primary_exclude, 'title_li' => '', 'sort_column' => get_option('tz_primary_nav_order') )); ?>
                    </ul>
                    <?php } ?>
                <!-- END #primary-nav -->
                </div>
                
            <!--END #upper-wrap-->
			</div>
			
		<!--END #header-->
		</div>

		<!--BEGIN #content -->
		<div id="content" class="clearfix">
		