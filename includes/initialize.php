<?php

  ob_start(); 

  // session_start(); // turn on sessions if needed

  require_once('functions.php');
  require_once('db_credentials.php');
  require_once('db_functions.php');

  require_once('classes/auth.class.php');

  foreach(glob('classes/*.class.php') as $file) {
    require_once($file);
  }

  function my_autoload($class) {
    if(preg_match('/\A\w+\Z/', $class)) {
      include('classes/' . $class . '.class.php');
    }
  }
  spl_autoload_register('my_autoload');

  $db = db_connect();
  Users::set_database($db);

  

?>
