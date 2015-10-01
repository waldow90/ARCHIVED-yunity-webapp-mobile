import yunityAPI from 'yunity-webapp-common/api';
import yunityChat from 'yunity-webapp-common/chat';
import yunityMap from 'yunity-webapp-common/map';

/*
 * INIT APP
 */
var app = angular.module('YunityMobile', [
    'ngRoute',
    'mobile-angular-ui',

    // drag features here
    'mobile-angular-ui.gestures',

    yunityAPI,
    yunityChat,
    yunityMap
]);


/*
 * FORM VALIDATION DIRECTIVE
 */
app.directive('showErrors', function () {
    return {
        restrict: 'A',
        link: function (scope, el) {
            el.bind('blur', function () {

                var valid = false;

                el.toggleClass('has-error', valid);
            });
        }
    }

});

/*
 * INIT
 */
app.run(['$transform', '$rootScope', '$yunityAPI', function ($transform, $rootScope, $yunityAPI) {

    /*
     * API Configuration
     */
    $yunityAPI.config({
        url: '/api'
    });

    window.$transform = $transform;
}]);

/*
 * ROUTUNG
 */
app.config(function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'home.html', reloadOnSearch: false});
    $routeProvider.when('/login', {
        templateUrl: 'login.html',
        reloadOnSearch: false,
        controller: 'YunityLogin'
    });

    $routeProvider.when('/signup', {
        templateUrl: 'signup.html',
        reloadOnSearch: false
    });

    $routeProvider.when('/about', {templateUrl: 'about.html', reloadOnSearch: false});
    $routeProvider.when('/map', {
        templateUrl: 'map.html',
        reloadOnSearch: false,
        controller: 'YunityMap'
    });

});

/*
 * MAIN CONTROLLER
 */
app.controller('MainController', ['$rootScope', '$scope', '$yunityAPI', function ($rootScope, $scope, $yunityAPI) {

    /*
     * handle categores
     */
    $scope.activeCategory = null;
    $scope.categories = [
        {
            name: 'Booksharing',
            icon:'book'
        },
        {
            name: 'Carsharing',
            icon: 'car'
        },
        {
            name: 'Couchsurfing',
            icon: 'bed'
        },
        {
            name: 'Foodsharing',
            icon: 'apple'
        }
    ];

    $scope.showSubCategories = function(cat) {
        $scope.activeCategory = cat;
    };

    $scope.sidebarLeft = 'menu';

    $scope.session = {
        loggedIn: false
    };

    /*
     * LOADING SPINNER
     */
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });

    $scope.login = function () {

        $yunityAPI.authenticate({
            email: $scope.email,
            password: $scope.password,
            success: function(){
                $scope.session.loggedIn = true;
            },
            error: function() {
                $scope.session.loggedIn = true;
            }
        });

    };

}]);

/*
 * LOGIN CONTROLLER
 */
app.controller('YunityLogin', ['$rootScope', '$scope', '$yunityAPI', function ($rootScope, $scope, $yunityAPI) {




}]);

/*
 * CHAT CONTROLLER
 */
app.controller('YunityChat', ['$rootScope', '$scope', function ($rootScope, $scope) {

    /*
     *	Chat
     */
    $scope.chatUsers = [
        {name: 'Matthias', online: true},
        {name: 'Raphael', online: true},
        {name: 'Jamos', online: true},
        {name: 'Michael', online: true},
        {name: 'Lisa', online: false}
    ];

}]);

/*
 * MAP CONTROLLER
 */
app.controller('YunityMap', ['$rootScope', '$scope', '$yunityMap', function ($rootScope, $scope, $yunityMap) {

   // $yunityMap.addMarker();

}]);


