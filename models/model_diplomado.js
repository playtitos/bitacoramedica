var diplomado = angular.module('diplomado', ['ui.router', 'ngDialog']);

diplomado.config(function($stateProvider, $urlRouterProvider){
        $stateProvider
			.state('general', {
				name: 'general',
				url: '/general',
				templateUrl: "../views/general.html",
				controller: "generalController"	
			})
			.state('antecedentes', {
				name: 'antecedentes',
				url: '/antecedentes',
				templateUrl: "../views/antecedentes.html",
				controller: "antecedentesController"		
			})
			.state('sintomas', {
				name: 'sintomas',
				url: '/sintomas',
				templateUrl: "../views/sintomas.html",
				controller: "sintomasController"		
			})
			.state('habitos', {
				name: 'habitos',
				url: '/habitos',
				templateUrl: "../views/habitos.html",
				controller: "habitosController"		
			})
			.state('evaluaciones', {
				name: 'evaluaciones',
				url: '/evaluaciones',
				templateUrl: "../views/evaluaciones.html",
				controller: "evaluacionesController"		
			});
    $urlRouterProvider.otherwise('/general');
});

diplomado.factory('focus', function($timeout, $window) {
    return function(id) {
    	$timeout(function() {
        	var element = $window.document.getElementById(id);
        	if(element){
          		element.focus();
        	}
      	});
    };
});

diplomado.directive('capitalize', function() {
    return {
      	require: 'ngModel',
      	link: function(scope, element, attrs, modelCtrl) {
        	var capitalize = function(inputValue) {
          	if (inputValue == undefined) inputValue = '';
          		var capitalized = inputValue.toUpperCase();
          		if (capitalized !== inputValue) {
            		modelCtrl.$setViewValue(capitalized);
            		modelCtrl.$render();
        		}
       		return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
});