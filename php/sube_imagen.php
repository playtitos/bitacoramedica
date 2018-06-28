<?php
  $nombre_img = $_FILES['image']['name'];
  $tipo       = $_FILES['image']['type'];
  $tamano     = $_FILES['image']['size'];
  if(($nombre_img == !NULL) && ($_FILES['image']['size'] <= 200000)) {
    if (($_FILES["image"]["type"] == "image/jpeg") || ($_FILES["image"]["type"] == "image/jpg")|| ($_FILES["image"]["type"] == "image/png")){
        $ext = pathinfo($_FILES['image']['name'],PATHINFO_EXTENSION);
        $image = time().'.'.$ext;
        $directorio = $_SERVER['DOCUMENT_ROOT'].'/Diplomado/images/';
        move_uploaded_file($_FILES['image']['tmp_name'],$directorio.$image);
        echo $image;
      }else{
         echo "No se puede subir una imagen con ese formato ";
      }
  }else{
    if($nombre_img == !NULL) echo "La imagen es demasiado grande "; 
  }
?>