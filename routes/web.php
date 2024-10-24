<?php

use App\Http\Controllers\PenelitianController;
use App\Http\Controllers\PengabdianController;
use App\Http\Controllers\PenunjangController;
use App\Http\Controllers\PribadiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/dashboard');
});
Route::get('/file/{id}', [UserController::class, 'accessFile']);


Route::middleware(['auth'])->group(function () {
    // dashboard

    Route::get('/dashboard', function () {
            $user_dosen = User::where('deleted_at',null)->where('roles',2)->count();
            $user_tu = User::where('deleted_at',null)->where('roles',3)->count();
                    return Inertia::render('admin-dashboard',[
                            'user_dosen' => $user_dosen,
                            'user_tu' => $user_tu,
                    ]);
            
        })->name('dashboard');

        Route::get('/get-user-profile', [UserController::class, 'getUserProfile'])->name('get.user.profile');
        Route::get('/update-user',[UserController::class, 'updateUserView'] )->name('update.user.view');
        Route::post('/update-user', [UserController::class, 'updateUser'])->name('update.user');
        Route::get('/detail-user-request', [UserController::class, 'detailUser'])->name('detail.user');
        // upload data
        Route::get('/upload-data', [UserController::class, 'upload_data'])->name('upload.data');
        Route::post('/upload-data', [UserController::class, 'upload_data_request'])->name('upload.data.post');
        // Route::get('/file/{id}', [UserController::class, 'accessFile']);

    //user controller
        Route::middleware(['isAdmin'])->controller(UserController::class)->group(function () {
            // tambah user baru
            Route::get('/create-user', 'createUserView')->name('create.user.view');
            Route::post('/create-user', 'createUser')->name('create.user');
            // list deleted
            Route::get('/list-deleted', 'listDeletedView')->name('list.deleted.view');
            Route::get('/list-deleted-request', 'listDeleted')->name('list.deleted');
            
            // list user
            Route::get('/list-user', 'listUserView')->name('list.user.view');
            Route::get('/list-user-request', 'listUser')->name('list.user');
            // delete user
            Route::post('/delete-user', 'deleteUser')->name('delete.user');
           
          
 
        });
    //Pengabdian controller
        Route::controller(PengabdianController::class)->group(function () {
            // list pengabdian
            Route::get('/list-pengabdian', 'listPengabdianView')->name('list.pengabdian.view');
            Route::get('/list-pengabdian-request', 'listPengabdian')->name('list.pengabdian');
           
            Route::post('/update-pengabdian', 'updatePengabdian')->name('update.pengabdian');
            Route::post('/delete-pengabdian', 'deletePengabdian')->name('delete.pengabdian');
           
          
 
        });
    //Penelitian controller
        Route::controller(PenelitianController::class)->group(function () {
            // list pengabdian
            Route::get('/list-penelitian', 'listPenelitianView')->name('list.penelitian.view');
            Route::get('/list-penelitian-request', 'listPenelitian')->name('list.penelitian');
           
            Route::post('/update-penelitian', 'updatePenelitian')->name('update.penelitian');
            Route::post('/delete-penelitian', 'deletePenelitian')->name('delete.penelitian');
           
          
 
        });
    //Penunjang controller
        Route::controller(PenunjangController::class)->group(function () {
            // list pengabdian
            Route::get('/list-penunjang', 'listPenunjangView')->name('list.penunjang.view');
            Route::get('/list-penunjang-request', 'listPenunjang')->name('list.penunjang');
           
            Route::post('/update-penunjang', 'updatePenunjang')->name('update.penunjang');
            Route::post('/delete-penunjang', 'deletePenunjang')->name('delete.penunjang');
           
          
 
        });
    //Pribadi controller
        Route::controller(PribadiController::class)->group(function () {
            // list pengabdian
            Route::get('/list-pribadi', 'listPribadiView')->name('list.pribadi.view');
            Route::get('/list-pribadi-request', 'listPribadi')->name('list.pribadi');
           
            Route::post('/update-pribadi', 'updatePribadi')->name('update.pribadi');
            Route::post('/delete-pribadi', 'deletePribadi')->name('delete.pribadi');
           
          
 
        });
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
