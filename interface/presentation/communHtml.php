<?php
    function html(string $title){ ?>
        <html lang="fr">
            <head>
                <title><?php echo $title  ?></title>
                <meta charset="utf-8">
                <!-- BOOTSTRAP -->
                <!-- <link rel="shortcut icon" type="image/png" href="../img/favicon-32x32.png"/> -->
                
                <link 
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" 
                    rel="stylesheet" 
                    integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" 
                    crossorigin="anonymous">
        
                <!-- CSS -->
                <link 
                    rel="stylesheet" 
                    type="text/css" 
                    href="../css/mainStyle.css">
                
            </head>
            <body>

        
            <div class="row">
            <?php include 'structure/sidebar.php' ?>
            <div class="container-fuid">
                <?php include 'structure/header.php' ?>
            </div>
            <div>SALUUUT</div>
            </div>
        
            </body>
<?php } ?>

