<?php
/**
 * Expositio back compat functionality.
 *
 * Prevents Expositio from running on WordPress versions prior to 3.6,
 * since this theme is not meant to be backwards compatible and relies on
 * many new functions and markup changes introduced in 3.6.
 */

/**
 * Prevent switching to Expositio on old versions of WordPress. Switches
 * to the default theme.
 *
 * @return void
 */
function expositio_switch_theme() {
	switch_theme(WP_DEFAULT_THEME, WP_DEFAULT_THEME);
	unset($_GET['activated']);
	add_action('admin_notices', 'expositio_upgrade_notice');
}
add_action('after_switch_theme', 'expositio_switch_theme');

/**
 * Prints an update nag after an unsuccessful attempt to switch to
 * Expositio on WordPress versions prior to 3.6.
 *
 * @return void
 */
function expositio_upgrade_notice() {
	$message = sprintf(__('Expositio requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'expositio'), $GLOBALS['wp_version']);
	printf('<div class="error"><p>%s</p></div>', $message);
}

/**
 * Prevents the Customizer from being loaded on WordPress versions prior to 3.6.
 *
 * @return void
 */
function expositio_customize() {
	wp_die(sprintf(__('Expositio requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'expositio'), $GLOBALS['wp_version']), '', array(
		'back_link' => true,
	));
}
add_action('load-customize.php', 'expositio_customize');

/**
 * Prevents the Theme Preview from being loaded on WordPress versions prior to 3.6.
 *
 * @return void
 */
function expositio_preview() {
	if (isset($_GET['preview'])) {
		wp_die(sprintf(__('Expositio requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'expositio'), $GLOBALS['wp_version']));
	}
}
add_action('template_redirect', 'expositio_preview');
