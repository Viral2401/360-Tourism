<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

define('apiurl','http://localhost/tour360');
if (substr(apiurl,-1) == '/') { $apiurl = substr(apiurl,0,-1);
	
}else{

	$apiurl = apiurl; 

}

define('api_url',$apiurl."/api/");
define('api_key',"phptravels");
define('dev',"0");



$active_group = 'default';
$query_builder = TRUE;

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => "localhost",
	'username' => "root",
	'password' => "",
	'database' => "tour360",
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
