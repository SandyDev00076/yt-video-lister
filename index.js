const angular = require('angular');
require('angular-route');

const app = angular.module('myapp', ['ngRoute']);
app.config($routeProvider => {
    $routeProvider
        .when('/', {
            templateUrl: 'views/Login/Login.html',
            controller: 'login'
        })
        .when('/home/:id', {
            templateUrl: 'views/Home/home.html',
            controller: 'home'
        })
        .when('/video', {
            templateUrl: 'views/Video/video.html',
            controller: 'video'
        })
        .otherwise({
            redirectTo: '/'
        });
})
// controllers
app.controller('login', require('./views/Login/Login'));
app.controller('home', require('./views/Home/Home'));
app.controller('video', require('./views/Video/Video'));

// services