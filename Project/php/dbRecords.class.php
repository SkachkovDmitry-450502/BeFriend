<?php

	class dbRecords extends dbPDO{

		public static function addRecord($first_name, $last_name, $vk_id, $points){
			try{

				// Prepare fields
				dbPDO::setCharSet();
				$first_name = self::$instance->_db->quote($first_name);
				$last_name = self::$instance->_db->quote($last_name);
				$vk_id = self::$instance->_db->quote($vk_id);

				// Search user record in Database
				$sql = "SELECT * 
						FROM records
						WHERE vk_id = $vk_id";
				$stmt=self::$instance->_db->query($sql);
				$items = $stmt->fetch(PDO::FETCH_ASSOC);

				if (isset($items['points'])){
					if ($points > $items['points']){
						$sql = "UPDATE records
								SET points = $points, 
								last_game_date = CURRENT_TIMESTAMP, 
								regame = regame + 1
								WHERE vk_id = $vk_id";
						$result=self::$instance->_db->query($sql);
					} else {
						$sql = "UPDATE records
								SET regame = regame + 1, 
								last_game_date = CURRENT_TIMESTAMP
								WHERE vk_id = $vk_id";
						$result=self::$instance->_db->query($sql);
					}
				} else {
					// ADD to Database
					$sql = "INSERT INTO records(first_name, last_name, vk_id, points) 
						VALUES ($first_name, $last_name, $vk_id, $points)";
					$result = self::$instance->_db->exec($sql);
				}

			}catch(PDOException $e){

				dbPDO::getException($e);
				return false;
			
			}			
			return $result;
		}

		public static function getRecords(){
			try{

				dbPDO::setCharSet();
				$sql = "SELECT *
								FROM records ORDER BY points DESC";
				$stmt=self::$instance->_db->query($sql);
				$items = self::getArray($stmt);

			}catch(PDOException $e){
				dbPDO::getException($e);
				return false;
			}

			return $items;
		}

		public static function getFirstRecords($number){
			try{

				dbPDO::setCharSet();
				$sql = "SELECT *
						FROM records
						ORDER BY points DESC LIMIT $number";
				$stmt=self::$instance->_db->query($sql);
				$items = self::getArray($stmt);
				$json_data = json_encode($items);

			}catch(PDOException $e){
				dbPDO::getException($e);
				return false;
			}

			return $items;
		}

		public static function getFirstRecordsJSON($number){
			return json_encode(dbRecords::getFirstRecords($number));
		}

		public static function getRecordsJSON(){
			return json_encode(dbRecords::getRecords());
		}

		public static function getFirstRecordsTable($number){
			$items = dbRecords::getFirstRecords($number);
			$output = '<div class="rate">
							<h3 class="rate__header">
								Лучшие игроки
								<div class="top5">ТОП '.$number.'</div>
							</h3>
							<div class="rate__main">
								<table class="rate__table winners">
									<tr class="tableHead">
										<th>№</th>
										<th>Имя</th>
										<th>Оценка</th>
									</tr>';
									for ($i=0; $i<$number; $i++){
										if (isset($items[$i])){
											$output.='<tr>
												<td class="number">'.($i+1).'</td>
												<td class="name"><a href="'.'https://vk.com/id'.$items[$i]["vk_id"].'" target = "_blank">'.$items[$i]["first_name"].' '.$items[$i]["last_name"].'</a></td>
												<td class="points">'.$items[$i]["points"].'</td>
											</tr>';
										}
									}
			$output .='			</table>
							</div>
						</div>';
			return $output;
		}
	}
?>