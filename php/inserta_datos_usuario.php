<?php 
	//parametros que se reciben de Angularjs
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$entero 		= $request->entero;
	$referenciado 	= $request->referenciado;
	$motivo 		= $request->motivo;
	$fecha_reg 		= $request->fecha_reg;
	$hora_reg 		= $request->hora_reg;
	$nombre 		= $request->nombre;
	$ap_pat 		= $request->ap_pat;
	$ap_mat 		= $request->ap_mat;
	$rfc 			= $request->rfc;
	$genero 		= $request->genero;
	$edo_civil 		= $request->edo_civil;
	$hijos 			= $request->hijos;
	$nacimiento 	= $request->nacimiento;
	$escolaridad 	= $request->escolaridad;
	$telefono 		= $request->telefono;
	$tel_oficina 	= $request->tel_oficina;
	$tel_celular 	= $request->tel_celular;
	$email 			= $request->email;
	$ad_email 		= $request->ad_email;
	$pais 			= $request->pais;
	$cp 			= $request->cp;
	$estado 		= $request->estado;
	$colonia 		= $request->colonia;
	$delegacion 	= $request->delegacion;
	$municipio 		= $request->municipio;
	$direccion 		= $request->direccion;


	require_once 'db.php'; 
	$query = ("INSERT INTO generales VALUES ('$entero', '$referenciado', '$motivo', '$fecha_reg', '$nombre', '$ap_pat', '$ap_mat', '$rfc', '$genero', '$edo_civil', '$hijos', '$nacimiento', '$escolaridad', '$telefono', '$tel_oficina', '$tel_celular', '$email', '$ad_email', '$pais', '$cp', '$estado', '$colonia',  '$delegacion', '$municipio', '$direccion', '$hora_reg')");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>