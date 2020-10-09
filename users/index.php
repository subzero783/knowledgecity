<?php 

require_once('../includes/initialize.php');

if(is_get_request()){

  

  $result = Users::find_all();
  
  $row = $result->fetch_assoc();
  
  $result->free();
  
  db_disconnect($db);
  
}



?>