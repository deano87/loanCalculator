<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return ['welcome'];
});

$app->group(['prefix' => 'api/v1'], function () use ($app) {
    $app->get('/loan-calc', 'LoanCalcController@index');
    $app->post('/loan-calc', 'LoanCalcController@calc');


    // @TODO: Apply admin middleware

    $app->get('/loan-calc/settings', 'SettingsController@index');
    $app->put('/loan-calc/settings', 'SettingsController@update');

    $app->get('/loan-calc/jobs', 'JobTypesController@index');
    $app->post('/loan-calc/jobs', 'JobTypesController@store');
    $app->put('/loan-calc/jobs/{id}', 'JobTypesController@update');
    $app->delete('/loan-calc/jobs/{id}', 'JobTypesController@delete');


    $app->get('/loan-calc/scripts', 'ScriptsController@index');
    $app->post('/loan-calc/scripts/{name}', 'ScriptsController@run');


});
