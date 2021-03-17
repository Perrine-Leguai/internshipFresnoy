<?php 
    function formCreateArtwork(bool $edit, object $artwork=null){ ?>
        <form action="../_controller/studentViewController.php?action=<?php if($artwork==null || empty($artwork)){echo "create";}else{echo "edit";} ?>" method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <label for="title_Input">Titre</label>
                <input type="text" class="form-control" id="title_Input" placeholder="Qui a tué Pamela Rose?" name="title" value="<?= $artwork->getTitle() ?>">
            </div>
            <div class="form-group">
                <label for="subtitle_Input">Sous-titre</label>
                <input type="text" class="form-control" id="subtitle_Input" placeholder="Deuxième volet" name="subtitle" value="<?= $artwork->getSubtitle() ?>">
            </div>
            <div class="form-group">
                <label for="type_input">Type</label>
                <select class="form-control" id="type_input" name="type" value="<?= $artwork->getType() ?>">
                <option value="film">Film</option>
                <option value="installation">Installation</option>
                <option value="performance">Performance</option>
                </select>
            </div>
            <div class="form-group">
                <label for="duration_Input">Druée</label>
                <input type="text" class="form-control" id="duration_Input" placeholder="01:59:59" name="duration" value="<?= $artwork->getDuration() ?>">
            </div>
            <div class="form-group">
                <label for="synopsis_court_fr">Synospsis court</label>
                <textarea class="form-control" id="synopsis_court_fr" rows="3" name="short_synopsis_FR" ><?= $artwork->getSynopsisShortFr() ?></textarea>
            </div>
            <div class="form-group">
                <label for="synopsis_long_fr">Synopsis long</label>
                <textarea class="form-control" id="synopsis_long_fr" rows="5" name="long_synopsis_FR" ><?= $artwork->getSynopsisLongFr() ?></textarea>
            </div>
            <div class="form-group">
                <label for="synopsis_court_en">Short synopsis</label>
                <textarea class="form-control" id="short_synopsis_EN" rows="3" name="short_synopsis_EN" ><?= $artwork->getSynopsisShortEn() ?></textarea>
            </div>
            <div class="form-group">
                <label for="synopsis_long_fr">Long synopsis</label>
                <textarea class="form-control" id="long_synopsis_EN" rows="5" name="long_synopsis_EN" ><?= $artwork->getSynopsisLongFr() ?></textarea>
            </div>
            <div class="form-group">
                <label for="media_input">Example file input</label>
                <input type="file" class="form-control-file" id="media_input"  name="media">
            </div>
            <input type="submit" class="btn btn-outline-secondary mt-4" value="<?php if(!$edit || $edit==null){ echo 'Ajouter ';}elseif($edit){echo 'Modifier ';}else{};?>"></input>
        </form>
<?php   } ?>