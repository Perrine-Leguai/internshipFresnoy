<?php

    class StaffDAO extends Connection{

        public function create(int $idUser){
            try{
                //connect to the bdd
                $db= Connection::connect();                 
                //insert request
                $stmt = $db->prepare("INSERT INTO `staff` VALUES (NULL, $idUser)");
                $rs = $stmt->execute();
                
                //return rs to display success message after adding
                return $rs;
            }catch(PDOException $e){
                throw new PDOException($e->getMessage(), $e->getCode());
            }
        }
    }

?>