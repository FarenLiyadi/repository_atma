<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
abstract class Controller
{
    public $code    = 9;
    public $message = '';
    public $dataMsg = [];
    public $dataRtn = [];

    public function getErrorMessage($error){
        $errorList = [
            0   => "Success",
            1   => "Validation Error",
            2   => "Invalid Token",
            4 => "Invalid Tipe Data",
            9   => "Unknown Error",
            100 => "Invalid Login Data",
            101 => "Confirmation Password Is Not Correct",
            102 => "User Already Registered",
            103 => "Cannot Delete Your Own User",
            104 => "Data Not Found",
            105 => "Data Already Exist",
            106 => "Password and Confirmation Is Not Same",
            109 => "Token Expired", // Data in redis not found
            110 => "Please Renew Token", // The token used not same
            111 => "Member Bank Not Found",
            112 => "Old Password is Incorrect",
            113 => "You Are Not Allowed To Access This",
            114 => "IP Is Not Whitelisted",
            115 => "Its Not Your Login Time",
            116 => "Account Locked",
            200 => "Too Many Data Generated, Max 1 Year",
            201 => "Record Not Found",
            202 => "Reference Not Found",
            204 => "Data Still in Use",
            205 => "At least 1 Data Must Exist",
            206 => "Record Already Deleted",
            302 => "Storage tidak cukup, silahkan hubungi administrator",
            900 => "Server Not Responding", // HTTP Endpoint error or Error outside try catch
            901 => "Server Return Error", // Script related error from apps, generated from catch
        ];
    
        return $errorList[$error];
    }

    public function createResponse($data = [], Int $code = 0, String $msg = '', $cookie = ''){
        $response = [
            "code"  => $code,
            "msg"   => $msg,
            "data"  => $data,
        ];

        $withCookie = cookie('_em', '', 0);

        if($cookie){
            $withCookie = $cookie;
        }

        return response()->json($response)->withCookie($withCookie);
    }

    public function writeDebug($e){
        $fullPath       = $e->getFile(); // Get the full path
        $relativePath   = str_replace(base_path(), '', $fullPath); // Calculate the relative path

        Log::error('Line: ' . $e->getLine() . ' | File: ' . $relativePath . ' | Error: ' . $e->getMessage());
    }
}
