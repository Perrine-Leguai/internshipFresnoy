<?php
    require_once(__DIR__.'/../_class/Artwork.php');
    require_once(__DIR__.'/../_dao/ArtworkDAO.php');
    require_once(__DIR__.'/../exception/ServiceException.php');

    class ArtworkService {
        
        //add new artwork
        public static function create(Object $artwork){

            try{

                $dao = new ArtworkDAO();
                //catch create result, if well or bad done
                return  $dao->create($artwork);

            }catch(DAOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        //serach all artwork 
        public static function searchAll(){
            try{

                $dao = new ArtworkDAO();
                //catch a tab of all artworks in the database
                return $dao->searchAll();
                
            }catch(DAOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        //search artwork by student
        public static function searchBy(Int $idStudent){
            try{
                $dao = new ArtworkDAO();
                //catch a tab of one row, i.e the student looked for
                return $dao->searchByStudentId($idStudent);

            }catch(DAOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        //search by seen 
        public static function searchByNotSeen(){
            try{
                $dao = new ArtworkDAO();
                //catch a tab of all the not seen artwork, where seen = false
                return $dao->researchByNotSeen();

            }catch(DAOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        // public function update(Object $objet, int $idOdbjectToModify){

        // }

        

        
    }
?>