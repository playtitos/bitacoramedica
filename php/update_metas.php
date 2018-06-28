<?php 
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$rfc 			= $request->usuario;
	$meta 			= $request->meta;
	$fecha_meta 	= $request->fecha_meta;
	$pretextos 		= $request->pretextos;
	$compromisos 	= $request->compromisos;

	require_once 'db.php'; 
	
	$query = ("UPDATE metas SET meta = '$meta', pretextos = '$pretextos', compromisos = '$compromisos', fecha_meta = '$fecha_meta' WHERE rfc_usuario = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>