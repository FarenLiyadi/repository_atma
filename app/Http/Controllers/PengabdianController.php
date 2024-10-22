<?php

namespace App\Http\Controllers;

use App\Models\Pengabdian;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PengabdianController extends Controller
{
    public function listPengabdianView(){
        return Inertia::render('Pengabdian/list-pengabdian', [
        ]);
    }


    // API SECTION
    public function listPengabdian(Request $request){
        $auth = Auth::user()->id;
        $akses = Auth::user()->roles;
        Log::info($auth);
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
            $itemInfo   = Pengabdian::query()->whereNull('deleted_at')->with(['user']);
           if ($akses !== 1) {
                // $itemInfo   = Pengabdian::query()->whereNull('deleted_at')->with(['user']);
                $itemInfo->where('permission','1')->orWhere('user_id',$auth);
            }
            

            if ($username) { $itemInfo->where('judul_data', 'LIKE', "$username%"); }
            if ($tahun) { $itemInfo->where('tahun_data', 'LIKE', "$tahun%"); }
            
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

    public function updatePengabdian(Request $request){
        $itemId     = $request->input('item_id');
        $auth = Auth::user()->id;

        
        
        try{
            if (!$itemId) {
                $this->code = 1;
                throw new Exception($this->getErrorMessage($this->code));
            }
           

            $itemInfo = Pengabdian::where('id', $itemId)->where('deleted_at', null)->first();
            if($itemInfo->user_id != $auth ){
                $this->code = 901;
                throw new Exception($this->getErrorMessage($this->code));
            }
            if (!$itemInfo){
                $this->code = 104;
                throw new Exception($this->getErrorMessage($this->code));
            }

            
            if($itemInfo->permission === 1){

                $filePath =  $itemInfo->link_pengabdian;
                $relativeFilePath = substr($filePath,8);
                // Log::info('File path: ' . $relativeFilePath);

                $newFilename = basename($filePath); // Get the filename
                $destinationPath = storage_path('app/private/uploads/' . $newFilename);
                $old_file = public_path(substr($filePath,1)); // Path in public storage
                // Log::info(Storage::exists($relativeFilePath) ? 'true' : 'false');
                
                if (Storage::disk('public')->exists($relativeFilePath)) {
                    if (copy($old_file, $destinationPath)) {
                        // Generate the public URL manually
                        
                        Storage::disk('public')->delete($relativeFilePath);
                        
                        $updateData['link_pengabdian'] = $newFilename; 
                        $updateData['permission'] = 2; 
                        
                }  
                
            } else {
                return response()->json(['error' => 'File not found'], 404);
            }
            } elseif ($itemInfo->permission === 2) {
             
                $filePath =  $itemInfo->link_pengabdian;
                $relativeFilePath = '/uploads/'.$filePath;
                // Log::info('File path: ' . $relativeFilePath);

                $newFilename = basename($filePath); // Get the filename
                $old_file = storage_path('app/private/uploads/' . $filePath);
                $destinationPath = public_path('storage/uploads/' . $filePath); // Path in public storage
                
                if (Storage::disk('private')->exists($relativeFilePath)) {
                    if (copy($old_file, $destinationPath)) {
                        // Generate the public URL manually
                        $url = '/storage/uploads/' . $newFilename;
                        Storage::disk('private')->delete($relativeFilePath);
                        $updateData['link_pengabdian'] = $url; 
                        $updateData['permission'] = 1; 
                        
                } }else {
                    return response()->json(['error' => 'File not found'], 404);
                }
            }

           
            $itemInfo->update($updateData);
            $itemInfo->save();
          

            $this->code = 0;
            $this->message = "Change permission data Pengabdian Success";
        }catch(Exception $e){
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }


    public function deletePengabdian(Request $request){
        $itemId     = $request->input('item_id');
        $validator = Validator::make($request->all(), [
       
            'item_id'       => 'required|string|min:36|max:36',
        ]);

        try{
            if ($validator->fails()) {
                $this->code = 1;
                throw new Exception($validator->errors()->first());
            }

           

            $itemInfo = Pengabdian::where('id', $itemId)->where('deleted_at', null)->first();
            if (!$itemInfo){
                $this->code = 104;
                throw new Exception($this->getErrorMessage($this->code));
            }
            if($itemInfo->permission === 1){

                // permission is show
                $filePath =  $itemInfo->link_pengabdian;
                $relativeFilePath = substr($filePath,8);
    
                // Log::info('File path: ' . $relativeFilePath);
                // Log::info('File exists: ' . (Storage::disk('public')->exists($relativeFilePath) ? 'true' : 'false'));

                if (Storage::disk('public')->exists($relativeFilePath)) {
                Storage::disk('public')->exists($relativeFilePath) and Storage::disk('public')->delete($relativeFilePath);
                Storage::delete($relativeFilePath);
            } else {
                return response()->json(['error' => 'File not found'], 404);
            }
            } elseif ($itemInfo->permission === 2) {
             
                $filePath =  $itemInfo->link_pengabdian;
                $relativeFilePath = '/uploads/'.$filePath;
                // Log::info('File path: ' . $relativeFilePath);
                // Log::info('File exists: ' . (Storage::disk('private')->exists($relativeFilePath) ? 'true' : 'false'));
        
                    if (Storage::disk('private')->exists($relativeFilePath)) {
                    // Delete the file
                    Storage::disk('private')->delete($relativeFilePath);
                } else {
                    return response()->json(['error' => 'File not found'], 404);
                }
            }

            
            $itemInfo->delete();  

            $this->code = 0;
            $this->message = "Delete Pengabdian Success";
        }catch(Exception $e){
            $this->message = $e->getMessage();
        }

        return $this->createResponse($this->dataMsg, $this->code, $this->message);
    }
}
