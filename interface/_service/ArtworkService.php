<?php
    require_once(__DIR__.'../class/Artwork.php');
    require_once(__DIR__.'../dao/ArtworkDAO.php');
    require_once(__DIR__.'../exception/ServiceException.php');

    class ArtworkService {
        
        //add new artwork
        public static function create(Object $artwork){

            try{

                $dao = new ArtworkDAO();
                //catch create result, if well or bad done
                return  $dao->create($artwork);

            }catch(PDOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        //serach all artwork 
        public function searchAll(){
            try{

                $dao = new ArtworkDAO();
                //catch a tab of all artworks in the database
                return $dao->searchAll();
                
            }catch(PDOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        //search artwork by student
        public function searchBy(Int $idStudent){
            try{
                $dao = new ArtworkDAO();
                //catch a tab of one row, i.e the student looked for
                return $dao->searchByStudentId($idStudent);

            }catch(PDOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        //search by seen 
        public function searchByNotSeen(){
            try{
                $dao = new ArtworkDAO();
                //catch a tab of all the not seen artwork, where seen = false
                return $dao->researchByNotSeen();

            }catch(PDOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        // public function update(Object $objet, int $idOdbjectToModify){

        // }

        

        
    }
?>