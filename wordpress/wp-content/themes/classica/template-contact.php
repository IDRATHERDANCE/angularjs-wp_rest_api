<?php
/*
Template Name: Contact
*/
?>

<?php 
$nameError = '';
$emailError = '';
$commentError = '';
if(isset($_POST['submitted'])) {
		if(trim($_POST['contactName']) === '') {
			$nameError = 'Please enter your name.';
			$hasError = true;
		} else {
			$name = trim($_POST['contactName']);
		}
		
		if(trim($_POST['email']) === '')  {
			$emailError = 'Please enter your email address.';
			$hasError = true;
		} else if (!eregi("^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,4}$", trim($_POST['email']))) {
			$emailError = 'You entered an invalid email address.';
			$hasError = true;
		} else {
			$email = trim($_POST['email']);
		}
			
		if(trim($_POST['comments']) === '') {
			$commentError = 'Please enter a message.';
			$hasError = true;
		} else {
			if(function_exists('stripslashes')) {
				$comments = stripslashes(trim($_POST['comments']));
			} else {
				$comments = trim($_POST['comments']);
			}
		}
			
		if(!isset($hasError)) {
			$emailTo = get_option('tz_email');
			if (!isset($emailTo) || ($emailTo == '') ){
				$emailTo = get_option('admin_email');
			}
			$subject = '[Contact Form] From '.$name;
			$body = "Name: $name \n\nEmail: $email \n\nComments: $comments";
			$headers = 'From: '.$name.' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $emailTo;
			
			mail($emailTo, $subject, $body, $headers);
			$emailSent = true;
		}
	
} ?>

<?php get_header(); ?>
			
			<h1 class="page-title">
				<?php 
				global $post;
				global $post;
				if(get_post_meta($post->ID, 'heading_value', true) != ''): 
					echo get_post_meta($post->ID, 'heading_value', true); 
				else: 
					the_title();
				endif; 
				?>
            </h1>
            
			<!--BEGIN #primary .hfeed-->
			<div id="primary" class="hfeed">
            		
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				
				<!--BEGIN .hentry -->
				<div <?php post_class(); ?> id="post-<?php the_ID(); ?>">	
                
					<!--BEGIN .clearfix -->
                    <div class="clearfix">		
    
                        <!--BEGIN .entry-content -->
					<div class="entry-content">

					<?php if(isset($emailSent) && $emailSent == true) { ?>
    
                        <div class="thanks">
                            <p><?php _e('Thanks, your email was sent successfully.', 'framework') ?></p>
                        </div>
    
                    <?php } else { ?>
    
                        <?php the_content(); ?>
            
                        <?php if(isset($hasError) || isset($captchaError)) { ?>
                            <p class="error"><?php _e('Sorry, an error occurred.', 'framework') ?><p>
                        <?php } ?>
        
                        <form action="<?php the_permalink(); ?>" id="contactForm" method="post">
                            <ul class="contactform">
                                <li><p>
                                <label for="contactName"><small><?php _e('Name', 'framework') ?> <span>*</span></small></label>
                                    <input type="text" name="contactName" id="contactName" value="<?php if(isset($_POST['contactName'])) echo $_POST['contactName'];?>" class="required requiredField" />
                                    <?php if($nameError != '') { ?>
                                        <span class="error"><?php echo $nameError; ?></span> 
                                    <?php } ?>
                                    </p>
                                </li>
                    
                                <li><p><label for="email"><small><?php _e('Email:', 'framework') ?><span>*</span></small></label>
                                    <input type="text" name="email" id="email" value="<?php if(isset($_POST['email']))  echo $_POST['email'];?>" class="required requiredField email" />
                                    <?php if($emailError != '') { ?>
                                        <span class="error"><?php echo $emailError; ?></span>
                                    <?php } ?>
                                    </p>
                                </li>
                    
                                <li class="textarea"><p><label for="commentsText"><small><?php _e('Message:', 'framework') ?><span>*</span></small></label>
                                    <textarea name="comments" id="commentsText" rows="20" cols="30" class="required requiredField"><?php if(isset($_POST['comments'])) { if(function_exists('stripslashes')) { echo stripslashes($_POST['comments']); } else { echo $_POST['comments']; } } ?></textarea>
                                    <?php if($commentError != '') { ?>
                                        <span class="error"><?php echo $commentError; ?></span> 
                                    <?php } ?>
                                    </p>
                                </li>
                    
                                <li class="buttons">
                                    <input type="hidden" name="submitted" id="submitted" value="true" />
                                    <button id="submit" type="submit"><?php _e('Send Email', 'framework') ?></button>
                                </li>
                            </ul>
                        </form>
                    <?php } ?>
                    </div><!-- .entry-content -->
                        
                    <!--END .clearfix -->
				    </div>     
                          
				<!--END .hentry-->  
				</div>

				<?php endwhile; ?>

			<?php else : ?>

				<!--BEGIN #post-0-->
				<div id="post-0" <?php post_class(); ?>>
				
					<h2 class="entry-title"><?php _e('Error 404 - Not Found', 'framework') ?></h2>
				
					<!--BEGIN .entry-content-->
					<div class="entry-content">
						<p><?php _e("Sorry, but you are looking for something that isn't here.", "framework") ?></p>
					<!--END .entry-content-->
					</div>
				
				<!--END #post-0-->
				</div>

			<?php endif; ?>
			<!--END #primary .hfeed-->
			</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>