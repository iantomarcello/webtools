<?php
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

function random_string($length, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', $randomise = false)
{
  if ($randomise) {
    $keyspace = str_shuffle($keyspace);
  }
  if (!function_exists("random_int")) {
    function random_int($min, $max)
    {
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
