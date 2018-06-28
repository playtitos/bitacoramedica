//incia el cotrolador del diplomado
diplomado.controller('diplomadoController', ['$scope', '$http', '$timeout', '$compile', 'ngDialog', '$state', function ($scope, $http, $timeout, $compile, ngDialog, $state) {
    //angular.element(document.querySelector('[ng-controller=diplomadoController]')).scope().
    $scope.secciones_registro = false;
    $scope.recupera_registrar = false;

    $scope.muestra_busca_usuario_m = false;
    $scope.cargando_modal = false;
    $scope.fecha_usuario = true;
    $scope.fechas_options = [];
    $scope.sizes = [5, 10, 15, 20];
    $scope.men_busqueda = "Buscar paciente";
    $scope.color_secc = "aqua";
    $scope.c_letra = "c-aqua";


    $scope.secciones = [
        { nombre: 'General', alias: 'general', estado: 'unselected' },
        { nombre: 'Antecedentes', alias: 'antecedentes', estado: 'unselected' },
        { nombre: 'Síntomas', alias: 'sintomas', estado: 'unselected' },
        { nombre: 'Hábitos', alias: 'habitos', estado: 'unselected' },
        { nombre: 'Evaluaciones', alias: 'evaluaciones', estado: 'unselected' }
    ];

    sessionStorage.setItem('eleccion', "");

    /***** SECC GENERAL *****/
    sessionStorage.setItem('usuario', "");
    sessionStorage.setItem('datosUsuario', "");

    /***** ANTECEDENTES *****/
    sessionStorage.setItem('Antecedentes', "");
    sessionStorage.setItem('Facores', "");
    sessionStorage.setItem('Diagnosticos', "");
    sessionStorage.setItem('Habitos', "");

    /***** SINTOMAS *****/
    sessionStorage.setItem('Piel', "");
    sessionStorage.setItem('Nervios', "");
    sessionStorage.setItem('Pulmones', "");
    sessionStorage.setItem('Estomago', "");

    /**** HABITOS *****/
    sessionStorage.setItem('Comidas', "");

    /**** EVALUACIONES ****/
    sessionStorage.setItem('Cuantitativas', "");
    sessionStorage.setItem('Adicional', "");
    sessionStorage.setItem('Metas', "");
    sessionStorage.setItem('Imagenes', "");

    $scope.colores = function (fondo, letra, secc) {
        $scope.color_secc = fondo;
        $scope.c_letra = letra;
        $scope.parado = secc;
    };

    $scope.consulta_prev = function () {
        $scope.error_modal = false;
        if ($scope.parado === "general") {
            $scope.rfc_busca = "";
            $scope.tel_busca = "";
            $scope.nombre_modal = "Buscar usuario.";
            $scope.busca_rfc = true;
            $scope.busca_fecha = false;
            $scope.error_rfc_m = "";
            var template = "../views/modals/busca_user.html";
        } else {
            $scope.nombre_modal = "Exportar consultas previas";
            $scope.error_fecha_rep = "";
            var template = "../views/modals/filtra_fechas.html";
        }
        $scope.openModal(template, '50%', '75%');
    };

    $scope.cambia_fechas_usuario = function (fecha) {
        var secc = $scope.parado;
        $scope.fecha = fecha;
        var separada = fecha.split(' / ');
        $scope.fecha_sel = separada[0];
        $scope.hora_sel = separada[1];
        if (secc === "antecedentes") {
            angular.element(document.querySelector('[ng-controller=antecedentesController]')).scope().aplica_antecedentes();
            angular.element(document.querySelector('[ng-controller=antecedentesController]')).scope().aplica_factores();
            angular.element(document.querySelector('[ng-controller=antecedentesController]')).scope().aplica_diagnositcos();
            angular.element(document.querySelector('[ng-controller=antecedentesController]')).scope().aplica_habitos();
        } else if (secc === "sintomas") {
            angular.element(document.querySelector('[ng-controller=sintomasController]')).scope().aplica_piel();
            angular.element(document.querySelector('[ng-controller=sintomasController]')).scope().aplica_nervios();
            angular.element(document.querySelector('[ng-controller=sintomasController]')).scope().aplica_pulmones();
            angular.element(document.querySelector('[ng-controller=sintomasController]')).scope().aplica_estomago();
        } else if (secc === "habitos") {
            angular.element(document.querySelector('[ng-controller=habitosController]')).scope().aplica_comidas();
        } else if (secc === "evaluaciones") {
            angular.element(document.querySelector('[ng-controller=evaluacionesController]')).scope().aplica_cuantitativas();
            angular.element(document.querySelector('[ng-controller=evaluacionesController]')).scope().aplica_adicional();
            angular.element(document.querySelector('[ng-controller=evaluacionesController]')).scope().aplica_metas();
            angular.element(document.querySelector('[ng-controller=evaluacionesController]')).scope().aplica_imagenes();
        }
    };


    $scope.valida_fil_fecha = function () {
        var actual = $scope.fecha;
        if (actual !== "" && actual !== undefined && actual !== null) {
            $scope.cambia_fechas_usuario(actual);
        }
    };

    $scope.principal = function () {
        $scope.alerta_error = false;
        $scope.alerta_exito = false;
        $scope.valida_fecha_hora();
        if (sessionStorage.logueado === undefined) {
            var origen = window.location.origin;
            var ruta = "/Diplomado/login/views/login.html";
            window.location.href = origen + ruta;
        } else {
            $state.go('general', { reload: true });
            $scope.logueado = sessionStorage.logueado;
            $scope.rol = sessionStorage.rol;
            $scope.valida_user();
            $scope.redirecciona({ alias: 'general' });
        }
    };

    $scope.nuevo_paciente = function () {
        var login = sessionStorage.logueado;
        var rol = sessionStorage.rol;
        sessionStorage.clear();
        sessionStorage.logueado = login;
        sessionStorage.rol = rol;
        $scope.principal();
        $scope.limpia_datos();
    };

    $scope.limpia_datos = function () {
        $scope.se_entero = "";
        $scope.referenciado = "";
        $scope.motivo_c = "";
        $scope.fecha_reg = sessionStorage.fecha;
        $scope.nombre_com = "";
        $scope.ap_paterno = "";
        $scope.ap_materno = "";
        $scope.rfc = "";
        $scope.genero = "";
        $scope.civil = "";
        $scope.hijos = "";
        $scope.nacimiento = "";
        $scope.escolar = "";
        $scope.telefono = "";
        $scope.tel_oficina = "";
        $scope.tel_celular = "";
        $scope.email = "";
        $scope.conf_email = "";
        $scope.ad_email = "";
        $scope.conf_ad_email = "";
        $scope.pais = "";
        $scope.cp = "";
        $scope.estado = "";
        $scope.colonia = "";
        $scope.delegacion = "";
        $scope.direccion = "";
        $scope.name_municipio = "";
        angular.element(document.querySelector('[ng-controller=generalController]')).scope().des_general = false;
        $('#rfc').attr('readonly', false);
    };

    $scope.valida_fecha_hora = function () {
        if (sessionStorage.hora === undefined) {
            var fecha_act = new Date();
            sessionStorage.hora = fecha_act.getHours() + ":" + fecha_act.getMinutes() + ":" + fecha_act.getSeconds();
            sessionStorage.fecha = $scope.cambia_fechas(fecha_act);
        }
    };

    $scope.redirecciona = function (secc) {
        for (var i = 0; i < $scope.secciones.length; i++) {
            if ($scope.secciones[i].alias === secc.alias) {
                $scope.secciones[i].estado = "selected";
            } else {
                $scope.secciones[i].estado = "unselected";
            }
        }
        $state.go(secc.alias, { reload: true });
    };

    $scope.valida_user = function () {
        $scope.secciones_registro = true;
        $scope.recupera_registrar = false;
        if ($scope.rol === "capturista") {
            $scope.des_buscar_user = false;
        } else {
            $scope.des_buscar_user = true;
        }
    };

    /**** función para ejecutar funciones de guardado ****/
    $scope.confirma_ligar = function () {
        $scope.cancelar_ligar();
        if ($scope.abrio === "general") {
            angular.element(document.querySelector('[ng-controller=generalController]')).scope().guarda_general();
        } else if ($scope.abrio === "antecedentes") {
            angular.element(document.querySelector('[ng-controller=antecedentesController]')).scope().guarda_antecedentes();
        } else if ($scope.abrio === "sintomas") {
            angular.element(document.querySelector('[ng-controller=sintomasController]')).scope().guarda_sintomas();
        } else if ($scope.abrio === "habitos") {
            angular.element(document.querySelector('[ng-controller=habitosController]')).scope().guarda_habitos();
        } else if ($scope.abrio === "evaluaciones") {
            angular.element(document.querySelector('[ng-controller=evaluacionesController]')).scope().guarda_evaluaciones();
        }
    };

    $scope.buscar_datos = function () {
        $scope.error_modal = false;
        $scope.error_rfc_m = "";
        $scope.error_tel_s = "";
        $scope.rfc_busca = $('#rfc_busca').val();
        $scope.tel_busca = $('#tel_busca').val();
        if ($scope.rfc_busca !== "" && $scope.tel_busca === "") {
            $scope.cargando_modal = true;
            $scope.muestra_busca_usuario_m = false;
            var dir = "../php/busca_usuario.php";
            var user_data = { rfc: $scope.rfc_busca }
            $scope.comunicar(dir, user_data, $scope.datosusuario_exito, $scope.datosusuario_exito);
        } else if ($scope.rfc_busca === "" && $scope.tel_busca !== "") {
            $scope.cargando_modal = true;
            $scope.muestra_busca_usuario_m = false;
            var dir = "../php/busca_tel.php";
            var user_data = { telefono: $scope.tel_busca };
            $scope.comunicar(dir, user_data, $scope.datosusuario_exito, $scope.datosusuario_exito);
        } else if ($scope.rfc_busca !== "" && $scope.tel_busca !== "") {
            $scope.cargando_modal = true;
            $scope.muestra_busca_usuario_m = false;
            var dir = "../php/busca_usuario.php";
            var user_data = { rfc: $scope.rfc_busca }
            $scope.comunicar(dir, user_data, $scope.exito_cual, $scope.exito_cual);
        } else {
            $scope.error_modal = true;
            $scope.m_error_modal = "Debe introducir un RFC o un teléfono para iniciar la búsqueda.";
            $scope.error_rfc_m = "error";
            $scope.error_tel_s = "error";
        }
    };

    $scope.exito_cual = function (response) {
        if (response.data.length == 0) {
            $scope.cargando_modal = true;
            $scope.muestra_busca_usuario_m = false;
            var dir = "../php/busca_tel.php";
            var user_data = { telefono: $scope.tel_busca };
            $scope.comunicar(dir, user_data, $scope.datosusuario_exito, $scope.datosusuario_exito);
        } else {
            $scope.datosusuario_exito(response);
        }
    };

    $scope.datosusuario_exito = function (response) {
        $scope.error_modal = false;
        $scope.error_rfc_m = "";
        if (response.data.length == 0) {
            $scope.error_modal = true;
            $scope.m_error_modal = "No se encontraron registros.";
        } else {
            $scope.busca_rfc = false;
            $scope.busca_fecha = true;
            ngDialog.close();
            if (response.data.length > 1) {
                $scope.usuarios = [];
                for (var i = 0; i <= response.data.length; i++) {
                    $scope.usuarios.push(response.data[i]);
                }
                $scope.nombre_modal = "Seleccione un registro.";
                var template = "../views/modals/tabla.html";
                $scope.openModal(template, '80%', '100%');
            } else {
                sessionStorage.setItem('eleccion', 'recupera');
                sessionStorage.setItem('usuario', response.data[0].rfc);
                $scope.rfc_busca = response.data[0].rfc;
                sessionStorage.setItem('datosUsuario', JSON.stringify(response.data[0]));
                $scope.recuperados();
            }
        }
        $scope.cargando_modal = false;
    };

    $scope.recuperados = function () {
        $scope.redirecciona({ alias: 'general' });
        $scope.recupera_registrar = false;
        $scope.secciones_registro = true;
        $scope.aplica_generales();
        $scope.rec_antecedente();
        $scope.rec_factores();
        $scope.rec_diagnosticos();
        $scope.rec_habitos();
        $scope.rec_piel();
        $scope.rec_nervios();
        $scope.rec_pulmones();
        $scope.rec_estomago();
        $scope.rec_comidas();
        $scope.rec_cuantitativas();
        $scope.rec_adicional();
        $scope.rec_metas();
        $scope.rec_imagenes();
    };

    $scope.sel_user = function (user) {
        ngDialog.close();
        sessionStorage.setItem('eleccion', 'recupera');
        sessionStorage.setItem('usuario', user.rfc);
        $scope.rfc_busca = user.rfc;
        sessionStorage.setItem('datosUsuario', JSON.stringify(user));
        $scope.recuperados();
        $scope.aplica_generales();
    };

    $scope.aplica_generales = function () {
        var generales = JSON.parse(sessionStorage.datosUsuario);
        $scope.se_entero = generales.entero;
        $scope.referenciado = generales.referenciado;
        $scope.motivo_c = generales.motivo;
        $scope.fecha_reg = generales.fechaRegistro;
        $scope.nombre_com = generales.nombre;
        $scope.ap_paterno = generales.ap_pat;
        $scope.ap_materno = generales.ap_mat;
        $scope.rfc = generales.rfc;
        $scope.genero = generales.genero;
        $scope.civil = generales.edo_civil;
        $scope.hijos = generales.hijos;
        $scope.nacimiento = generales.nacimiento;
        $scope.escolar = generales.escolaridad;
        $scope.telefono = generales.telefono;
        $scope.tel_oficina = generales.tel_oficina;
        $scope.tel_celular = generales.tel_celular;
        $scope.email = generales.email;
        $scope.conf_email = generales.email;
        $scope.ad_email = generales.ad_email;
        $scope.conf_ad_email = generales.ad_email;
        $scope.pais = generales.pais;
        $scope.cp = generales.cp;
        $scope.estado = generales.estado;
        $scope.colonia = generales.colonia;
        $scope.delegacion = generales.delegacion;
        $scope.direccion = generales.direccion;
        $scope.name_municipio = generales.municipio;
        angular.element(document.querySelector('[ng-controller=generalController]')).scope().botones();
    };

    $scope.rec_antecedente = function () {
        var dir = "../php/busca_antecedentes.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.antecedentes_exito, $scope.antecedentes_exito);
    };

    $scope.rec_factores = function () {
        var dir = "../php/busca_factores.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.factores_exito, $scope.factores_exito);
    };

    $scope.rec_diagnosticos = function () {
        var dir = "../php/busca_diagnosticos.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.diagnosticos_exito, $scope.diagnosticos_exito);
    };

    $scope.rec_habitos = function () {
        var dir = "../php/busca_habitos.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.habitos_exito, $scope.habitos_exito);
    };

    $scope.antecedentes_exito = function (response) {
        sessionStorage.setItem('Antecedentes', JSON.stringify(response.data));
    };

    $scope.factores_exito = function (response) {
        sessionStorage.setItem('Facores', JSON.stringify(response.data));
    };

    $scope.diagnosticos_exito = function (response) {
        sessionStorage.setItem('Diagnosticos', JSON.stringify(response.data));
    };

    $scope.habitos_exito = function (response) {
        $scope.muestra_alertas('oculta', '');
        sessionStorage.setItem('Habitos', JSON.stringify(response.data));
    };



    $scope.rec_piel = function () {
        var dir = "../php/busca_piel.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.piel_exito, $scope.piel_exito);
    };

    $scope.rec_nervios = function () {
        var dir = "../php/busca_nervios.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.nervios_exito, $scope.nervios_exito);
    };

    $scope.rec_pulmones = function () {
        var dir = "../php/busca_pulmones.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.pulmones_exito, $scope.pulmones_exito);
    };

    $scope.rec_estomago = function () {
        var dir = "../php/busca_estomago.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.estomago_exito, $scope.estomago_exito);
    };


    $scope.piel_exito = function (response) {
        sessionStorage.setItem('Piel', JSON.stringify(response.data));
    };

    $scope.nervios_exito = function (response) {
        sessionStorage.setItem('Nervios', JSON.stringify(response.data));
    };

    $scope.pulmones_exito = function (response) {
        sessionStorage.setItem('Pulmones', JSON.stringify(response.data));
    };

    $scope.estomago_exito = function (response) {
        $scope.muestra_alertas('oculta', '');
        sessionStorage.setItem('Estomago', JSON.stringify(response.data));
    };

    $scope.rec_comidas = function () {
        var dir = "../php/busca_comida.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.comida_exito, $scope.comida_exito);
    };

    $scope.comida_exito = function (response) {
        $scope.muestra_alertas('oculta', '');
        sessionStorage.setItem('Comidas', JSON.stringify(response.data));
    };


    $scope.rec_cuantitativas = function () {
        var dir = "../php/busca_cuantitativas.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.cuantitativas_exito, $scope.cuantitativas_exito);
    };

    $scope.rec_adicional = function () {
        var dir = "../php/busca_adicional.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.adicional_exito, $scope.adicional_exito);
    };

    $scope.rec_metas = function () {
        var dir = "../php/busca_metas.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.metas_exito, $scope.metas_exito);
    };

    $scope.rec_imagenes = function () {
        var dir = "../php/busca_imagenes.php";
        var user_data = { rfc: $scope.rfc_busca }
        $scope.comunicar(dir, user_data, $scope.imagenes_exito, $scope.imagenes_exito);
    };

    $scope.cuantitativas_exito = function (response) {
        $scope.muestra_alertas('oculta', '');
        sessionStorage.setItem('Cuantitativas', JSON.stringify(response.data));
    };

    $scope.adicional_exito = function (response) {
        $scope.muestra_alertas('oculta', '');
        sessionStorage.setItem('Adicional', JSON.stringify(response.data));
    };

    $scope.metas_exito = function (response) {
        $scope.muestra_alertas('oculta', '');
        sessionStorage.setItem('Metas', JSON.stringify(response.data));
    };

    $scope.imagenes_exito = function (response) {
        var img = response.data;
        var arreglo = [];
        for (var i = 0; i < img.length; i++) {
            var obj = {
                secc: response.data[i].seccion,
                ruta: response.data[i].ruta,
                desc: response.data[i].descripcion,
                fecha_reg: response.data[i].fecha_reg,
                hora_reg: response.data[i].hora_reg
            };
            arreglo.push(obj);
        }
        sessionStorage.setItem('Imagenes', JSON.stringify(arreglo));
    };

    $scope.terminar_todo = function () {
        sessionStorage.clear();
        $scope.principal();
    };

    /**** función para mostrar alertas ****/
    $scope.muestra_alertas = function (tipo, mensaje) {
        $scope.alerta_exito = false;
        $scope.alerta_error = false;
        if (tipo === "exito") {
            $scope.alerta_exito = true;
            $scope.mensaje_exito = mensaje;
        } else if (tipo === "error") {
            $scope.alerta_error = true;
            $scope.mensaje_error = mensaje;
        } else if (tipo === "oculta") {
            $scope.alerta_exito = false;
            $scope.alerta_error = false;
        }
    };

    /**** función para mostrar loading ****/
    $scope.muestra_cargar = function (opc) {
        if (opc === 'M') {
            $scope.cargando_general = true;
        } else {
            $scope.cargando_general = false;
        }
    };

    /**** función para acomodar fechas ****/
    $scope.cambia_fechas = function (fecha) {
        var dia = fecha.getDate();
        var mes = fecha.getMonth() + 1;
        if (mes < 10) {
            mes = '0' + mes;
        }
        if (dia < 10) {
            dia = '0' + dia;
        }
        var anio = fecha.getFullYear();
        var fecha_actual = String(anio + "-" + mes + "-" + dia);
        return fecha_actual;
    };

    /**** función para comunicar php y el servidor    ****/
    $scope.comunicar = function (archivo, datos, fnExito, fnError) {
        var request = $http.post(archivo, datos, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
            },
            timeout: 600000
        });

        if (typeof (fnError) !== "undefined") {
            request.then(function (response) {
                fnExito(response);
            }, fnError);
        } else {
            request.then(function (response) {
                fnExito(response);
            });
        }
    };

    /**** función para abirir modal de confirmación ****/
    $scope.openModal_confirm = function (template, tamaño, alto, cabecera, mensaje, seccion) {
        $scope.nombre_modal = cabecera;
        $scope.mensaje_modal = mensaje;
        $scope.abrio = seccion;
        ngDialog.open({
            template: template,
            className: 'ngdialog-theme-default',
            scope: $scope,
            keyboard: true,
            width: tamaño,
            height: alto
        });
    };

    /**** función para abirir modal simple ****/
    $scope.openModal = function (template, tamaño, alto) {
        ngDialog.open({
            template: template,
            className: 'ngdialog-theme-default',
            scope: $scope,
            keyboard: true,
            width: tamaño,
            height: alto
        });
    };

    /**** función para cerrar modal ****/
    $scope.cancelar_ligar = function () {
        ngDialog.close();
    };

    $scope.validaFalse = function (dato) {
        return dato === null || dato === undefined ? false : dato;
    };

    $scope.validaVacio = function (dato) {
        return dato === null || dato === undefined ? "" : dato;
    };

    $scope.validaNS = function (dato) {
        return dato === null || dato === undefined ? "NO SABE O NO APLICA" : dato;
    };

    $scope.validaNo = function (dato) {
        return dato === null || dato === undefined ? "no" : dato;
    };

    $scope.validaBool = function (dato) {
        return dato === true ? 1 : 0;
    };

    $scope.validaTrue = function (dato) {
        return dato === "1" || dato === 1 || dato === true ? true : false;
    };

    $scope.valida_hora = function (dato) {
        return dato === "0" || dato === 0 || dato === false ? "no" : "si";
    };

    $scope.validaCero = function (dato) {
        return dato === null || dato === undefined ? 0 : dato;
    };

    $scope.validaSiNo = function (dato) {
        return dato === null || dato === undefined || dato === "no" ? 0 : 1;
    };

    $scope.validaTrueR = function (dato) {
        return dato === "1" || dato === 1 || dato === true ? 'SÍ' : 'NO';
    };

    $scope.valida_genero = function (dato) {
        return dato === "M" ? "MASCULINO" : "FEMENINO";
    };

    $scope.valida_civil = function (dato) {
        if (dato === "S") {
            return "SOLTERO";
        } else if (dato === "C") {
            return "CASADO";
        } else if (dato === "D") {
            return "DIVORCIADO";
        } else if (dato === "U") {
            return "UNIÓN LIBRE";
        }
    };

    $scope.valida_escuela = function (dato) {
        if (dato === "MAESTRIA") {
            return "MAESTRÍA";
        } else if (dato === "SIN") {
            return "SIN ESPECIFICAR";
        } else {
            return dato;
        }
    };

    $scope.exportar_pdf = function (fecha) {
        $scope.error_fecha_rep = "";
        $scope.error_modal = false;
        if (fecha !== "" && fecha !== undefined && fecha !== null) {
            $scope.exportando(fecha)
        } else {
            $scope.error_modal = true;
            $scope.m_error_modal = "Debe seleccionar una fecha, para generar un reporte.";
            $scope.error_fecha_rep = "error";
        }
    };

    $scope.exportando = function (fecha) {
        ngDialog.close();
        $scope.muestra_cargar('M');
        var separada = fecha.split(' / ');
        var fecha_s = separada[0];
        var hora_s = separada[1];
        var generales = JSON.parse(sessionStorage.datosUsuario);
        var entero = generales.entero;
        var referenciado = generales.referenciado;
        var motivo = generales.motivo;
        var nombre = generales.nombre;
        var ap_pat = generales.ap_pat;
        var ap_mat = generales.ap_mat;
        var rfc = generales.rfc;
        var genero = $scope.valida_genero(generales.genero);
        var civil = $scope.valida_civil(generales.edo_civil);
        var hijos = generales.hijos;
        var nacimiento = generales.nacimiento;
        var escolar = $scope.valida_escuela(generales.escolaridad);
        var telefono = generales.telefono;
        var tel_oficina = generales.tel_oficina;
        var tel_celular = generales.tel_celular;
        var email = generales.email;
        var ad_email = generales.ad_email;
        var pais = generales.pais;
        var cp = generales.cp;
        var estado = generales.estado;
        var colonia = generales.colonia;
        var delegacion = generales.delegacion;
        var direccion = generales.direccion;
        var name_municipio = generales.municipio;


        var antecedentes = JSON.parse(sessionStorage.Antecedentes);
        for (var i = 0; i < antecedentes.length; i++) {
            if ((antecedentes[i].fecha_reg === fecha_s) && (antecedentes[i].hora_reg === hora_s)) {
                var colesterol = antecedentes[i].colesterol;
                var colesterol_t = antecedentes[i].colesterol_t;
                var colesterol_b = antecedentes[i].colesterol_b;
                var colesterol_m = antecedentes[i].colesterol_m;
                var trigliceridos = antecedentes[i].trigliceridos;
                var glucosa = antecedentes[i].glucosa;
                var diagnosticos = antecedentes[i].diagnosticos;
                break;
            } else {
                var colesterol = "-";
                var colesterol_t = "-";
                var colesterol_b = "-";
                var colesterol_m = "-";
                var trigliceridos = "-";
                var glucosa = "-";
                var diagnosticos = "-";
            }
        }

        var factores = JSON.parse(sessionStorage.Facores);
        for (var i = 0; i < factores.length; i++) {
            if ((factores[i].fecha_reg === fecha_s) && (factores[i].hora_reg === hora_s)) {
                var hipertension = factores[i].hipertension;
                var hiper_q = factores[i].q_hiper;
                var diabetes = factores[i].diabetes;
                var diabetes_q = factores[i].q_diabetes;
                var cancer = factores[i].cancer;
                var cancer_q = factores[i].q_cancer;
                var cardiaca = factores[i].cardiaca;
                var cardiaca_q = factores[i].q_cardiaca;
                var pulmonar = factores[i].pulmonar;
                var pulmonar_q = factores[i].q_pulmonar;
                var otras = factores[i].otras;
                var otras_enf = factores[i].otras_enf;
                var otras_q = factores[i].q_otras;
                break;
            } else {
                var hipertension = "-";
                var hiper_q = "-";
                var diabetes = "-";
                var diabetes_q = "-";
                var cancer = "-";
                var cancer_q = "-";
                var cardiaca = "-";
                var cardiaca_q = "-";
                var pulmonar = "-";
                var pulmonar_q = "-";
                var otras = "-";
                var otras_enf = "-";
                var otras_q = "-";
            }
        }

        var diagnosticos = JSON.parse(sessionStorage.Diagnosticos);
        for (var i = 0; i < diagnosticos.length; i++) {
            if ((diagnosticos[i].fecha_reg === fecha_s) && (diagnosticos[i].hora_reg === hora_s)) {
                hace_cuanto = diagnosticos[i].hace_cuanto;
                tratamiento = diagnosticos[i].tratamiento;
                medicamentos = diagnosticos[i].medicamentos;
                medicamentos_i = diagnosticos[i].medica_info;
                embarazo = diagnosticos[i].embarazo;
                abortos = diagnosticos[i].abortos;
                segura = diagnosticos[i].segura;
                periodo = diagnosticos[i].periodo;
                alergico = diagnosticos[i].alergico;
                deshidratacion = diagnosticos[i].deshidratacion;
                hormonas = diagnosticos[i].hormonas;
                ortopedicos = diagnosticos[i].ortopedicos;
                depresion = diagnosticos[i].depresion;
                hiper_p = $scope.validaTrueR(diagnosticos[i].hipertension);
                diabetes_p = $scope.validaTrueR(diagnosticos[i].diabetes);
                corazon_p = $scope.validaTrueR(diagnosticos[i].cardiaca);
                pulmon_p = $scope.validaTrueR(diagnosticos[i].pulmonar);
                renal_p = $scope.validaTrueR(diagnosticos[i].renal);
                cancer_p = $scope.validaTrueR(diagnosticos[i].cancer);
                tiroides_p = $scope.validaTrueR(diagnosticos[i].tiroides);
                auto_p = $scope.validaTrueR(diagnosticos[i].autoinmune);
                break;
            } else {
                hace_cuanto = "-";
                tratamiento = "-";
                medicamentos = "-";
                medicamentos_i = "-";
                embarazo = "-";
                abortos = "-";
                segura = "-";
                periodo = "-";
                alergico = "-";
                deshidratacion = "-";
                hormonas = "-";
                ortopedicos = "-";
                depresion = "-";
                hiper_p = "-";
                diabetes_p = "-";
                corazon_p = "-";
                pulmon_p = "-";
                renal_p = "-";
                cancer_p = "-";
                tiroides_p = "-";
                auto_p = "-";
            }
        }

        var habitos = JSON.parse(sessionStorage.Habitos);
        for (var i = 0; i < habitos.length; i++) {
            if ((habitos[i].fecha_reg === fecha_s) && (habitos[i].hora_reg === hora_s)) {
                var fuma = habitos[i].fuma;
                var ejercicio = habitos[i].ejercicio;
                var duerme = habitos[i].duerme;
                var meditacion = habitos[i].meditacion;
                var ocio = habitos[i].ocio;
                break;
            } else {
                var fuma = "-";
                var ejercicio = "-";
                var duerme = "-";
                var meditacion = "-";
                var ocio = "-";
            }
        }
        var piel = JSON.parse(sessionStorage.Piel);
        for (var i = 0; i < piel.length; i++) {
            if ((piel[i].fecha_reg === fecha_s) && (piel[i].hora_reg === hora_s)) {
                acne_s = $scope.validaTrueR(piel[i].acne);
                salpullido_s = $scope.validaTrueR(piel[i].salpullido);
                psoriasis_s = $scope.validaTrueR(piel[i].psoriasis);
                exceso_grasa_s = $scope.validaTrueR(piel[i].ex_grasa);
                cicatrices_s = $scope.validaTrueR(piel[i].cicatrices);
                sequedad_s = $scope.validaTrueR(piel[i].sequedad);
                mucosa_s = $scope.validaTrueR(piel[i].mucosa);
                cabello_s = $scope.validaTrueR(piel[i].cabello);
                envejecer_s = $scope.validaTrueR(piel[i].envejecer);
                des_piel = piel[i].descrip_piel;
                break;
            } else {
                acne_s = "-";
                salpullido_s = "-";
                psoriasis_s = "-";
                exceso_grasa_s = "-";
                cicatrices_s = "-";
                sequedad_s = "-";
                mucosa_s = "-";
                cabello_s = "-";
                envejecer_s = "-";
                des_piel = "-";
            }
        }

        var nervios = JSON.parse(sessionStorage.Nervios);
        for (var i = 0; i < nervios.length; i++) {
            if ((nervios[i].fecha_reg === fecha_s) && (nervios[i].hora_reg === hora_s)) {
                ansiedad_s = $scope.validaTrueR(nervios[i].ansiedad);
                wake_s = $scope.validaTrueR(nervios[i].levantarse);
                estres_s = $scope.validaTrueR(nervios[i].estres);
                fiebre_s = $scope.validaTrueR(nervios[i].fiebre);
                agita_s = $scope.validaTrueR(nervios[i].agitacion);
                latidos_s = $scope.validaTrueR(nervios[i].latidos);
                peso_s = $scope.validaTrueR(nervios[i].peso);
                malestar_s = $scope.validaTrueR(nervios[i].malestar);
                fatiga_s = $scope.validaTrueR(nervios[i].fatiga);
                cansancio_s = $scope.validaTrueR(nervios[i].cansancio);
                agotamiento_s = $scope.validaTrueR(nervios[i].agotamiento);
                debilidad_s = $scope.validaTrueR(nervios[i].debilidad);
                rendimiento_s = $scope.validaTrueR(nervios[i].rendimiento);
                concentrar_s = $scope.validaTrueR(nervios[i].concentrar);
                hiperactividad_s = $scope.validaTrueR(nervios[i].hiperactividad);
                memoria_s = $scope.validaTrueR(nervios[i].memoria);
                apetito_s = $scope.validaTrueR(nervios[i].apetito);
                a_apetito_s = $scope.validaTrueR(nervios[i].aum_apetito);
                sudor_s = $scope.validaTrueR(nervios[i].sudor);
                animo_s = $scope.validaTrueR(nervios[i].animo);
                panico_s = $scope.validaTrueR(nervios[i].panico);
                des_nervio = nervios[i].des_nervio;
                break;
            } else {
                ansiedad_s = "-";
                wake_s = "-";
                estres_s = "-";
                fiebre_s = "-";
                agita_s = "-";
                latidos_s = "-";
                peso_s = "-";
                malestar_s = "-";
                fatiga_s = "-";
                cansancio_s = "-";
                agotamiento_s = "-";
                debilidad_s = "-";
                rendimiento_s = "-";
                concentrar_s = "-";
                hiperactividad_s = "-";
                memoria_s = "-";
                apetito_s = "-";
                a_apetito_s = "-";
                sudor_s = "-";
                animo_s = "-";
                panico_s = "-";
                des_nervio = "-";
            }
        }

        var pulmones = JSON.parse(sessionStorage.Pulmones);
        for (var i = 0; i < pulmones.length; i++) {
            if ((pulmones[i].fecha_reg === fecha_s) && (pulmones[i].hora_reg === hora_s)) {
                respirar_s = $scope.validaTrueR(pulmones[i].respirar);
                jadeo_s = $scope.validaTrueR(pulmones[i].jadeo);
                asma_s = $scope.validaTrueR(pulmones[i].asma);
                moco_s = $scope.validaTrueR(pulmones[i].moco);
                constipada_s = $scope.validaTrueR(pulmones[i].constipada);
                rinitis_s = $scope.validaTrueR(pulmones[i].rinitis);
                sinucitis_s = $scope.validaTrueR(pulmones[i].sinucitis);
                bronquitis_s = $scope.validaTrueR(pulmones[i].bronquitis);
                tos_s = $scope.validaTrueR(pulmones[i].tos);
                gripa_s = $scope.validaTrueR(pulmones[i].gripa);
                des_pulmon = pulmones[i].des_pulmon;
                break;
            } else {
                respirar_s = "-";
                jadeo_s = "-";
                asma_s = "-";
                moco_s = "-";
                constipada_s = "-";
                rinitis_s = "-";
                sinucitis_s = "-";
                bronquitis_s = "-";
                tos_s = "-";
                gripa_s = "-";
                des_pulmon = "-";
            }
        }

        var estomago = JSON.parse(sessionStorage.Estomago);
        for (var i = 0; i < estomago.length; i++) {
            if ((estomago[i].fecha_reg === fecha_s) && (estomago[i].hora_reg === hora_s)) {
                lengua_s = $scope.validaTrueR(estomago[i].lengua);
                abdominal_s = $scope.validaTrueR(estomago[i].abdominal);
                nausea_s = $scope.validaTrueR(estomago[i].nausea);
                vomito_s = $scope.validaTrueR(estomago[i].vomito);
                boca_e_s = $scope.validaTrueR(estomago[i].boca_est);
                colitis_s = $scope.validaTrueR(estomago[i].colitis);
                gastritis_s = $scope.validaTrueR(estomago[i].gastritis);
                aliento_s = $scope.validaTrueR(estomago[i].aliento);
                eructos_s = $scope.validaTrueR(estomago[i].eructos);
                gases_s = $scope.validaTrueR(estomago[i].gases);
                estrenimiento_s = $scope.validaTrueR(estomago[i].estrenimiento);
                indigestion_s = $scope.validaTrueR(estomago[i].indigestion);
                pies_s = $scope.validaTrueR(estomago[i].pies);
                sed_s = $scope.validaTrueR(estomago[i].sed);
                cabeza_s = $scope.validaTrueR(estomago[i].cabeza);
                migrana_s = $scope.validaTrueR(estomago[i].migrana);
                vision_s = $scope.validaTrueR(estomago[i].vision);
                mareos_s = $scope.validaTrueR(estomago[i].mareos);
                des_digestion = estomago[i].des_digestion;
                des_antojos = estomago[i].des_antojos;
                colon = estomago[i].colon;
                des_evacua = estomago[i].des_evacua;
                break;
            } else {
                lengua_s = "-";
                abdominal_s = "-";
                nausea_s = "-";
                vomito_s = "-";
                boca_e_s = "-";
                colitis_s = "-";
                gastritis_s = "-";
                aliento_s = "-";
                eructos_s = "-";
                gases_s = "-";
                estrenimiento_s = "-";
                indigestion_s = "-";
                pies_s = "-";
                sed_s = "-";
                cabeza_s = "-";
                migrana_s = "-";
                vision_s = "-";
                mareos_s = "-";
                des_digestion = "-";
                des_antojos = "-";
                colon = "-";
                des_evacua = "-";
            }
        }

        var comidas = JSON.parse(sessionStorage.Comidas);
        for (var i = 0; i < comidas.length; i++) {
            if ((comidas[i].fecha_reg === fecha_s) && (comidas[i].hora_reg === hora_s)) {
                horario = $scope.valida_hora(comidas[i].horario);
                num_com = comidas[i].num_comida;
                desayuno = comidas[i].desayuno;
                almuerzo = comidas[i].almuerzo;
                comida = comidas[i].comida;
                merienda = comidas[i].merienda;
                cena = comidas[i].cena;
                bebidas = comidas[i].bebidas;
                break;
            } else {
                horario = "-";
                num_com = "-";
                desayuno = "-";
                almuerzo = "-";
                comida = "-";
                merienda = "-";
                cena = "-";
                bebidas = "-";
            }
        }

        var cuanti = JSON.parse(sessionStorage.Cuantitativas);
        for (var i = 0; i < cuanti.length; i++) {
            if ((cuanti[i].fecha_reg === fecha_s) && (cuanti[i].hora_reg === hora_s)) {
                edad = parseInt(cuanti[i].edad);
                cms = parseFloat(cuanti[i].cm).toFixed(2);
                peso = parseInt(cuanti[i].peso);
                med_brazo = parseFloat(cuanti[i].med_brazo).toFixed(2);
                masa_grasa = parseFloat(cuanti[i].masa_grasa).toFixed(2);
                med_cintura = parseFloat(cuanti[i].med_cintura).toFixed(2);
                masa_musc = parseFloat(cuanti[i].masa_musc).toFixed(2);
                med_cadera = parseFloat(cuanti[i].med_cadera).toFixed(2);
                imc = parseFloat(cuanti[i].imc).toFixed(2);
                med_pierna = parseFloat(cuanti[i].med_pierna).toFixed(2);
                complexion = cuanti[i].complexion;
                ideal = parseFloat(cuanti[i].ideal).toFixed(2);
                break;
            } else {
                edad = "-";
                cms = "-";
                peso = "-";
                med_brazo = "-";
                masa_grasa = "-";
                med_cintura = "-";
                masa_musc = "-";
                med_cadera = "-";
                imc = "-";
                med_pierna = "-";
                complexion = "-";
                ideal = "-";
            }
        }

        var adicional = JSON.parse(sessionStorage.Adicional);
        for (var i = 0; i < adicional.length; i++) {
            if ((adicional[i].fecha_reg === fecha_s) && (adicional[i].hora_reg === hora_s)) {
                animo = adicional[i].animo;
                emocional = adicional[i].emocional;
                nutriologo = $scope.valida_hora(adicional[i].nutriologo).toUpperCase();
                nutriologo_q = adicional[i].nutriologo_q;
                logro = $scope.valida_hora(adicional[i].logro).toUpperCase();
                logro_q = adicional[i].logro_q;
                motiva = adicional[i].motiva;
                resultados = adicional[i].resultados;
                sobrepeso = adicional[i].sobrepeso;
                break;
            } else {
                animo = "-";
                emocional = "-";
                nutriologo = "-";
                nutriologo_q = "-";
                logro = "-";
                logro_q = "-";
                motiva = "-";
                resultados = "-";
                sobrepeso = "-";
            }
        }

        var metas = JSON.parse(sessionStorage.Metas);
        for (var i = 0; i < metas.length; i++) {
            if ((metas[i].fecha_reg === fecha_s) && (metas[i].hora_reg === hora_s)) {
                meta = metas[i].meta;
                pretextos = metas[i].pretextos;
                compromisos = metas[i].compromisos;
                fecha_meta = metas[i].fecha_meta;
                break;
            } else {
                meta = "-";
                pretextos = "-";
                compromisos = "-";
                fecha_meta = "-";
            }
        }

        var docDefinition = {
            content: [{
                text: '(*) Los campos que aparezcan con "-", no se llenaron completamente.', color: 'red'
            }, {
                text: '                                      ', style: 'header'
            }, {
                text: 'DATOS GENERALES', style: 'header', color: '#07BCD4'
            }, {
                text: '                                      ', style: 'header'
            }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['¿Cómo se enteró del servicio?', entero],
                        ['Referido por', referenciado],
                        ['Motivo de la consulta', motivo],
                        ['Nombre completo', nombre],
                        ['Apellido paterno', ap_pat],
                        ['Apellido materno', ap_mat],
                        ['RFC', rfc],
                        ['Género', genero],
                        ['Estado civil', civil],
                        ['No. de hijos', hijos],
                        ['Fecha de nacimiento', nacimiento],
                        ['Escolaridad', escolar],
                        ['Teléfono', telefono],
                        ['Teléfono celular', tel_celular],
                        ['Teléfono oficina', tel_oficina],
                        ['E-mail', email],
                        ['E-mail adicional', ad_email],
                        ['País', pais],
                        ['Dirección', direccion],
                        ['Colonia', colonia],
                        ['Delegación', delegacion],
                        ['C.P.', cp],
                        ['Estado', estado],
                        ['Municipio', name_municipio]
                    ]
                }, style: 'centrado', pageBreak: 'after'
            }, {
                text: 'ANTECEDENTES MÉDICOS', style: 'header', color: '#9fce4e'
            }, {
                text: '                                      ', style: 'header'
            }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Colesterol', colesterol],
                        ['Colesterol Total', colesterol_t],
                        ['Colesterol LPAD (B)', colesterol_b],
                        ['Colesterol LPBD (M)', colesterol_m],
                        ['Triglicéridos', trigliceridos],
                        ['Glucosa', glucosa]
                    ]
                }, style: 'centrado'
            }, { text: '                                      ', style: 'header' }, {
                text: '¿Alguno de sus familiares como padre, madre o tíos cercanos padece alguna de las siguientes enfermedades?', style: 'REACTIVOs', color: '#9fce4e'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Hipertensión', hipertension.toUpperCase()],
                        ['¿Quién la padece?', hiper_q],
                        ['Diabetes', diabetes.toUpperCase()],
                        ['¿Quién la padece?', diabetes_q],
                        ['Cáncer', cancer.toUpperCase()],
                        ['¿Quién lo padece?', cancer_q],
                        ['Enfermedades cardíacas', cardiaca.toUpperCase()],
                        ['¿Quién las padece?', cardiaca_q],
                        ['Enfermedades pulmonares', pulmonar.toUpperCase()],
                        ['¿Quién las padece?', pulmonar_q],
                        ['Otras enfermedades', otras.toUpperCase()],
                        ['¿Cuáles?', otras_enf],
                        ['¿Quién las padece?', otras_q]
                    ]
                }, style: 'centrado', pageBreak: 'after'
            }, { text: '                                      ', style: 'header' }, {
                text: '¿Padece usted alguna de las siguientes enfermedades?', style: 'REACTIVOs', color: '#9fce4e'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Hipertensión arterial', hiper_p.toUpperCase()],
                        ['Diabetes', diabetes_p.toUpperCase()],
                        ['Enfermedades del corazón', corazon_p.toUpperCase()],
                        ['Enfermedades del pulmón', pulmon_p.toUpperCase()],
                        ['Enfermedades renales', renal_p.toUpperCase()],
                        ['Cáncer', cancer_p.toUpperCase()],
                        ['Tiroides', tiroides_p.toUpperCase()],
                        ['Autoinmunes', auto_p.toUpperCase()],
                        ['¿Desde hace cuánto tiempo?', hace_cuanto.toUpperCase()],
                        ['¿Recibe algún tratamiento?', tratamiento.toUpperCase()],
                        ['¿Toma medicamentos con o sin prescripción médica?', medicamentos.toUpperCase()],
                        ['¿Cuáles?', medicamentos_i.toUpperCase()],
                        ['¿Está embarazada?', embarazo.toUpperCase()],
                        ['Mencione el número de embarazos, cesáreas, abortos (de ser el caso)', abortos.toUpperCase()],
                        ['¿Está completamente segura de que no lo está?', segura.toUpperCase()],
                        ['Indique si es regular en su período y si padece SPM (cólicos y molestias), depresión o ansiedad antes, durante o después del período menstrual', periodo.toUpperCase()],
                        ['Mencione si es alérgico a algún medicamento o alimento', alergico.toUpperCase()],
                        ['¿Ha sufrido reciente deshidratación severa reciente? (que haya tenido que utilizar suero prescrito por un profesional ya sea oral o intravenoso) ¿Hace cuánto tiempo y cuál fue la razón?', deshidratacion.toUpperCase()],
                        ['Mencione si padece de algún desequilibrio hormonal, si utiliza hormonas y especifique cuáles y ¿para qué?', hormonas.toUpperCase()],
                        ['Mencione padecimientos ortopédicos, esquelético-muscular, o lesiones:', ortopedicos.toUpperCase()],
                        ['Mencione si en su historia de vida hay o hubo depresión (5), intento de suicidio, ansiedad, irritabilidad, convulsiones, hospitalización psiquiátrica. (Especifique qué, hace cuánto y cuánto tiempo duró y si toma o tomó medicamento psiquiátrico)', depresion.toUpperCase()]
                    ]
                }, style: 'centrado', pageBreak: 'after'
            }, { text: '                                      ', style: 'header' }, {
                text: 'Describa brevemente los siguientes hábitos', style: 'REACTIVOs', color: '#9fce4e'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Mencione si fuma o bebe o toma alguna droga, qué cantidad y la frecuencia con la que lo hace', fuma],
                        ['¿Actualmente realiza ejercicio? (especifique cuál y con qué frecuencia) ¿Tiene algún impedimento para realizar ejercicio físico?', ejercicio],
                        ['¿Cómo duerme? Número de horas y si es bueno o malo su descanso. (Escribir si tiene horario de sueño) ¿Padece insomnio? (Describirlo)', duerme],
                        ['¿Practica Meditación o relajación habitualmente?', meditacion],
                        ['¿Planea actividades de ocio y entretenimiento?', ocio]
                    ]
                }, style: 'centrado', pageBreak: 'after'
            }, {
                text: 'SÍNTOMAS', style: 'header', color: '#f5b70b'
            }, { text: '                                      ', style: 'header' }, {
                text: 'Piel y mucosas', style: 'REACTIVOs', color: '#f5b70b'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Acné severo o leve', acne_s],
                        ['Salpullido o urticaria en la piel', salpullido_s],
                        ['Psoriasis (enfermedad de la piel)', psoriasis_s],
                        ['Exceso de grasa en piel o cuero cabelludo', exceso_grasa_s],
                        ['Dificultad en cicatrización de heridas', cicatrices_s],
                        ['Sequedad en piel o mucosa nasal', sequedad_s],
                        ['Mucosa ocular o vaginal', mucosa_s],
                        ['Pérdida excesiva de cabello', cabello_s],
                        ['Envejecimiento prematuro', envejecer_s],
                        ['Descripción breve y frecuencia', envejecer_s]
                    ]
                }, style: 'centrado'
            }, { text: '                                      ', style: 'header' }, {
                text: 'Sistema nervioso y otros', style: 'REACTIVOs', color: '#f5b70b'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Ansiedad', ansiedad_s],
                        ['Dificultad para levantarse', wake_s],
                        ['Demasiado Estres', estres_s],
                        ['Fiebre', fiebre_s],
                        ['Agitación sin razón', agita_s],
                        ['Latidos cárdiacos irregulares', latidos_s],
                        ['Cambios de peso', peso_s],
                        ['Malestar general', malestar_s],
                        ['Fatiga', fatiga_s],
                        ['Cansancio', cansancio_s],
                        ['Agotamiento sin razón', agotamiento_s],
                        ['Debilidad', debilidad_s],
                        ['Bajo rendimiento mental', rendimiento_s],
                        ['Dificultad para concentrarse', concentrar_s],
                        ['Hiperactividad', hiperactividad_s],
                        ['Pérdida de memoria', memoria_s],
                        ['Mucosa ocular o vaginal', mucosa_s],
                        ['Pérdida excesiva de cabello', cabello_s],
                        ['Pérdida de apetito', apetito_s],
                        ['Aumento de apetito', a_apetito_s],
                        ['Sudoración nocturna', sudor_s],
                        ['Alteraciones en estado de ánimo. (Ejemplos: irritabilidad, enojo, sensiblilidad, tristeza repentina etc)', animo_s],
                        ['Ataques de pánico', panico_s],
                        ['Descripción breve y frecuencia', des_nervio]
                    ]
                }, style: 'centrado'
            }, { text: '                                      ', style: 'header' }, {
                text: 'Sistema pulmonar', style: 'REACTIVOs', color: '#f5b70b'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Dificultad para respirar', respirar_s],
                        ['Respiración jadeante', jadeo_s],
                        ['Asma', asma_s],
                        ['Exceso de moco', moco_s],
                        ['Sensación de nariz constipada', constipada_s],
                        ['Rinitis', rinitis_s],
                        ['Sinucitis', sinucitis_s],
                        ['Bronquitis', bronquitis_s],
                        ['Tos frecuente', tos_s],
                        ['Gripas frecuentes o duraderas', gripa_s],
                        ['Descripción breve y frecuencia', des_pulmon]
                    ]
                }, style: 'centrado', pageBreak: 'after'
            }, { text: '                                      ', style: 'header' }, {
                text: 'Sistema digestivo', style: 'REACTIVOs', color: '#f5b70b'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Lengua cubierta de blanco en el día o al despertarse', lengua_s],
                        ['Dolor abdominal', abdominal_s],
                        ['Náuseas', nausea_s],
                        ['Vómito', vomito_s],
                        ['Hinchazón o ardor en la boca del estómago', boca_e_s],
                        ['Colitis', colitis_s],
                        ['Gastritis', gastritis_s],
                        ['Mal aliento', aliento_s],
                        ['Eructos', eructos_s],
                        ['Gases', gases_s],
                        ['Estreñimiento', estrenimiento_s],
                        ['Indigestión', indigestion_s],
                        ['Pies y manos fríos', pies_s],
                        ['Mucha sed', sed_s],
                        ['Dolor de cabeza', cabeza_s],
                        ['Migraña', migrana_s],
                        ['Visión borrosa', vision_s],
                        ['Mareos frecuentes', mareos_s],
                        ['Descripción breve y frecuencia', des_digestion],
                        ['¿Tiene antojo incontrolable por alimentos: dulces, salados, etc.? (Frecuencia y especifique el alimento)', des_antojos],
                        ['Veces que evacua el colón', colon],
                        ['Describa su digestión y evacuación: (número de veces, forma, color)', des_evacua]
                    ]
                }, style: 'centrado', pageBreak: 'after'
            }, { text: '                                      ', style: 'header' }, {
                text: 'HÁBITOS NUTRICIONALES', style: 'header', color: '#f5813d'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['¿Tiene horarios establecidos para realizar sus alimentos?', horario.toUpperCase()],
                        ['Número de comidas que realiza al día', num_com]
                    ]
                }, style: 'centrado'
            }, { text: '                                      ', style: 'header' }, {
                text: 'Nota breve de cómo es un día habitual de su alimentación desde que se despierta hasta que se duerme', style: 'REACTIVOs', color: '#f5813d'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Desayuno', desayuno],
                        ['Almuerzo', almuerzo],
                        ['Comida', comida],
                        ['Merienda', merienda],
                        ['Cena', cena],
                        ['¿Cuánta agua natural toma y que más líquidos habitualmente prepara; como té, café, refresco, alcohol y con qué frecuencia?', bebidas]
                    ]
                }, style: 'centrado', pageBreak: 'after'
            }, {
                text: 'EVALUACIONES', style: 'header', color: '#077915'
            }, { text: '                                      ', style: 'header' }, {
                text: 'Cuantitativas', style: 'REACTIVOs', color: '#077915'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Edad', edad],
                        ['Estatura', cms]
                    ]
                }, style: 'centrado'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['25%', '25%', '25%', '25%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }, { text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Peso', peso, 'Medición brazo', med_brazo],
                        ['Masa grasa', masa_grasa, 'Medición cintura', med_cintura],
                        ['Masa muscular', masa_musc, 'Medición cadera', med_cadera],
                        [{ text: 'IMC', bold: true, fontSize: 15 }, { text: imc, bold: true, fontSize: 15 }, 'Medición pierna', med_pierna]
                    ]
                }, style: 'centrado'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Complexión', complexion],
                        ['Peso ideal estimado', ideal]
                    ]
                }, style: 'centrado'
            }, { text: '                                      ', style: 'header' }, {
                text: 'Información Adicional', style: 'REACTIVOs', color: '#077915'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['Describa su estado de humor o ánimo frecuente', animo],
                        ['Situación emocional (en caso de ser relevante, por ejemplo proceso de divocio, duelo por alguna pérdida como un trabajo o un ser querido)', emocional],
                        ['¿Ha visitado algún servicio nutricional o médico con fines deportivos o de bajar de peso u otro?', nutriologo],
                        ['¿Cúando y de qué tipo?', nutriologo_q],
                        ['¿Se logró el objetivo de la consulta anterior?', logro],
                        ['Debido a', logro_q],
                        ['¿Qué es lo que le motiva a mejorar?', motiva],
                        ['¿Por qué creé que actualmente no tiene los resultados físicos o de salud que desea?', resultados],
                        ['¿Cómo han sido los cambios de su peso a lo largo de su vida?', sobrepeso]
                    ]
                }, style: 'centrado', pageBreak: 'after'
            }, {
                text: 'OBJETIVOS', style: 'header', color: '#077915'
            }, { text: '                                      ', style: 'header' }, {
                table: {
                    headerRows: 1,
                    widths: ['50%', '50%'],
                    body: [
                        [{ text: 'REACTIVO', bold: true, fontSize: 15 }, { text: 'RESPUESTA', bold: true, fontSize: 15 }],
                        ['PLANTEAMIENTO DE META', meta],
                        ['FECHA', fecha_meta],
                        ['CONSIDERACIONES O PRETEXTOS', pretextos],
                        ['COMPROMISOS', compromisos]
                    ]
                }, style: 'centrado'
            }
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    alignment: 'center'
                }, centrado: {
                    alignment: 'justify'
                }, REACTIVOs: {
                    fontSize: 14,
                    bold: false,
                    alignment: 'justify'
                }
            }
        };
        $scope.muestra_cargar('O');
        pdfMake.createPdf(docDefinition).download();
    };
}]);