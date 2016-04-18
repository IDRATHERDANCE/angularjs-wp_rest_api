		<!--BEGIN #sidebar .aside-->
		<div id="sidebar" class="aside">
			
			<?php 
			if(!is_page()) :
			/* Widgetised Area */ if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar() ) : ?>
				
                <?php
				
				endif;
			else:
			/* Widgetised Area */ if ( !function_exists( 'dynamic_sidebar' ) || !dynamic_sidebar('Page Sidebar') ) : ?>
                
                <?php
				endif;
			endif;
			?>
		
		<!--END #sidebar .aside-->
		</div>