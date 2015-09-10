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

/*
|--------------------------------------------------------------------------
| Middleware routes
|--------------------------------------------------------------------------
|
| Middleware config to ensure only certain urls are allowed to be used
|
*/
$app->routeMiddleware([
    'canManage' => 'App\Http\Middleware\AdminMiddleware'
]);

/*
|--------------------------------------------------------------------------
| Default route
|--------------------------------------------------------------------------
*/
$app->get('/', [
    'as' => 'default', 'uses' => 'App\Http\Controllers\DashboardController@index'
]);

/*
|--------------------------------------------------------------------------
| Country routes
|--------------------------------------------------------------------------
*/

// Get list of countries
$app->get('/admin/country', [
	'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@countryList'
]);

// Insert new country
$app->post('/admin/country', [
	'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@addCountry'
]);

// Modify country
$app->post('/admin/country/{country_id}', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@updateCountry'
]);

// Delete country
$app->delete('/admin/country/{country_id}', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@deleteCountry'
]);
/*
|--------------------------------------------------------------------------
| Clinic routes
|--------------------------------------------------------------------------
*/

$app->get('/admin/clinic', [
	'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@cliniclist'
]);

// Insert new clinic
$app->post('/admin/clinic', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@addClinic'
]);

// Modify clinic
$app->post('/admin/clinic/{clinic_id}', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@updateClinic'
]);

// Delete clinic
$app->delete('/admin/clinic/{clinic_id}', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@deleteClinic'
]);

/*
|--------------------------------------------------------------------------
| Product routes
|--------------------------------------------------------------------------
*/
$app->get('/reports/product', [
	'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\ReportController@products'
]);

/*
|--------------------------------------------------------------------------
| Tax routes
|--------------------------------------------------------------------------
*/
$app->get('/admin/tax', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@taxList'
]);

// Insert new tax
$app->post('/admin/tax', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@addTax'
]);

// Modify tax
$app->post('/admin/tax/{tax_id}', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@updateTax'
]);

// Delete tax
$app->delete('/admin/tax/{tax_id}', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\AdminController@deleteTax'
]);

/*
|--------------------------------------------------------------------------
| Invoice routes
|--------------------------------------------------------------------------
*/
$app->get('/admin/invoice', [
    'middleware' => 'canManage',
    'as' => 'default', 'uses' => 'App\Http\Controllers\InvoiceController@invoiceList'
]);