<?php 
	//parametros que se reciben de Angularjs
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$archivo 		= $request->archivo;
	$secc 			= $request->seccion;
	$desc 			= $request->desc;

	require_once 'db.php'; 
	$query = ("UPDATE imagenes SET ruta = '$archivo', descripcion = '$desc' WHERE rfc_usuario = '$rfc' AND seccion = '$secc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>