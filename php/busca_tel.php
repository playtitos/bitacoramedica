<?php
    function getArraySQL($result){
        require_once 'db.php'; 
        header("Content-Type: text/html;charset=utf-8");
        $postdata       = file_get_contents("php://input");
        $request        = json_decode($postdata);
        $telefono       = $request->telefono;
        $query          = "SELECT * FROM generales WHERE telefono LIKE '%$telefono%'";
        $result         = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $rawdata        = array();
        $i=0;
        while($row = mysqli_fetch_array($result)){
            $rawdata[] = $row;
        }
        return $rawdata;
    }
    $myArray            = getArraySQL($result);
    echo json_encode($myArray);
?>