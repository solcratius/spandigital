<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'span_digital');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'gAsef4=DREgu');

/** MySQL hostname */
define('DB_HOST', 'http://ec2-54-173-39-224.compute-1.amazonaws.com/');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '5=={d%ODo$OF+X1_F>D127Y/X3r,TM55nWx9$=za2>cMmUR2T+US,yxj^B|Z#+G$');
define('SECURE_AUTH_KEY',  ':](. k&#(`L9HPh}IKZxLIS5^|jTU6P |Y(#<0_U+Xw!=)a!U?v-M^~Mp=Q+^>+A');
define('LOGGED_IN_KEY',    'N[ ^/pA^eg@@{}sa/`qly?/E `MwpVny|ZWn_}V{O#?>N.q4D|L@3Z+Pp@vc$D7A');
define('NONCE_KEY',        'o W/l&mq%x u/-uVH)/H*:Xn`IqNdcUMS#+5g7|:O=^=&a6/AW$:M:Z 3%w]|J:0');
define('AUTH_SALT',        ' z~ %IM,viLf]^10[]=bVX:t]B{7eW`-*;:i:qHO3+B$:0<^9D4s%S0yFFwC4-6d');
define('SECURE_AUTH_SALT', '+3 >ZxBG[<v*2YId+c@t|^Fy3 pI4nnxYHXYr+V-(l_{FA`!f5n^`QhL6[P/4:9@');
define('LOGGED_IN_SALT',   'a~N2+Mj9zabZ^mcex.0PYU1Wd}}-9[|TT]l!;gFI it`/t][c~78fi3+/Cw7<dz%');
define('NONCE_SALT',       '<4_<Uf6@`?pZ(kbJf6I A74]MM#DC5^D#4vE6JP.&Y)rELHEn7!1.]&$@adg<EY|');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'span_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
