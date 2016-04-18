<!--satic PHP page for bots-->
<?
$request = $_GET['_escaped_fragment_'];
$request_l = substr($request, strrpos($request, '/') + 1);
$pageUrl = 'http://ninalieven.net'.$request;
$jsonurl = "http://ninalieven.net/wordpress/wp-json/posts?type[]=page&type[]=post";
$json = file_get_contents($jsonurl);
$json_output = json_decode($json);
$lenght = sizeof($json_output);

for ($x = 0; $x <= $lenght; $x++) {
    $p_slug = str_replace(" ", "-", strtolower($json_output[$x]->title));
        if ($p_slug==$request_l){
             $description = $json_output[$x]->excerpt;
             $imageUrl = $json_output[$x]->meta->hover_photo->url;   
             $pageTitle = ' - '. $json_output[$x]->title;
        }
    if ($request=='/'){
         $description = 'Portfolio Page of the Visual Artist and Product Designer Nina Lieven';
         $imageUrl = $json_output[1]->meta->hover_photo->url;   
         $pageTitle = '';
    }
} 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Nina Lieven<?php echo $pageTitle;?></title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta name="title" content="Nina Lieven<?php echo $pageTitle;?>" />
  <meta name="description" content="<?php echo $description; ?>" />
  <meta property="og:url" content="<?php echo $pageUrl; ?>" />
  <meta property="og:site_name" content="Nina Lieven Portfolio Website" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Nina Lieven<?php echo $pageTitle; ?>" />
  <meta property="og:image" content="<?php echo $imageUrl; ?>" />
  <meta property="og:description" content="<?php echo $description; ?>" />

        <!-- Twitter summary card metadata -->
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@ninalieven" />
        <meta property="twitter:title" content="Nina Lieven<?php echo $pageTitle; ?>" />
        <meta property="twitter:description" content="<?php echo $description; ?>" />
        <meta property="twitter:image" content="<?php echo $imageUrl; ?>" />
        <meta property="twitter:url" content="<?php echo $pageUrl; ?>" />

</head>
<body>
    <?php echo $description; ?>
    <img src="<?php echo $imageUrl; ?>">
</body>
</html>