<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Middleware config to ensure only certain urls are allowed to be used
$app->routeMiddleware([
    'canManage' => 'App\Http\Middleware\AdminMiddleware'
]);

// Home controller to load dashboard
$app->get('/', [
    'as' => 'default', 'uses' => 'App\Http\Controllers\DashboardController@index'
]);

// Country controller
$app->get('/admin/country', [
	'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@countrylist'
]);

$app->post('/admin/country', [
	'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@insertCountry'
]);