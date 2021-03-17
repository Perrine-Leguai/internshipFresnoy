<?php

    require_once('../_service/UserService.php');
    require_once('../_service/StudentService.php');
    require_once('../_service/ArtworkService.php');
    require_once('../presentation/communHtml.php');
    require_once('../presentation/studentView.php');
    require_once('../_class/Artwork.php');

    //var used for displaying
    $edit = false;

    ////////////////////////////////////////FAKE INITIALISATION////////////////////
    $_SESSION['idStudent']  = 1;
    $session_artwork_obj = ArtworkService::searchBy($_SESSION['idStudent']);
    
    //display the global html
    html('Etudiant.e.s');

    formCreateArtwork($edit, $session_artwork_obj);
    
    //display the scripts
    scripts('countdown');

    

    //check if there is any information on the url
    if(isset($_GET) && !empty($_GET)){

        //if it's a creation
        if( isset($_GET['action'])   && !empty($_GET['action']) && $_GET['action']=="create"   &&
            isset($_POST)   &&  !empty($_POST)){

                //Convert all applicable characters to HTML entities
                $title          = htmlentities($_POST['title']);
                $subtitle       = htmlentities($_POST['subtitle']);
                $type           = htmlentities($_POST['type']);
                $duration       = htmlentities($_POST['duration']);
                $short_fr_syn   = htmlentities($_POST['short_synopsis_FR']);
                $short_en_syn   = htmlentities($_POST['short_synopsis_EN']);
                $long_fr_syn    = htmlentities($_POST['long_synopsis_FR']);
                $long_en_syn    = htmlentities($_POST['long_synopsis_EN']);

                //set automatically the current date and seen = false
                date_default_timezone_set("Europe/Paris");
                $created_date   = date("Y-m-d");
                $seen = 0;
                
                //catch idStudent
                $id_student     = $_SESSION['idStudent'];

                //create an object Artwork
                $aw = new Artwork();
                $aw ->setTitle($title)->setSubtitle($subtitle)->setType($type)->setDuration($duration)
                    ->setSynopsisShortFr($short_fr_syn)->setSynopsisLongFr($long_fr_syn)
                    ->setSynopsisShortEn($short_en_syn)->setSynopsisLongEn($long_en_syn)
                    ->setCreatedAt($created_date)->setIdStudent($id_student)->setSeen($seen);
                
                try{
                    //send the request throw several layer. 
                    //can catch a success if operation happened well - to display a success alert
                   $success=ArtworkService::create($aw);
                   echo $success;

                }catch(ServiceException $serviceException){
                    echo $ServiceException->getCode();
                }
        }
    }
?>