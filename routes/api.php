<?php

use Illuminate\Http\Request;

Route::prefix('v1')->group(function () {
    Route::group(['namespace' => 'Api', 'prefix' => 'books'], function () {
        Route::get('/', 'BookController@index');
        Route::post('/', 'BookController@store');
        Route::put('/{id}', 'BookController@update');
        Route::get('/{id}', 'BookController@show')->where('id', '\d+');
        Route::delete('/{id}', 'BookController@destroy');
        Route::get('/search/{query?}', 'BookController@search');
    });
});