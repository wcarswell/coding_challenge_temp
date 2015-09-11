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
          .state('order', {
            url: '/order',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/admin/order.html',
            controller: 'OrdersCtrl'
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
           .state('tax', {
            url: '/tax',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/admin/tax.html',
            controller: 'TaxCtrl'
          })
           .state('vendor', {
            url: '/vendor',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/admin/vendor.html',
            controller: 'VendorCtrl'
          })
          .state('invoices', {
            url: '/invoices',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/invoices/list.html',
            controller: 'InvoicesCtrl'
          })
          .state('reports', {
            url: '/reports',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/dashboard/reports.html'
          })
          .state('low_stock', {
            url: '/low_stock',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/reports/low_stock.html',
            controller: 'LowStockCtrl'
          })
          .state('product', {
            url: '/product',
            parent: 'dashboard',
            templateUrl: '/public/admin/views/reports/product.html',
            controller: 'ProductsCtrl'
          });

  });
