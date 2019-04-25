<?php

Route::group(['namespace' => 'Frontend\\'],  function() {
    Route::resource('books', 'BookController');

    Route::get('/', 'MainController@index');
});
