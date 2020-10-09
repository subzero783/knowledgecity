<?php 

class Users {

  static public $db; 

  static public function set_database($db){
    self::$db = $db;
  }

  static public function find_by_sql($sql){

    $result = self::$db->query($sql);

    if(!$result){
      exit('Database query failed.');
    }
    return $result;
  }

  static public function find_all(){
    $sql = 'SELECT * FROM students';
    return Users::$db->query($sql);
  }

}

?>