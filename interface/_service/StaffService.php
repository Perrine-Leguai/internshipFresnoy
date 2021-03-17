<?php
    require_once(__DIR__.'../class/Staff.php');
    require_once(__DIR__.'../dao/StaffDAO.php');
    require_once(__DIR__.'../exception/ServiceException.php');

    class StaffService {
        
        //add new staff
        public static function create(int $idStaff){

            try{

                $dao = new StaffDAO();
                //catch create result, if well or bad done
                return  $dao->create($idStaff);

            }catch(PDOException $serviceException){
                throw new ServiceException($serviceException->getMessage(), $serviceException->getCode());
            }
        }
    }
?>