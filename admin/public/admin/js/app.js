'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/admin');
    $urlRouterProvider.otherwise('/dashboard/admin');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: '/public/admin/views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: '/public/admin/views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: '/public/admin/views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('admin', {
            url: '/admin',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/dashboard/admin.html'
          })
          .state('countries', {
            url: '/countries',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/admin/countries.html',
            controller: 'CountriesCtrl'
          })
           .state('clinics', {
            url: '/clinics',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/admin/clinics.html',
            controller: 'ClinicsCtrl'
          })
          .state('reports', {
            url: '/reports',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/dashboard/reports.html'
          })
          .state('product', {
            url: '/product',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/reports/product.html',
            controller: 'ProductsCtrl'
          })

          
          .state('branch', {
            url: '/branch',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/dashboard/branch.html'
          });

  });
