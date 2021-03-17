<?php
    require_once(__DIR__.'../exception/PDOException.php');
    require_once(__DIR__.'/Connection.php');
    require_once(__DIR__.'../interface/InterfaceDao.php');

    class ArtworkDAO extends Connection implements InterfaceDao{
        

        //add new artwork
        public function create(Object $artwork){
             
            $title             = $artwork->getTitle();
            $subtitle          = $artwork->getSubtitle() ;
            $type              = $artwork->getType() ;
            $duration          = $artwork->getDuration() ;
            $synopsis_short_fr = $artwork->getSynopsisShortFr();
            $synopsis_long_fr  = $artwork->getSynopsisLongFr();
            $synopsis_short_en = $artwork->getSynopsisShortEn() ;
            $synopsis_long_en  = $artwork->getSynopsisShortEn();
            $created_at        = $artwork->getCreatedAt();
            $id_student        = $artwork->getIdStudent();
            $seen              = $artwork->getSeen() ;

            try{
                //connect to the bdd
                $db= Connection::connect();                 
                //insert request
                $stmt = $db->prepare("INSERT INTO `artwork` VALUES (NULL, :title, :subtitle, :type, :duration, :synoSFr, :synoLFr, :synoSEn, :synoLEn, :create, :idStudent, :seen)");
                //binding params
                $stmt->bindParam(':title', $title ); 
                $stmt->bindParam(':subtitle', $subtitle); 
                $stmt->bindParam(':type', $type); 
                $stmt->bindParam(':duration', $duration); 
                $stmt->bindParam(':synoSFr', $synopsis_short_fr); 
                $stmt->bindParam(':synoLFr', $synopsis_long_fr ); 
                $stmt->bindParam(':synoSEn', $synopsis_short_en ); 
                $stmt->bindParam(':synoLEn', $synopsis_long_en ); 
                $stmt->bindParam(':create', $created_at ); 
                $stmt->bindParam(':idStudent', $id_student ); 
                $stmt->bindParam(':seen', $seen);

                $rs = $stmt->execute();
                //return rs to display success message after adding
                return $rs;
            }catch(PDOException $e){
                throw new PDOException($e->getMessage(), $e->getCode());
            }
        }

        //search all artwork 
        public function searchAll(){
            try{

                $stmt=$this->db->prepare("SELECT * from artwork");
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

                return $data;
                
            }catch(PDOException $e){
                throw new PDOException($e->getMessage(), $e->getCode());
            }
        }

        //search artwork by student
        public function searchByStudentId(Int $idStudent){
            try{
                //connect to the bdd
                $db= Connection::connect(); 

                $stmt=$db->prepare("SELECT * FROM artwork WHERE id_student=:idStudent");
                $stmt->bindParam(':idStudent', $idStudent);
                $stmt->execute();
                //store the result into data, returns an array indexed by column name 
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
                
                //free the memory
                $stmt->closeCursor();
                
                return $data;

            }catch(PDOException $e){
                throw new PDOException($e->getMessage(), $e->getCode());
            }
        }

        //search by seen (boolean) = false
        public function researchByNotSeen(){
            try{
                //connect to the bdd
                $db= Connection::connect(); 

                //find all the artwork where seen = false 
                $stmt=$db->prepare("SELECT * FROM artwork WHERE seen=:is_seen");
                $stmt->bindParam(':is_seen', 0);
                //store the result into data, returns an array indexed by column name 
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

                $stmt->closeCursor();

                return $data;

            }catch(PDOException $e){
                throw new PDOException($e->getMessage(), $e->getCode());
            }
        }

        // public function update(Object $objet, int $idOdbjectToModify){

        // }

        

        
    }
?>