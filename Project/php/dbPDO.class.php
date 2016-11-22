<?php

	header("Content-type:text/html;charset=utf-8");

	class dbPDO{
		protected static $instance;
		protected $_db;

		private function __construct(){
			$params=parse_ini_file("settings.ini", true);
			$this->_db=new PDO($params['db']['db.conn'], $params['db']['db.user'], $params['db']['db.pass']);
			$this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			//$this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
			//$this->_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
		}

		private function __clone(){}

		public static function init(){

			if(self::$instance instanceof self)
				return false;
			self::$instance=new self();
		}	

		protected static function getException($e, $type="full"){
			if(!($e instanceof PDOException))
				return false;

			switch($type){
				case "str":
					echo $e->getMessage();
					break;
				case "code":
					echo $e->getCode();
					break;
				case "file":
					echo $e->getFile();
					break;
				case "line":
					echo $e->getLine();
					break;
				default:
					echo $e->getCode()." : ".$e->getMessage()." | in file: ".$e->getFile()." on line: ".$e->getLine();
			}
		}

		protected static function getArray($stmt){

			$items=array();
			while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
				$items[]=$row;
			}
			return $items;
		}

		public static function setCharSet(){

				self::$instance->_db->exec("SET NAMES utf8");
		}

	}
?>