<?
	include("dbPDO.class.php");
	include("dbRecords.class.php");
	dbPDO::init();
	if (isset($_POST['typeOfActivity'])){
		switch($_POST['typeOfActivity']){
			case 'getRecordsAct': {
				echo dbRecords::getRecords();
				break;
			}
			case 'getRecordsJSONAct': {
				echo dbRecords::getRecordsJSON();
				break;
			}
			case 'addRecordAct': {
				if (isset($_POST['first_name'])) { 
					dbRecords::addRecord($_POST['first_name'],$_POST['last_name'],$_POST['vk_id'],$_POST['points']); 
					break;
				}
			}
			case 'getFirstRecordsAct': {
				if (isset($_POST['count'])) {
					echo dbRecords::getFirstRecords($_POST['count']);
					break;
				}
			}
			case 'getNearbyRecords': {
				if (isset($_POST['first_name'])){
					echo dbRecords::getNearbyRecords($_POST['first_name'], $_POST['last_name'], $_POST['vk_id']);
					break;
				}
			}
			case 'getFirstRecordsJSONAct': {
				if (isset($_POST['count'])) {
					echo dbRecords::getFirstRecordsJSON($_POST['count']);
					break;
				}
			}
			case 'sendUserInfoAct': {
				if (isset($_POST['vk_id'])){
					//todo
					break;
				}
			}
		}
	}
	
?>