<?php 
	//parametros que se reciben de Angularjs
	header("Content-Type: text/html;charset=utf-8");
	$postdata 		= file_get_contents("php://input");
	$request 		= json_decode($postdata);

	$entero 		= $request->entero;
	$referenciado 	= $request->referenciado;
	$motivo 		= $request->motivo;
	$fecha_reg 		= $request->fecha_reg;
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

	require_once 'db.php'; 
	$query = ("UPDATE generales SET entero = '$entero', referenciado = '$referenciado', motivo = '$motivo', fechaRegistro = '$fecha_reg', nombre = '$nombre', ap_pat = '$ap_pat', ap_mat = '$ap_mat', genero = '$genero', edo_civil = '$edo_civil', hijos = '$hijos', nacimiento = '$nacimiento', escolaridad = '$escolaridad', telefono = '$telefono', tel_oficina = '$tel_oficina', tel_celular = '$tel_celular', email = '$email', ad_email = '$ad_email', cp = '$cp', estado = '$estado', colonia = '$colonia', delegacion = '$delegacion', municipio = '$municipio' WHERE rfc = '$rfc'");
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;
	echo $json_response = "exito";
?>


