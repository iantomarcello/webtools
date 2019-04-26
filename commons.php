<?php
/*
 *	Commons PHP
 *	Version: 190426
 */

/* ===========
 * 	Site Root
 * =========== */

$folderPath = "";
$docURL = $_SERVER[ 'HTTP_HOST' ] . $_SERVER[ 'REQUEST_URI' ];
$docName = basename( $_SERVER[ 'SCRIPT_FILENAME' ] );

/* ----- automated root -----*/

if ( $_SERVER[ 'SERVER_NAME' ] == "localhost" || $_SERVER[ 'SERVER_NAME' ] == getHostByName( getHostName() ) ) {
	$rootPath = "/rootFolderNameHere/"; // development

} else if ( $_SERVER[ 'SERVER_NAME' ] == "testingsite.com" ) {
	$rootPath = "testingsite/path"; //testsite

} else {
	$rootPath = "/"; //production
}


// return LESS || CSS based on root.
/*
	<?php if ($rootPath !== "/") { ?>
		<link href="styles/style.less" rel="stylesheet/less" type="text/css"/>
	<?php } else { ?>
		<link href="<?php echo $rootPath; ?>styles/style.css" rel="stylesheet" type="text/css"/>
	<?php } ?>
*/

/* ==============================
 * 	Fetch Folder of current file
 * ============================== */
/// 181212
function returnFolder() {
	return array_shift(array_slice(explode( "/", $_SERVER[ 'REQUEST_URI' ]),-2));
}

/* =====================================
 * 	Fetch File based on directory depth
 * ===================================== */
 /**
  *	Returns the depicted file relatively or absolutely either in production or
  *	localhost development (ignoring localhost as root directory).
  *	Version: 190426
	* Author: Ian Yong
	* Site: https://github.com/iantomarcello
  *	@param string $file, the depicted file to be returned as a string.
  *	@param int $manual, manually offsets the directory backwards, default is 0
  *	@param bool $manual, setting to true returns the file absolutely, setting ot false treats it as 0
  */

 function returnFile($file, $manual = 0) {
 	$folder_array = explode("/", $_SERVER["PHP_SELF"]);
 	$folder_depth = count($folder_array) - 2;
 	$IpExplode = explode(".", $_SERVER['SERVER_NAME']);
 	$IpShift = array_shift($IpExplode);

 	if ( is_numeric($manual) || $manual == false) {
 		if ( $IpShift == "192" || $IpShift == "127" || $IpShift == "172" || $_SERVER['SERVER_NAME'] == "localhost" ) { $manual += 1; }
 		return str_repeat("../", $folder_depth - $manual) . $file;
 	} else if ( $manual == true)  {
 		$isDev = 0;
 		if ( $IpShift == "192" || $IpShift == "127" || $IpShift == "172" || $_SERVER['SERVER_NAME'] == "localhost" ) { $isDev = 1; }
 		$pathExplode = array_splice($folder_array, 0, (2 - $isDev));
 		$pathMod = join("/", $pathExplode);
 		return $pathMod . "/" . $file;
 	}
 }

/* =====================
 * 	Get Directory Files
 * ===================== */

/// get current directory
$dir = getcwd();

/// get directory
$dir = 'string';

/// return array of files without '.' and '..'
$files = array_slice( scandir( $dir ), 2 );

/// files' extenstion
$ext = pathinfo( $image, PATHINFO_EXTENSION );

/* ===============
 * 	Random Colour
 * =============== */
 /*
  *	Returns a random colour
  *	Version: 190426
	* Author: Outis
	* Source: https://stackoverflow.com/questions/5614530/generating-a-random-hex-color-code-with-php
  */

function rand_color() {
	return '#' . str_pad( dechex( mt_rand( 0, 0xFFFFFF ) ), 6, '0', STR_PAD_LEFT );
}

/* ===============
 *  Random String
 * =============== */

/**
 * Generate a random string, using a cryptographically secure
 * pseudorandom number generator (random_int)
 * Author: Scott Arciszewski
 * Site: 	https://stackoverflow.com/questions/4356289/php-random-string-generator/31107425#31107425
 *
 * For PHP 7, random_int is a PHP core function
 * For PHP 5.x, depends on https://github.com/paragonie/random_compat
 *
 * @param int $length      How many characters do we want?
 * @param string $keyspace A string of all possible characters
 *                         to select from
 * @return bool $randomise Randomise the keyspace
 * Modified : 181018, by Ian Yong, https://github.com/iantomarcello
 */

function random_str($length, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', $randomise = false) {
	if ($randomise) {
		$keyspace = str_shuffle($keyspace);
	}
	if (!function_exists("random_int")) {
		function random_int($min, $max) {
			return mt_rand($min, $max);
		}
	}
	$pieces = [];
	$max = mb_strlen($keyspace, '8bit') - 1;
	for ($i = 0; $i < $length; ++$i) {
		$pieces[]= $keyspace[random_int(0, $max)];
	}
	return implode('', $pieces);
}

/* ===============
 * 	Get Client IP
 * =============== */

