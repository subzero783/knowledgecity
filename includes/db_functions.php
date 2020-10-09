<?php 

function db_connect(){
  $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME, DB_PORT);
  confirm_db_connect($conn);
  return $conn;
}

function confirm_db_connect($conn){
  if($conn->connect_errno){
    $msg = 'Database connection failed: ';
    $msg .= $conn->connect_error; 
    $msg .= ' ('.$conn->connect_errno.')'; 
    exit($msg);
  }
}

function db_disconnect($conn){
  if(isset($conn)){
    $conn->close();
  }
}


?>