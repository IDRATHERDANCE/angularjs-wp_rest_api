<?php

add_action('init','tz_options');

if (!function_exists('tz_options')) {
function tz_options(){
	
// VARIABLES
$themename = get_theme_data(STYLESHEETPATH . '/style.css');
$themename = $themename['Name'];
$shortname = "tz";

// Populate option in array for use in theme
global $tz_options;
$tz_options = get_option('tz_options');

$GLOBALS['template_path'] = TZ_DIRECTORY;

//Access the WordPress Categories via an Array
$tz_categories = array();  
$tz_categories_obj = get_categories('hide_empty=0');
foreach ($tz_categories_obj as $tz_cat) {
    $tz_categories[$tz_cat->cat_ID] = $tz_cat->cat_name;}
$categories_tmp = array_unshift($tz_categories, "Select a category:");    
       
//Access the WordPress Pages via an Array
$tz_pages = array();
$tz_pages_obj = get_pages('sort_column=post_parent,menu_order');    
foreach ($tz_pages_obj as $tz_page) {
    $tz_pages[$tz_page->ID] = $tz_page->post_name; }
$tz_pages_tmp = array_unshift($tz_pages, "Select a page:");       

// Image Alignment radio box
$options_thumb_align = array("alignleft" => "Left","alignright" => "Right","aligncenter" => "Center"); 

// Image Links to Options
$options_image_link_to = array("image" => "The Image","post" => "The Post"); 

//Testing 
$options_select = array("one","two","three","four","five"); 
$options_radio = array("one" => "One","two" => "Two","three" => "Three","four" => "Four","five" => "Five"); 

//Stylesheets Reader
$alt_stylesheet_path = TZ_FILEPATH . '/css/';
$alt_stylesheets = array();

if ( is_dir($alt_stylesheet_path) ) {
    if ($alt_stylesheet_dir = opendir($alt_stylesheet_path) ) { 
        while ( ($alt_stylesheet_file = readdir($alt_stylesheet_dir)) !== false ) {
            if(stristr($alt_stylesheet_file, ".css") !== false) {
                $alt_stylesheets[] = $alt_stylesheet_file;
            }
        }    
    }
}

//More Options
$uploads_arr = wp_upload_dir();
$all_uploads_path = $uploads_arr['path'];
$all_uploads = get_option('tz_uploads');
$other_entries = array("Select a number:","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19");
$body_repeat = array("no-repeat","repeat-x","repeat-y","repeat");
$body_pos = array("top left","top center","top right","center left","center center","center right","bottom left","bottom center","bottom right");

// Set the Options Array
$options = array();




$options[] = array( "name" => __('General Settings','framework'),
                    "type" => "heading");
                    
$options[] = array( "name" => "",
					"message" => __('Control and configure the general setup of your theme. Upload your preferred logo, setup your feeds and insert your analytics tracking code.','framework'),
					"type" => "intro");
                    
$options[] = array( "name" => __('Enable Plain Text Logo','framework'),
					"desc" => __('Check this to enable a plain text logo rather than an image.','framework'),
					"id" => $shortname."_plain_logo",
					"std" => "false",
					"type" => "checkbox");

$options[] = array( "name" => __('Custom Logo','framework'),
					"desc" => __('Upload a logo for your theme, or specify the image address of your online logo. (http://example.com/logo.png)','framework'),
					"id" => $shortname."_logo",
					"std" => "",
					"type" => "upload");
					
$options[] = array( "name" => __('Custom Favicon','framework'),
					"desc" => __('Upload a 16px x 16px Png/Gif image that will represent your website\'s favicon.','framework'),
					"id" => $shortname."_custom_favicon",
					"std" => "",
					"type" => "upload");
					
$options[] = array( "name" => __('Contact Form Email Address','framework'),
					"desc" => __('Enter the email address where you\'d like to receive emails from the contact form, or leave blank to use admin email.','framework'),
					"id" => $shortname."_email",
					"std" => "",
					"type" => "text");
					
$options[] = array( "name" => __('FeedBurner URL','framework'),
					"desc" => __('Enter your full FeedBurner URL (or any other preferred feed URL) if you wish to use FeedBurner over the standard WordPress Feed e.g. http://feeds.feedburner.com/yoururlhere','framework'),
					"id" => $shortname."_feedburner",
					"std" => "",
					"type" => "text");
					
$options[] = array( "name" => __('Footer Text','framework'),
					"desc" => __('Enter the text you would like to display in the footer of your site.','framework'),
					"id" => $shortname."_footer_text",
					"std" => "You can find me bumming around <a href=\"http://www.twitter.com/ormanclark\">Twitter</a>, <a href=\"http://dribbble.com/ormanclark\">Dribbble</a> &amp; <a href=\"http://forrst.com/people/ormanclark/posts\">Forrst</a>",
					"type" => "textarea");

$options[] = array( "name" => __('Tracking Code','framework'),
					"desc" => __('Paste your Google Analytics (or other) tracking code here. It will be inserted before the closing body tag of your theme.','framework'),
					"id" => $shortname."_google_analytics",
					"std" => "",
					"type" => "textarea");                                                    




$options[] = array( "name" => __('Styling Options','framework'),
					"type" => "heading");
					
$options[] = array( "name" => "",
					"message" => __('Configure the visual appearance of you theme by selecting a stylesheet if applicable, choosing your overall layout and inserting any custom CSS necessary.','framework'),
					"type" => "intro");

$options[] = array( "name" => __('Primary link Colour (default #88BBC8)','framework'),
					"desc" => __('Your primary link colour.','framework'),
					"id" => $shortname."_primary_colour",
					"std" => "#88BBC8",
					"type" => "color"); 
					
$options[] = array( "name" => __('Primary link hover Colour (default #f26535)','framework'),
					"desc" => __('Your primary link Hover colour.','framework'),
					"id" => $shortname."_primary_hover_colour",
					"std" => "#f26535",
					"type" => "color");				

$url = TZ_DIRECTORY . '/admin/images/';
$options[] = array( "name" => __('Main Layout','framework'),
					"desc" => __('Select main content and sidebar alignment.','framework'),
					"id" => $shortname."_layout",
					"std" => "layout-2cr",
					"type" => "images",
					"options" => array(
						'layout-2cr' => $url . '2cr.png',
						'layout-2cl' => $url . '2cl.png')
					);
					
$options[] = array( "name" => __('Custom CSS','framework'),
                    "desc" => __('Quickly add some CSS to your theme by adding it to this block.','framework'),
                    "id" => $shortname."_custom_css",
                    "std" => "",
                    "type" => "textarea");




$options[] = array( "name" => __('Homepage Settings','framework'),
                    "type" => "heading");
                    
$options[] = array( "name" => "",
					"message" => __('Setup the display of your homepage. Choose to display a welcome message and enter the text for your blog and portfolio sections.','framework'),
					"type" => "intro");
					
$options[] = array( "name" => __('Display Welcome Message','framework'),
					"desc" => __('Check this to enable the welcome message','framework'),
					"id" => $shortname."_enable_welcome_message",
					"std" => "false",
					"type" => "checkbox");
					
					
$options[] = array( "name" => __('Home Welcome Message','framework'),
					"desc" => __('The large welcome message that appears above the slider.','framework'),
					"id" => $shortname."_home_message",
					"std" => "Hey there! I'm John Doe and I make awesome WordPress themes. This can be used to describe what you do, how you do it, and who you do it for.",
					"type" => "textarea");					
	
$options[] = array( "name" => __('Display Recent Portfolio','framework'),
					"desc" => __('Check this to enable the recent portfolio section','framework'),
					"id" => $shortname."_recent_portfolio",
					"std" => "false",
					"type" => "checkbox");
					
$options[] = array( "name" => __('Portfolio Posts','framework'),
					"desc" => __('Enter the amount of portfolio posts you would like to show on the homepage.','framework'),
					"id" => $shortname."_portfolio_number",
					"std" => "3",
					"type" => "text");
					
$options[] = array( "name" => __('Portfolio Title','framework'),
					"desc" => __('Enter the title of the portfolio area.','framework'),
					"id" => $shortname."_portfolio_title",
					"std" => "Recent Projects",
					"type" => "text");
					
$options[] = array( "name" => __('Portfolio Description','framework'),
					"desc" => __('Enter the description of the portfolio area.','framework'),
					"id" => $shortname."_portfolio_description",
					"std" => "Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Nullam id...",
					"type" => "textarea");
					
					
$options[] = array( "name" => __('Portfolio Page','framework'),
					"desc" => __('Select the page used as a portfolio, this will be used for the portfolio link.','framework'),
					"id" => $shortname."_portfolio_page",
					"std" => "Select a page:",
					"type" => "select-page");
					
$options[] = array( "name" => __('Display Recent Posts','framework'),
					"desc" => __('Check this to enable the recent post section','framework'),
					"id" => $shortname."_recent_posts",
					"std" => "false",
					"type" => "checkbox");
					
$options[] = array( "name" => __('Recent Posts','framework'),
					"desc" => __('Enter the amount of recent posts you would like to show on the homepage.','framework'),
					"id" => $shortname."_recent_number",
					"std" => "3",
					"type" => "text");
					
$options[] = array( "name" => __('Recent Title','framework'),
					"desc" => __('Enter the title of the portfolio area.','framework'),
					"id" => $shortname."_recent_title",
					"std" => "Recently Published",
					"type" => "text");
					
$options[] = array( "name" => __('Recent Description','framework'),
					"desc" => __('Enter the description of the recent posts area.','framework'),
					"id" => $shortname."_recent_description",
					"std" => "Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Nullam id...",
					"type" => "textarea");
					
$options[] = array( "name" => __('Blog Page','framework'),
					"desc" => __('Select the page used as a blog, this will be used for the blog link.','framework'),
					"id" => $shortname."_blog_page",
					"std" => "Select a page:",
					"type" => "select-page");
					
					


$options[] = array( "name" => __('Slider Options','framework'),
					"type" => "heading");
					
$options[] = array( "name" => "",
					"message" => __('Setup and configure your homepage slider. Upload your slider images and link them to URLs of your choice.','framework'),
					"type" => "intro");

$options[] = array( "name" => __('Enable Slider','framework'),
					"desc" => __('Check this to enable the slider on the homepage.','framework'),
					"id" => $shortname."_enable_slider",
					"std" => "false",
					"type" => "checkbox");
					
$options[] = array( "name" => __('Slider Autoplay','framework'),
					"desc" => __('Choose the time in milliseconds between slider transitions where 1000 = 1second. Leave blank to disable.','framework'),
					"id" => $shortname."_slider_autoplay",
					"std" => "5000",
					"type" => "text");	
					
$options[] = array( "name" => __('Slider Image 1','framework'),
					"desc" => __('Image must be 940px x 350px','framework'),
					"id" => $shortname."_slider_1",
					"std" => "",
					"type" => "upload_min");
					
$options[] = array( "name" => __('Slider Image 1 URL','framework'),
					"desc" => __('Choose a link URL for this image.','framework'),
					"id" => $shortname."_slider_url_1",
					"std" => "",
					"type" => "text");
					
$options[] = array( "name" => __('Slider Image 2','framework'),
					"desc" => __('Image must be 940px x 350px','framework'),
					"id" => $shortname."_slider_2",
					"std" => "",
					"type" => "upload_min");
					
$options[] = array( "name" => __('Slider Image 2 URL','framework'),
					"desc" => __('Choose a link URL for this image.','framework'),
					"id" => $shortname."_slider_url_2",
					"std" => "",
					"type" => "text");
					
$options[] = array( "name" => __('Slider Image 3','framework'),
					"desc" => __('Image must be 940px x 350px','framework'),
					"id" => $shortname."_slider_3",
					"std" => "",
					"type" => "upload_min");
					
$options[] = array( "name" => __('Slider Image 3 URL','framework'),
					"desc" => __('Choose a link URL for this image.','framework'),
					"id" => $shortname."_slider_url_3",
					"std" => "",
					"type" => "text");
					
$options[] = array( "name" => __('Slider Image 4','framework'),
					"desc" => __('Image must be 940px x 350px','framework'),
					"id" => $shortname."_slider_4",
					"std" => "",
					"type" => "upload_min");
					
$options[] = array( "name" => __('Slider Image 4 URL','framework'),
					"desc" => __('Choose a link URL for this image.','framework'),
					"id" => $shortname."_slider_url_4",
					"std" => "",
					"type" => "text");
					
$options[] = array( "name" => __('Slider Image 5','framework'),
					"desc" => __('Image must be 940px x 350px','framework'),
					"id" => $shortname."_slider_5",
					"std" => "",
					"type" => "upload_min");
					
$options[] = array( "name" => __('Slider Image 5 URL','framework'),
					"desc" => __('Choose a link URL for this image.','framework'),
					"id" => $shortname."_slider_url_5",
					"std" => "",
					"type" => "text");



                    


$options[] = array( "name" => __('Menu Options','framework'),
					"type" => "heading");
					
$options[] = array( "name" => "",
					"message" => __('The following options allow you to configure your menus. Note: These settings will be overwritten if you are using custom menus functionality.','framework'),
					"type" => "intro");
                    
$options[] = array( "name" => __('Exclude From Primary Navigation','framework'),
					"desc" => __('Enter a comma-separated list of any Page IDs you wish to exclude from the navigation (e.g. 1,5,6,)','framework'),
					"id" => $shortname."_primary_nav_exclude",
					"std" => "",
					"type" => "text");
					
$options[] = array( "name" => __('Menu Order','framework'),
					"desc" => __('Select the view order you wish to set for the main navigation.','framework'),
					"id" => $shortname."_primary_nav_order",
					"std" => "ID",
					"type" => "select",
					"options" => array('post_title', 'menu_order', 'ID'));
					
					
					
					
$options[] = array( "name" => __('Posts &amp; Portfolio','framework'),
					"type" => "heading");
					
$options[] = array( "name" => "",
					"message" => __('Here you can configure how you would like your posts and portfolio pages to function.','framework'),
					"type" => "intro");

$options[] = array( "name" => __('Enable Portfolio Slider','framework'),
					"desc" => __('Check this to enable the portfolio slider. If disabled, the images will appear underneath each other.','framework'),
					"id" => $shortname."_portfolio_enable_slider",
					"std" => "false",
					"type" => "checkbox");
									
$options[] = array( "name" => __('Portfolio Slider Autoplay','framework'),
					"desc" => __('Choose the time in milliseconds between slider transitions where 1000 = 1second. Leave blank to disable.','framework'),
					"id" => $shortname."_portfolio_slider_autoplay",
					"std" => "5000",
					"type" => "text");
					
					// Added v1.1
$options[] = array( "name" => __('Enable Lightbox','framework'),
					"desc" => __('Check this to enable the lightbox effect. If disabled, the images will link to their respective portfolio items.','framework'),
					"id" => $shortname."_lightbox",
					"std" => "true",
					"type" => "checkbox");
					// ------------------------
					
$options[] = array( "name" => __('Related Portfolio Title','framework'),
					"desc" => __('This is the title for the related portfolio area.','framework'),
					"id" => $shortname."_related_portfolio_title",
					"std" => "Similar Projects",
					"type" => "text");
					
$options[] = array( "name" => __('Related Portfolio Description','framework'),
					"desc" => __('This is the description for the related portfolio area.','framework'),
					"id" => $shortname."_related_portfolio_description",
					"std" => "Donec sed odio dui. Nulla vitae elit librero, a pharetra augue. Nullam id...",
					"type" => "textarea");
					
$options[] = array( "name" => __('Related Portfolio Number','framework'),
					"desc" => __('This is the number of related portfolio items you wish to show.','framework'),
					"id" => $shortname."_related_portfolio_number",
					"std" => "3",
					"type" => "text");
					
$options[] = array( "name" => __('Show Featured Image','framework'),
					"desc" => __('Check this to show the featured image at the beginning of each blog post.','framework'),
					"id" => $shortname."_post_img",
					"std" => "false",
					"type" => "checkbox");
					
$options[] = array( "name" => __('Comment Description','framework'),
					"desc" => __('This is a short description that is displayed near the comments.','framework'),
					"id" => $shortname."_comment_description",
					"std" => "Got something to say? Feel free, I want to hear from you!",
					"type" => "textarea");
					
$options[] = array( "name" => __('Respond Description','framework'),
					"desc" => __('This is a short description that is displayed near the comment form.','framework'),
					"id" => $shortname."_respond_description",
					"std" => "Let us know your thoughts on this post but remember to place nicely folks!",
					"type" => "textarea");


update_option('tz_template',$options); 					  
update_option('tz_themename',$themename);   
update_option('tz_shortname',$shortname);

}
}
?>
