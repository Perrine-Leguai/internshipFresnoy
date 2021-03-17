<?php
    require_once(__DIR__.'../class/User.php');
    require_once(__DIR__.'../dao/UserDAO.php');
    require_once(__DIR__.'../exception/ServiceException.php');

    class UserService {
        
        //add new user
        public static function create(Object $user){

            try{

                $dao = new UserDAO();
                //catch create result, if well or bad done
                return  $dao->create($user);

            }catch(PDOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        //serach all users 
        public function searchAll(){
            try{

                $dao = new UserDAO();
                //catch a tab of all users in the database
                return $dao->searchAll();
                
            }catch(PDOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }

        //search user by id
        public function searchBy(Int $idUser){
            try{
                $dao = new UserDAO();
                //catch a tab of one row, i.e the student looked for
                return $dao->searchBy($idUser);

            }catch(PDOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }
    }
?>