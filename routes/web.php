<?php

use App\Http\Controllers\PenelitianController;
use App\Http\Controllers\PengabdianController;
use App\Http\Controllers\PengajaranController;
use App\Http\Controllers\PenunjangController;
use App\Http\Controllers\PribadiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Penelitian;
use App\Models\Pengabdian;
use App\Models\Pengajaran;
use App\Models\Penunjang;
use App\Models\Pribadi;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/dashboard');
});
Route::get('/file/{id}', [UserController::class, 'accessFile']);
Route::get('/guest-download/{id}/{kode}', [UserController::class, 'guest_download']);
Route::get('/guest/{id}', [UserController::class, 'guest']);


Route::middleware(['auth'])->group(function () {
    // dashboard

    Route::get('/dashboard', function () {
            $user_dosen = User::where('deleted_at',null)->where('roles',2)->count();
            $user_tu = User::where('deleted_at',null)->where('roles',3)->count();
            $userId = Auth::user()->id;
            $formattedTotalFileSizes = [];
            $fileSizes = [];
            $driveInfo=[];
            function formatSize($size) {
                return round($size / (1024 * 1024 ), 2) . ' MB';
            }

            $tables = [
                'Penelitian' => Penelitian::whereNull('deleted_at')->where('user_id', $userId)->pluck('link_penelitian'),
                'Penunjang' => Penunjang::whereNull('deleted_at')->where('user_id', $userId)->pluck('link_penunjang'),
                'Pengajaran' => Pengajaran::whereNull('deleted_at')->where('user_id', $userId)->pluck('link_pengajaran'),
                'Pengabdian' => Pengabdian::whereNull('deleted_at')->where('user_id', $userId)->pluck('link_pengabdian'),
                'Pribadi' => Pribadi::whereNull('deleted_at')->where('user_id', $userId)->pluck('link_pribadi')
            ];
            if(Auth::user()->roles != 1){

             
                // Function to calculate file size per extension
                function calculateSizePerType($filePaths) {
                    $fileSizesByType = [];
    
                    foreach ($filePaths as $path) {
                        if (!empty($path) && Storage::exists($path)) {
                            $fileSize = Storage::size($path);
                            $extension = pathinfo($path, PATHINFO_EXTENSION);
                         
                            // Sum file sizes per type
                            if (!isset($fileSizesByType[$extension])) {
                                $fileSizesByType[$extension] = 0;
                            }
    
                            $fileSizesByType[$extension] += $fileSize;
                        }
                        if (file_exists(public_path($path))) {
                            $fileSize = filesize(public_path($path));
                            $extension = pathinfo(public_path($path), PATHINFO_EXTENSION);

                            if (!isset($fileSizesByType[$extension])) {
                                $fileSizesByType[$extension] = 0;
                            }
    
                            $fileSizesByType[$extension] += $fileSize;
                        } 
                    }
    
                    return $fileSizesByType;
                }
    
                // Store total file sizes per extension across all tables
                $totalFileSizesByType = [];
    
                foreach ($tables as $category => $files) {
                    // Log::info("Processing table: $category");
                    // Log::info("Files: " . json_encode($files));
                    $fileSizesByType = calculateSizePerType($files);
    
                    foreach ($fileSizesByType as $type => $size) {
                        if (!isset($totalFileSizesByType[$type])) {
                            $totalFileSizesByType[$type] = 0;
                           
                        }
                        
                        $totalFileSizesByType[$type] += $size;
                    }
                }
    
             

               
    
                // Format total file sizes
             
                foreach ($totalFileSizesByType as $type => $size) {
                    $formattedTotalFileSizes[$type] = formatSize($size);
                }
           
            }
            if(Auth::user()->roles != 1){

                function getFileSize($paths)
                {
                    $totalSize = 0;

                    foreach ($paths as $path) {
                        if (Storage::exists($path)) {
                            $totalSize += Storage::size($path);
                        }
                        if (file_exists(public_path($path))) {
                            $totalSize += filesize(public_path($path));
                           
                        } 
                    }

                    return formatSize($totalSize);
                }


            
                foreach ($tables as $tableName => $paths) {
                    $fileSizes[$tableName] = getFileSize($paths);
                }
        }
        if(Auth::user()->roles == 1){
            function formatSizeDetail($size)
            {
                $units = ['B', 'KB', 'MB', 'GB', 'TB'];
                $i = 0;

                while ($size >= 1024 && $i < count($units) - 1) {
                    $size /= 1024;
                    $i++;
                }

                return round($size, 2) . ' ' . $units[$i]; // Format to readable size
            }
            function getDriveSize()
            {
                $diskPath = storage_path(); // Get storage path

                $totalSpace = disk_total_space($diskPath); // Total disk space
                $freeSpace = disk_free_space($diskPath); // Free disk space
                $usedSpace = $totalSpace - $freeSpace; // Used space

                return [
                    'TotalSpace' => formatSizeDetail($totalSpace),
                    'UsedSpace' => formatSizeDetail($usedSpace),
                    'FreeSpace' => formatSizeDetail($freeSpace),
                ];
            }


            // Get drive information
            $driveInfo = getDriveSize();
        }
        //   Log::info(Auth::user()->roles);
            return Inertia::render('admin-dashboard',[
                'user_dosen' => $user_dosen,
                'user_tu' => $user_tu,
                'calculate' => $formattedTotalFileSizes,
                'calculate2' => $fileSizes,
                'drive' => $driveInfo,
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
            Route::get('/update-pengabdian/{id}', 'updatePengabdianView')->name('update.pengabdian.view');
           
            Route::post('/update-pengabdian', 'updatePengabdian')->name('update.pengabdian');
            Route::post('/delete-pengabdian', 'deletePengabdian')->name('delete.pengabdian');
            Route::post('/update-pengabdian-visitor', 'updatePengabdianVisitor')->name('update.pengabdian.visitor');
           
           
          
 
        });
    //Pengajaran controller
        Route::controller(PengajaranController::class)->group(function () {
            // list pengabdian
            Route::get('/list-pengajaran', 'listPengajaranView')->name('list.pengajaran.view');
            Route::get('/list-pengajaran-request', 'listPengajaran')->name('list.pengajaran');
            Route::get('/update-pengajaran/{id}', 'updatePengajaranView')->name('update.pengajaran.view');
           
            Route::post('/update-pengajaran-visitor', 'updatePengajaranVisitor')->name('update.pengajaran.visitor');
            Route::post('/update-pengajaran', 'updatePengajaran')->name('update.pengajaran');
            Route::post('/delete-pengajaran', 'deletePengajaran')->name('delete.pengajaran');
           
          
 
        });
    //Penelitian controller
        Route::controller(PenelitianController::class)->group(function () {
            // list pengabdian
            Route::get('/list-penelitian', 'listPenelitianView')->name('list.penelitian.view');
            Route::get('/update-penelitian/{id}', 'updatePenelitianView')->name('update.penelitian.view');
            Route::get('/list-penelitian-request', 'listPenelitian')->name('list.penelitian');
           
            Route::post('/update-penelitian', 'updatePenelitian')->name('update.penelitian');
            Route::post('/update-penelitian-visitor', 'updatePenelitianVisitor')->name('update.penelitian.visitor');
            Route::post('/delete-penelitian', 'deletePenelitian')->name('delete.penelitian');
           
          
 
        });
    //Penunjang controller
        Route::controller(PenunjangController::class)->group(function () {
            // list pengabdian
            Route::get('/list-penunjang', 'listPenunjangView')->name('list.penunjang.view');
            Route::get('/list-penunjang-request', 'listPenunjang')->name('list.penunjang');
           
            Route::post('/update-penunjang', 'updatePenunjang')->name('update.penunjang');
            Route::post('/delete-penunjang', 'deletePenunjang')->name('delete.penunjang');
            Route::get('/update-penunjang/{id}', 'updatePenunjangView')->name('update.penunjang.view');
            Route::post('/update-penunjang-visitor', 'updatePenunjangVisitor')->name('update.penunjang.visitor');
           
          
 
        });
    //Pribadi controller
        Route::controller(PribadiController::class)->group(function () {
            // list pengabdian
            Route::get('/list-pribadi', 'listPribadiView')->name('list.pribadi.view');
            Route::get('/list-pribadi-request', 'listPribadi')->name('list.pribadi');
           
            Route::post('/update-pribadi', 'updatePribadi')->name('update.pribadi');
            Route::post('/delete-pribadi', 'deletePribadi')->name('delete.pribadi');

            Route::get('/update-pribadi/{id}', 'updatePribadiView')->name('update.pribadi.view');
            Route::post('/update-pribadi-visitor', 'updatePribadiVisitor')->name('update.pribadi.visitor');
           
          
 
        });
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';



