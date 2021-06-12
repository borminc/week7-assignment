<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookUserController;

use App\Models\User;
use App\Models\Book;


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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('register', [AuthController::class, 'register'])->name('register');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);

        Route::get('/admin', [AdminController::class, 'admin']);
    });
});

Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::post('borrow', [BookUserController::class, 'borrow']);
        Route::get('user/books', [BookUserController::class, 'getUserBooks']);
    }
);

Route::group([
    'middleware' => ['auth:api', 'is_admin']
], function() {
    Route::get('user/search', [AuthController::class, 'search']);
    Route::post('books/return', [BookUserController::class, 'returnBook']);
    
});

// Route::get('category/name/{name}', [CategoryController::class, 'showBooksByCategoryName']);
Route::resource('categories', 'App\Http\Controllers\CategoryController');

Route::get('books/search', [BookController::class, 'search'])->name('books.search');
Route::resource('books', 'App\Http\Controllers\BookController');

