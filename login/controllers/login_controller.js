login.controller('cLogin', ['$scope', '$http', function ($scope, $http) {

    $scope.user_name        = "";
    $scope.user_pass        = "";
    $scope.cargando_general = false;
    sessionStorage.clear();

    $scope.entrar = function(){
        $scope.error_name       = "";
        $scope.error_pass       = "";
        $scope.mensaje_error    = "";
        $scope.mensaje_exito    = "";
        $scope.error_login      = false;
        $scope.exito_login      = false;

        if($scope.user_name === ""){
            $scope.error_login      = true;
            $scope.mensaje_error    = "Es necesario capturar un nombre de usuario";
            $scope.error_name       = "error";
        }else if($scope.user_pass === ""){
            $scope.error_login      = true;
            $scope.mensaje_error    = "Es necesario capturar la contraseña del usuario";
            $scope.error_pass       = "error";
        }else{
            var dir = "../../php/login.php";
            var datos = {
                user : $scope.user_name,
                pass : $scope.user_pass
            };
            $scope.comunicar(dir, datos, $scope.login_exito, $scope.login_exito);
        }
    };

    $scope.login_exito = function(response){
        var datos = response.data;
        if(datos.length !== 0){
            sessionStorage.setItem('logueado', datos[0].nombre_completo);
            sessionStorage.setItem('rol', datos[0].rol);
            var origen              = window.location.origin;
            var ruta                = "/Diplomado/views/index.html";
            window.location.href    = origen + ruta;
        }else{
            $scope.error_name       = "error";
            $scope.error_pass       = "error";
            $scope.error_login      = true;
            $scope.mensaje_error    = "No se encontraron registros, con los datos ingresados.";
        }
    };
    
    $scope.comunicar = function(archivo, datos, fnExito, fnError){
        var request = $http.post(archivo, datos, {
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    timeout: 600000
        });

        if(typeof(fnError)!=="undefined"){
            request.then(function(response){
                fnExito(response);
            }, fnError);
        }else{
            request.then(function(response){
                fnExito(response);
            });
        }
    };
}]);