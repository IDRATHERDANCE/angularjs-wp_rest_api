
		<!-- END #content -->
		</div>
        
    <!-- END #container -->
    </div> 	
    
    <!-- BEGIN #footer-container -->
    <div id="footer-container">
    	
        <!-- BEGIN #footer-widgets -->
    	<div id="footer-widgets">
        	
            <!-- BEGIN .widget-wrap -->
            <div class="widget-wrap clearfix">
            	
                <!-- BEGIN .widget-section -->
                <div class="widget-section">
                	
                    <?php /* Widgetised Area */ if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar( 'Footer One' ) ) ?>
                    
                <!-- END .widget-section -->   
                </div>
                
                <!-- BEGIN .widget-section -->
                <div class="widget-section">
                
                	<?php /* Widgetised Area */ if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar( 'Footer Two' ) ) ?>
                    
                <!-- END .widget-section -->   
                </div>
                
                <!-- BEGIN .widget-section -->
                <div class="widget-section">
                
                	<?php /* Widgetised Area */ if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar( 'Footer Three' ) ) ?>
                    
                <!-- END .widget-section -->   
                </div>
                
                <!-- BEGIN .widget-section -->
                <div class="widget-section">
                
                	<?php /* Widgetised Area */ if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar( 'Footer Four' ) ) ?>
                    
                <!-- END .widget-section -->   
                </div>
            
            <!-- END .widget-wrap -->
       		</div>
            
        <!-- END #footer-widgets -->
        </div>
    
        <!-- BEGIN #footer -->
        <div id="footer" class="clearfix">
        
            <p class="copyright">&copy; Copyright <?php echo date( 'Y' ); ?>. <?php _e('Powered by', 'framework') ?> <a href="http://wordpress.org/">WordPress</a>.<br /><a href="http://www.premiumpixels.com/classica">Classica Theme</a> by <a href="http://www.premiumpixels.com">Orman Clark</a></p>
            
            <p class="credit"><?php if (get_option('tz_footer_text')) echo stripslashes(get_option('tz_footer_text')); ?></p>
        
        <!-- END #footer -->
        </div>
	
    <!-- END #footer-container -->
	</div>
		
	<!-- Theme Hook -->
	<?php wp_footer(); ?>
			
<!--END body-->
</body>
<!--END html-->
</html>