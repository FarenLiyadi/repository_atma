<?php

namespace App\Http\Controllers;

use App\Models\Pribadi;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PribadiController extends Controller
{
    public function listPribadiView(){
        return Inertia::render('Pribadi/list-pribadi', [
        ]);
    }


     // API SECTION
     public function listPribadi(Request $request){
        $auth = Auth::user()->id;
        $akses = Auth::user()->roles;
        // Log::info($auth);
        $length     = $request->input('length', 10);
        $page       = $request->input('page', 1);
        $username   = $request->input('username');
        $roles      = $request->input('roles');
        $tahun      = $request->input('tahun');

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
            $itemInfo   = Pribadi::query()->whereNull('deleted_at')->with(['user']);
            if ($akses !== 1) {
                $itemInfo->where(function ($query) use ($auth) {
                    $query->where('permission', '1')
                          ->orWhere('user_id', $auth);
                });
            }
            

            if ($username) { $itemInfo->where('judul_data', 'LIKE', "%$username%"); }
            if ($tahun) { $itemInfo->where('tahun_data', 'LIKE', "%$tahun%"); }
            
            switch (intval($roles)) {
                case 1:
                    $itemInfo->where('semester', 1);
                    break;
                case 2:
                    $itemInfo->where('semester', 2);
                    break;
                case 3:
                    $itemInfo->where('semester', 3);
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

    public function updatePribadi(Request $request){
        $itemId     = $request->input('item_id');
        $auth = Auth::user()->id;

        
        
        try{
            if (!$itemId) {
                $this->code = 1;
                throw new Exception($this->getErrorMessage($this->code));
            }
           

            $itemInfo = Pribadi::where('id', $itemId)->where('deleted_at', null)->first();
            if($itemInfo->user_id != $auth ){
                $this->code = 901;
                throw new Exception($this->getErrorMessage($this->code));
            }
            if (!$itemInfo){
                $this->code = 104;
                throw new Exception($this->getErrorMessage($this->code));
            }

            
            if($itemInfo->permission === 1){

                $filePath =  $itemInfo->link_pribadi;
                $relativeFilePath = substr($filePath,8);
                // Log::info('File path: ' . public_path(substr($filePath,1)));

                $newFilename = basename($filePath); // Get the filename
                $prodi = Auth::user()->prodi;
                $destinationDir = storage_path('app/private/uploads/'. Auth::user()->fakultas . '/' . ($prodi !=null ? $prodi . '/' : '') .$itemInfo->tahun_data.'/'.$itemInfo->user->username.'/pribadi');
                // Create the directory if it doesn't exist
                    if (!file_exists($destinationDir)) {
                        mkdir($destinationDir, 0755, true); // Recursive directory creation with permissions
                    }
                $destinationPath = storage_path('app/private/uploads/'. Auth::user()->fakultas . '/' . ($prodi !=null ? $prodi . '/' : '').$itemInfo->tahun_data.'/'.$itemInfo->user->username .'/pribadi/'. $newFilename);
                $old_file = public_path($filePath); // Path in public storage
                // Log::info(Storage::exists($relativeFilePath) ? 'true' : 'false');
                


                
                if (Storage::disk('public')->exists($relativeFilePath)&& file_exists($old_file)) {
                    if (copy($old_file, $destinationPath)) {
                        // Generate the public URL manually
                        
                        Storage::disk('public')->delete($relativeFilePath);
                        
                        $updateData['link_pribadi'] = 'uploads/'. Auth::user()->fakultas . '/' . ($prodi !=null ? $prodi . '/' : '') .$itemInfo->tahun_data.'/'.$itemInfo->user->username.'/pribadi/'.$newFilename; 
                        $updateData['permission'] = 2; 
                     
                        
                }  
                
            } else {
                return response()->json(['error' => 'File not found'], 404);
            }
            } elseif ($itemInfo->permission === 2) {
             
                $filePath =  $itemInfo->link_pribadi;
                $newFilename = basename($filePath); // Get the filename
                // $relativeFilePath = '/'.$filePath;
               
                // Log::info('File path: ' . $relativeFilePath);
                $prodi = Auth::user()->prodi;
                $old_file = storage_path('app/private/' . $filePath);
                $destinationDir = public_path('storage/uploads/'. Auth::user()->fakultas . '/' . ($prodi !=null ? $prodi . '/' : '') .$itemInfo->tahun_data.'/'.$itemInfo->user->username.'/pribadi');
              
                $destinationPath = $destinationDir . '/' . $newFilename;// Path in public storage

    
                if (!file_exists($destinationDir)) {
                    mkdir($destinationDir, 0755, true);
                }
                

                if (Storage::disk('private')->exists('/' . $filePath) && file_exists($old_file)) {
                 if (copy($old_file, $destinationPath)) {
                $url = $destinationPath;
                Storage::disk('private')->delete('/' . $filePath);

                // Update database fields or variables
                $updateData['link_pribadi'] = '/storage/uploads/'. Auth::user()->fakultas . '/' . ($prodi !=null ? $prodi . '/' : '') .$itemInfo->tahun_data.'/'.$itemInfo->user->username.'/pribadi/'.$newFilename;
                $updateData['permission'] = 1;
        } }else {
                    return response()->json(['error' => 'File not found'], 404);
                }
            }

           
            $itemInfo->update($updateData);
            $itemInfo->save();
          

            $this->code = 0;
            $this->message = "Change permission data Pribadi Success";
        }catch(Exception $e){
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }


    public function deletePribadi(Request $request){
        $itemId     = $request->input('item_id');
        $validator = Validator::make($request->all(), [
       
            'item_id'       => 'required|string|min:36|max:36',
        ]);

        try{
            if ($validator->fails()) {
                $this->code = 1;
                throw new Exception($validator->errors()->first());
            }

           

            $itemInfo = Pribadi::where('id', $itemId)->where('deleted_at', null)->first();
            if (!$itemInfo){
                $this->code = 104;
                throw new Exception($this->getErrorMessage($this->code));
            }
            $fileSize = null; // Initialize file size variable
            if($itemInfo->permission === 1){

                // permission is show
                $filePath =  $itemInfo->link_pribadi;
                $relativeFilePath = substr($filePath,8);
    
                // Log::info('File path: ' . $relativeFilePath);
                // Log::info('File exists: ' . (Storage::disk('public')->exists($relativeFilePath) ? 'true' : 'false'));

                if (Storage::disk('public')->exists($relativeFilePath)) {
                    $fileSize = Storage::disk('public')->size($relativeFilePath);
                Storage::disk('public')->exists($relativeFilePath) and Storage::disk('public')->delete($relativeFilePath);
                Storage::delete($relativeFilePath);
            } else {
                return response()->json(['error' => 'File not found'], 404);
            }
            } elseif ($itemInfo->permission === 2) {
             
                $filePath =  $itemInfo->link_pribadi;
                $relativeFilePath = '/uploads/'.$filePath;
                // Log::info('File path: ' . $relativeFilePath);
                // Log::info('File exists: ' . (Storage::disk('private')->exists($relativeFilePath) ? 'true' : 'false'));
        
                    if (Storage::disk('private')->exists($filePath)) {
                        $fileSize = Storage::disk('private')->size($filePath);
                    // Delete the file
                    Storage::disk('private')->delete($filePath);
                } else {
                    return response()->json(['error' => 'File not found'], 404);
                }
            }

            $user = User::where('id',$itemInfo->user_id)->first();
            $updateData['usage'] = $user->usage - round($fileSize / (1024 * 1024 * 1024),4); 
            $user->update($updateData);
            $user->save();
            $actor = Auth::user()->id;
            $updateData2['deleted_by'] = $actor; 
            $itemInfo->update($updateData2);
            $itemInfo->save();
            $itemInfo->delete();  

            $this->code = 0;
            $this->message = "Delete Pribadi Success";
        }catch(Exception $e){
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }
}