function get_client_ip_server() {
	$ipaddress = '';
	if ( $_SERVER[ 'HTTP_CLIENT_IP' ] )
		$ipaddress = $_SERVER[ 'HTTP_CLIENT_IP' ];
	else if ( $_SERVER[ 'HTTP_X_FORWARDED_FOR' ] )
		$ipaddress = $_SERVER[ 'HTTP_X_FORWARDED_FOR' ];
	else if ( $_SERVER[ 'HTTP_X_FORWARDED' ] )
		$ipaddress = $_SERVER[ 'HTTP_X_FORWARDED' ];
	else if ( $_SERVER[ 'HTTP_FORWARDED_FOR' ] )
		$ipaddress = $_SERVER[ 'HTTP_FORWARDED_FOR' ];
	else if ( $_SERVER[ 'HTTP_FORWARDED' ] )
		$ipaddress = $_SERVER[ 'HTTP_FORWARDED' ];
	else if ( $_SERVER[ 'REMOTE_ADDR' ] )
		$ipaddress = $_SERVER[ 'REMOTE_ADDR' ];
	else
		$ipaddress = 'UNKNOWN';

	return $ipaddress;
}

/* ===================
 * 	If Number is even
 * =================== */

$number = 20;
if ( $number % 2 == 0 ) {
	print "It's even";
} else {
	print "It can't even.";
}

/* ============================================
 * 	Sort a Multidimensional Array by key value
 * ============================================ */

// $dataArray[ 0 ][ "races" ] = array nesting path
// $a[ 'order' ] = array [ key ]

usort( $dataArray[ 0 ][ "races" ], function ( $a, $b ) {
	return $a[ 'order' ] < $b[ 'order' ] ? -1 : 1;
} );


/* ===============
 * 	clamp a value
 * =============== */

function clamp($current, $min, $max) {
    return max($min, min($max, $current));
}

/* ===============
 * 	Censor Email
 * =============== */
/**
 * Censor email with asterisk.
 * Version: 181205
 * Author: Ian Yong
 * Site: https://github.com/iantomarcello
 *
 * @param string $email. The email to be censored.
 * @param int $visible. Length of the string to be uncensored starting from the front.
 */

function censor_email($email, $visible = 2) {
  if (!isset($email)) {
    return false;
  } else {
    $exploded = explode("@",$email);
    $username = array_shift($exploded);
    $domain = array_pop($exploded);

    $count = strlen($username) - $visible;
    $username_censored = substr_replace($username, str_repeat('*', $count), $visible, $count);
    $output = $username_censored . "@" . $domain;
    return $output;
  }
}

/* ======================
 * 	Start Session if Not
 * ====================== */
/// 181212

function sessionRun() {
	$version = phpversion();
	if ( $version >= 5.4.0 ) {
		if (session_status() == PHP_SESSION_NONE) {
		    session_start();
		}
	} else {
		if(session_id() == '') {
		  session_start();
		}
	}
}
session_status() == PHP_SESSION_NONE ? session_start() : null;
session_id() == '' ? session_start() : null;


/* ============================
 * 	Compile sql in a directory
 * =========================== */
/**
 * Compile all sql files in a directory.
 * Version: 190426
 * Author: Ian Yong
 * Site: https://github.com/iantomarcello
 *
 * @param string $outputName. The name of the compiled sql. Should end with .sql extension.
 * @param string $dir. The directory where the sql files are located.
 */

function compileSQL($outputName = "compile.sql", $dir = "./") {
  $dir = "./";

  if ( file_exists($outputName)) {
    unlink($outputName);
  }

  $files = array_slice(scandir($dir), 2);
  $queries = "";

  foreach ($files as $file) {
    $ext = pathinfo( $file, PATHINFO_EXTENSION );
    if ( $ext == "sql" ) {
      $queries .= file_get_contents($file);
    }
  }

  if ( file_put_contents($outputName, $queries) ) {
    return true;
  } else {
    return false;
  }
}

/* ====================
 * 	Convert tsv to sql
 * ==================== */
 /**
  * Convert tsv to sql.
  * Version: 190426
  * Author: Ian Yong
  * Site: https://github.com/iantomarcello
  *
  * @param string $tsv. The tsv that contains the data.
  * @param string $table. The table to be inserted.
  * @param string $outputName. The name of the compiled sql. Should end with .sql extension.
  */

function tsv_to_sql($tsv, $table, $output = "converted.sql") {
  $file = file_get_contents($tsv);
  $file = str_replace('	', "','", $file);

  $breaks = explode("\n", $file);
  $rows = [];
  foreach ($breaks as $i => $line) {
    $line = str_replace("'null'",  "null", $line);
    if ( $i > 0 ) {
      $rows[$i] = "'" . $line . "'";
    } else {
      $rows[$i] = $line;
    }
  }

  $queries = "";

  foreach ($rows as $key => $value) {
    if ( $key > 0 ) {
      $rows[0] = str_replace("'", "", $rows[0]);
      $queries .= "INSERT INTO $table ($rows[0]) VALUES ($value)". ";";
    }
  }

  if ( file_exists($output)) {
    unlink($output);
  }

  if ( file_put_contents($output, $queries) ) {
    return true;
  } else {
    return false;
  }
}

// End
