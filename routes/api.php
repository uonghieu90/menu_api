<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::get('isauthenticate', 'UserController@isAuthenticate')->name('user.authenticate')->middleware('auth:api');
Route::get('menu/index', 'MenuController@index')->name('index.menu');

Route::post('menu/store', 'MenuController@store')->name('index.store')->middleware('auth:api');
Route::post('menu/destroy', 'MenuController@destroy')->name('index.destroy')->middleware('auth:api');
Route::post('menu/destroys', 'MenuController@destroys')->name('index.destroy')->middleware('auth:api');

