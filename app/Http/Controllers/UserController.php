<?php

namespace App\Http\Controllers;

use App\Models\Penelitian;
use App\Models\Pengabdian;
use App\Models\Penunjang;
use App\Models\Pribadi;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class UserController extends Controller
{
    // View section
    public function listUserView(){
        return Inertia::render('User/list-user', [
        ]);
    }
    public function listDeletedView(){
        return Inertia::render('Deleted/list-deleted', [
        ]);
    }
    public function createUserView(){
        return Inertia::render('User/create-user', [
        ]);
    }
    public function updateUserView(){
        return Inertia::render('User/update-user', [
        ]);
    }
    public function upload_data(){
       
        
            return Inertia::render('UploadData', [
            ]);

        
    }

    // API section
    public function listUser(Request $request){
        $length     = $request->input('length', 10);
        $page       = $request->input('page', 1);
        $username   = $request->input('username');
        $roles      = $request->input('roles');

        $validator = Validator::make($request->all(), [
            'length'    => 'required|integer|min:1|max:100',
            'page'      => 'required|integer|min:1',
            'username'  => 'nullable|string|',
            'roles'     => 'nullable|string',
        ]);

        try {
            if ($validator->fails()) {
                $this->code = 1;
                throw new Exception($validator->errors()->first());
            }

            $offset     = $length * ($page - 1);
            $itemInfo   = User::query()->where('deleted_at', null);
            

            if ($username) { $itemInfo->where('username', 'LIKE', "$username%"); }
            
            switch (intval($roles)) {
                case 1:
                    $itemInfo->where('roles', 1);
                    break;
                case 2:
                    $itemInfo->where('roles', 2);
                    break;
                case 3:
                    $itemInfo->where('roles', 3);
                    break;
                case 4:
                    $itemInfo->where('roles', 4);
                    break;
                case 5:
                    $itemInfo->where('roles', 5);
                    break;
                default:
                    break;
            }

            $response = [
                "total" => $itemInfo->count(),
                "item"  => $itemInfo->orderByDesc('created_at')->skip($offset)->take($length)->get(),
                
            ];
            

            $this->dataMsg  = $response;
            $this->code     = 0;
        } catch (Exception $e) {
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }
    public function listDeleted(Request $request){
        $auth = Auth::user()->id;
        $akses = Auth::user()->roles;

        $length     = $request->input('length', 10);
        $page       = $request->input('page', 1);
        $username   = $request->input('username');
        $roles      = $request->input('roles');
        $tahun      = $request->input('tahun');
        $jenisData      = $request->input('jenisdata');
        $judul      = $request->input('judul');
        
        
        $validator = Validator::make($request->all(), [
            'length'    => 'required|integer|min:1|max:100',
            'page'      => 'required|integer|min:1',
            'username'  => 'nullable|string|',
            'roles'     => 'nullable|string',
            'jenisdata'     => 'nullable|string',
            'judul'     => 'nullable|string',
        ]);

        try {
            if ($validator->fails()) {
                $this->code = 1;
                throw new Exception($validator->errors()->first());
            }

            $offset     = $length * ($page - 1);
            if ($jenisData==0){
                $itemInfo1 = Pengabdian::onlyTrashed()->with(['user','Deleted_by:id,username'])->get();
                $itemInfo2 = Pribadi::onlyTrashed()->with(['user','Deleted_by:id,username'])->get();
                $itemInfo3 = Penelitian::onlyTrashed()->with(['user','Deleted_by:id,username'])->get();
                $itemInfo4 = Penunjang::onlyTrashed()->with(['user','Deleted_by:id,username'])->get();
                $itemInfo = collect()
                ->merge($itemInfo1)
                ->merge($itemInfo2)
                ->merge($itemInfo3)
                ->merge($itemInfo4);
            } elseif($jenisData=="1"){
                $itemInfo1 = Pengabdian::onlyTrashed()->with(['user','Deleted_by:id,username'])->get();
                $itemInfo = collect()
                ->merge($itemInfo1);
            }elseif($jenisData=="2"){
                $itemInfo1 = Penelitian::onlyTrashed()->with(['user','Deleted_by:id,username'])->get();
                $itemInfo = collect()
                ->merge($itemInfo1);
            }elseif($jenisData=="3"){
                $itemInfo1 = Penunjang::onlyTrashed()->with(['user','Deleted_by:id,username'])->get();
                $itemInfo = collect()
                ->merge($itemInfo1);
            }elseif($jenisData=="4"){
                $itemInfo1 = Pribadi::onlyTrashed()->with(['user','Deleted_by:id,username'])->get();
                $itemInfo = collect()
                ->merge($itemInfo1);
            }
          
            if ($judul) {
                $itemInfo = $itemInfo->filter(function ($item) use ($judul) {
                    // Make sure the `user` relationship is loaded and not null
                    if ($item->user && stripos($item->user->username, $judul) !== false) {
                        return true;
                    }
                    return false;
                });
            }

            

            // Apply username filter
        if ($username) {
            $itemInfo = $itemInfo->filter(function ($item) use ($username) {
                return stripos($item->judul_data, $username) !== false;
            });
        }

        // Apply year filter
        if ($tahun) {
            $itemInfo = $itemInfo->filter(function ($item) use ($tahun) {
                return stripos($item->tahun_data, $tahun) !== false;
            });
        }

        // Filter based on roles (using semester)
        if ($roles) {
            $itemInfo = $itemInfo->filter(function ($item) use ($roles) {
                return $item->semester == $roles;
            });
        }
      

        if ($judul) {
            $itemInfo = $itemInfo->filter(function ($item) use ($judul) {
                return $item->user->username == $judul;
            });
        }

        // Sort by `created_at` and apply pagination
        $itemInfo = $itemInfo->sortByDesc('created_at')
            ->slice($offset, $length)
            ->values(); // Reset array keys after slicing

        // Response
        $response = [
            "total" => $itemInfo->count(),
            "item"  => $itemInfo,
        ];
            

            $this->dataMsg  = $response;
            $this->code     = 0;
        } catch (Exception $e) {
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }
    public function createUser(Request $request){
        $username   = $request->input('username');
        $nidn   = $request->input('nidn');
        $password   = $request->input('password');
        $confPass   = $request->input('conf_password');
        $roles      = $request->input('roles');
        $size      = $request->input('size');
        $fakultas = $request->input('fakultas');
        $prodi = $request->input('prodi');

        if($roles == 2){

            $validator = Validator::make($request->all(), [
                'username'      => 'required|string|min:5|max:20',
                'nidn'      => 'required|string|min:5|max:20',
                'password'      => 'required|string|min:8|max:20',
                'conf_password' => 'required|string|min:8|max:20',
                'roles'         => 'required|numeric|min:1|max:5',
                'size'         => 'required|numeric',
                'fakultas' => 'required|string|max:255',
                'prodi' => 'required|string|max:255',
         
            ]);
        } else{
            $validator = Validator::make($request->all(), [
                'username'      => 'required|string|min:5|max:20',
                'nidn'      => 'required|string|min:5|max:20',
                'password'      => 'required|string|min:8|max:20',
                'conf_password' => 'required|string|min:8|max:20',
                'roles'         => 'required|numeric|min:1|max:5',
                'size'         => 'required|numeric',
                'fakultas' => 'required|string|max:255',
            ]);

        }


        try{
            if ($validator->fails()) {
                $this->code = 1;
                throw new Exception($validator->errors()->first());
            }

            if($password != $confPass){
                $this->code = 106;
                throw new Exception($this->getErrorMessage($this->code));
            }

     

        
            $Userid = Uuid::uuid1();
            User::create([
                "id"            => $Userid,
                "nidn"      => $nidn,
                "username"      => $username,
                "password"      => $password,
                "roles"         => $roles,
                "size"         => $size,
                "fakultas"         => $fakultas,
                "prodi"         => $prodi,
            ]);


            $this->code = 0;
            $this->message = "Add New User Success";
        }catch(Exception $e){
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }

    public function detailUser(Request $request){
        $itemId   = $request->input('item_id');

        $validator = Validator::make($request->all(), [
            'item_id' => 'required|string|min:36|max:36',
        ]);

        try {
            if ($validator->fails()) {
                $this->code = 1;
                throw new Exception($validator->errors()->first());
            }
            $itemInfo = User::where('id', $itemId)->where('deleted_at', null)->first();

            if (!$itemInfo){
                $this->code = 201;
                throw new Exception($this->getErrorMessage($this->code));
            }

            $response = [
                "item"  => $itemInfo,
            ];

            $this->dataMsg  = $response;
            $this->code     = 0;
        } catch (Exception $e) {
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }
    public function getUserProfile(Request $request){
        $itemId   = Auth::user()->id;
        // Log::info(Auth::user()->id);

        try {
            $itemInfo = User::where('id', $itemId)->where('deleted_at', null)->first();
            $response = [
                "user"  => $itemInfo,
            ];

            $this->dataMsg  = $response;
            $this->code     = 0;
        } catch (Exception $e) {
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }
    public function updateUser(Request $request){
 
        $actor_id     = $request->input('actor_id');
        $itemId     = $request->input('item_id');
        $username   = $request->input('username');
        $nidn   = $request->input('nidn');
        $password   = $request->input('password');
        $confPass   = $request->input('conf_password');
        $roles      = $request->input('roles');
        $size      = $request->input('size');
        $fakultas = $request->input('fakultas');
        $prodi = $request->input('prodi');
      

       
        if($roles == 2){

            $validator = Validator::make($request->all(), [
                'actor_id'       => 'required|string|min:36|max:36',
            'item_id'       => 'required|string|min:36|max:36',
            'username'      => 'required|string|min:5|max:20',
            'nidn'      => 'required|string|min:5|max:20',
            'size'     => 'required|numeric',
            'password'      => 'nullable|string|min:8|max:20',
            'conf_password' => 'nullable|string|min:8|max:20',
            'roles'         => 'required|numeric',
                'fakultas' => 'required|string|max:255',
                'prodi' => 'required|string|max:255',
         
            ]);
        } else{
            $validator = Validator::make($request->all(), [
                'actor_id'       => 'required|string|min:36|max:36',
                'item_id'       => 'required|string|min:36|max:36',
                'username'      => 'required|string|min:5|max:20',
                'nidn'      => 'required|string|min:5|max:20',
                'size'     => 'required|numeric',
                'password'      => 'nullable|string|min:8|max:20',
                'conf_password' => 'nullable|string|min:8|max:20',
                'roles'         => 'required|numeric',
                    'fakultas' => 'required|string|max:255',
            ]);

        }


        try{
            if ($validator->fails()) {
                $this->code = 1;
                throw new Exception($validator->errors()->first());
            }



            $itemInfo = User::where('id', $itemId)->where('deleted_at', null)->first();
            $userInfo = User::where('id', $actor_id)->where('deleted_at', null)->first();
            if (!$itemInfo){
                $this->code = 104;
                throw new Exception($this->getErrorMessage($this->code));
            }
            if ($password) { 
                if($password != $confPass){
                    $this->code = 106;
                    throw new Exception($this->getErrorMessage($this->code));
                }
                $updateData['password'] = $password;
            }
            if ($userInfo->roles == 1){
                if ($username) { $updateData['username'] = $username; }
                if ($nidn) { $updateData['nidn'] = $nidn; }
                if ($roles) { $updateData['roles'] = $roles; }
                if ($size) { $updateData['size'] = $size; }
                if ($fakultas) { $updateData['fakultas'] = $fakultas; }
                if ($prodi) { $updateData['prodi'] = $prodi; }
            }

           
            $itemInfo->update($updateData);
            $itemInfo->save();
           

            $this->code = 0;
            $this->message = "Update User Success";
        }catch(Exception $e){
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }

    public function deleteUser(Request $request){
        $itemId     = $request->input('item_id');
        $validator = Validator::make($request->all(), [
       
            'item_id'       => 'required|string|min:36|max:36',
        ]);

        try{
            if ($validator->fails()) {
                $this->code = 1;
                throw new Exception($validator->errors()->first());
            }

           

            $itemInfo = User::where('id', $itemId)->where('deleted_at', null)->first();
            if (!$itemInfo){
                $this->code = 104;
                throw new Exception($this->getErrorMessage($this->code));
            }
            $itemInfo->delete();  // This performs a soft delete

            $this->code = 0;
            $this->message = "Delete User Success";
        }catch(Exception $e){
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }

    public function accessFile($id){
        // Fetch the record from the database
        $pengabdian = Pengabdian::find($id) ?? Penelitian::find($id) ?? Penunjang::find($id) ?? Pribadi::find($id);

       
        if (!$pengabdian) {
            return response()->json(['message' => 'File not found'], 404);
        }
        // Log::info($pengabdian);
        // Check the permission level
        if ($pengabdian->permission === 1) {
             // File stored in 'public/uploads/'
            $filePath = public_path($pengabdian->link_pengabdian ?? $pengabdian->link_penelitian ?? $pengabdian->link_penunjang?? $pengabdian->link_pribadi );
                if (file_exists($filePath)) {
                    return response()->download($filePath);
                } else {
                    return response()->json(['error' => 'File not found'], 404);
                }
        } else {
            // Private file: Only the owner can access
            if(Auth::check() ){
                if(Auth::user()->roles === 1 || $pengabdian->user_id == Auth::user()->id ){

                    $fix_path = $pengabdian->link_pengabdian ?? $pengabdian->link_penelitian ?? $pengabdian->link_penunjang ?? $pengabdian->link_pribadi;
                    $filePath = storage_path('app/private/' . $fix_path );
                    if (file_exists($filePath)) {
                        // Force download the file
                        return response()->download($filePath);
                    }else {
                        return view('errors.403'); // Return a 404 view if the file is not found
                    }
                } else{
                    return view('errors.403'); // Return the 403 view
                }
            } else {
                // Unauthorized access attempt
                return view('errors.403'); // Return the 403 view
            
            }
            if (Auth::check() && Auth::user()->id === $pengabdian->user_id ) {
                // Serve the private file
                $fix_path = $pengabdian->link_pengabdian ?? $pengabdian->link_penelitian ?? $pengabdian->link_penunjang ?? $pengabdian->link_pribadi;
                $filePath = storage_path('app/private/' . $fix_path );
                if (file_exists($filePath)) {
                    // Force download the file
                    return response()->download($filePath);
                }else {
                    return view('errors.403'); // Return a 404 view if the file is not found
                }
            } else {
                // Unauthorized access attempt
                return view('errors.403'); // Return the 403 view
            }
        }
    }

    public function upload_data_request(Request $request){
        $roles = Auth::user()->roles;
        if ($roles === 1) {
            $this->code = 403;
            throw new Exception($this->getErrorMessage($this->code));
        }
       
        $judulData = $request->input('judul_data');
        $tahunData = $request->input('tahun_data');
        $semester = $request->input('semester');
        $jenisData = $request->input('jenis_data');
        $fakultas = Auth::user()->fakultas;
        $prodi = Auth::user()->prodi;
        $permission = $request->input('permission'); // 1 or 2
        $user_id = Auth::user()->id;

        $validator = Validator::make($request->all(), [
            'judul_data' => 'required|string|max:255',
            // 'fakultas' => 'required|string|max:255',
            // 'prodi' => 'required|string|max:255',
            'tahun_data' => 'required|numeric',
            'semester' => 'required|in:1,2,3', // assuming 1 = Awal, 2 = Akhir, 3 = Pendek
            'jenis_data' => 'required|in:1,2,3,4', // assuming 1 = Pengabdian, etc.
            'permission' => 'required|in:1,2', // assuming 1 = Pengabdian, etc.
            'file' => 'required|file|max:10240', // max 10 MB, adapt as needed
        ]);
      
      
     
        
        try{        

            if ($validator->fails()) {
                $this->code = 4;
                throw new Exception($validator->errors()->first());
            }

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $size = $file->getSize(); //bytes
                $sizeInGB = round($size / (1024 * 1024 * 1024),4);

                $itemInfo = User::where('id', Auth::user()->id)->where('deleted_at', null)->first();
                $freeSpace = round($itemInfo->size - $itemInfo->usage,4);
                if ($freeSpace < $sizeInGB){
                    $this->code = 302;
                    throw new Exception($this->getErrorMessage($this->code));
                }
                $updateData['usage'] = $itemInfo->usage + $sizeInGB;
                
                
        
                // Log::info($freeSpace);
                $originalFilename = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $filenameWithoutExtension = pathinfo($originalFilename, PATHINFO_FILENAME);
                $newFilename = $filenameWithoutExtension . '_' . time() .Auth::user()->username. '.' . $extension;
               
                $nama = Auth::user()->username;
    
                if ($permission == "1") {
                    // Public: Store the file in the 'public' disk
                    $path = $file->storeAs(
                        'uploads/' . $fakultas . '/' . ($prodi !=null ? $prodi . '/' : '') . $tahunData . '/' . $nama.'/'.($jenisData =='1' ? 'pengabdian' : '').($jenisData =='2' ? 'penelitian' : '').($jenisData =='3' ? 'pengabdian' : '').($jenisData =='4' ? 'pribadi' : '') ,
                        $newFilename,
                        'public'
                    );
                    $url = Storage::url($path); // Public URL
                } else {
                    // Private: Store the file in the default 'local' disk
                    $path = $file->storeAs(
                        'uploads/' . $fakultas . '/' . ($prodi !=null ? $prodi . '/' : '') . $tahunData . '/' . $nama.'/'.($jenisData =='1' ? 'pengabdian/' : '').($jenisData =='2' ? 'penelitian/' : '').($jenisData =='3' ? 'pengabdian/' : '').($jenisData =='4' ? 'pribadi/' : '') ,
                        $newFilename
                    );
                    $url = 'uploads/' . $fakultas . '/' . ($prodi !=null ? $prodi . '/' : '') . $tahunData . '/' . $nama.'/'.($jenisData =='1' ? 'pengabdian/' : '').($jenisData =='2' ? 'penelitian/' : '').($jenisData =='3' ? 'pengabdian/' : '').($jenisData =='4' ? 'pribadi/' : '') . $newFilename; // No public URL for private files
                }}
    

          

            $uploadid = Uuid::uuid1();
            if($jenisData == 1){

                Pengabdian::create([
                    "id"            => $uploadid,
                    "user_id"            => $user_id,
                    "link_pengabdian" => $url,
                    "judul_data"      => $judulData,
                    "tahun_data"      => $tahunData,
                    "semester"         => $semester,
                    "permission"         => $permission,
                ]);
            }
            if($jenisData == 2){

                Penelitian::create([
                    "id"            => $uploadid,
                    "user_id"            => $user_id,
                    "link_penelitian" => $url,
                    "judul_data"      => $judulData,
                    "tahun_data"      => $tahunData,
                    "semester"         => $semester,
                    "permission"         => $permission,
                ]);
            }
            if($jenisData == 3){

                Penunjang::create([
                    "id"            => $uploadid,
                    "user_id"            => $user_id,
                    "link_penunjang" => $url,
                    "judul_data"      => $judulData,
                    "tahun_data"      => $tahunData,
                    "semester"         => $semester,
                    "permission"         => $permission,
                ]);
            }
            if($jenisData == 4){

                Pribadi::create([
                    "id"            => $uploadid,
                    "user_id"            => $user_id,
                    "judul_data" => $judulData,
                    "link_pribadi" => $url,
                    "permission"         => $permission,
                    "tahun_data"      => $tahunData,
                    "semester"         => $semester,
                ]);
            }
            $itemInfo->update($updateData);
                $itemInfo->save();


            $this->code = 0;
            $this->message = "Upload New Data Successfully!";
        }catch(Exception $e){
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
      

    }
}
