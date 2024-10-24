<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pengabdian extends Model
{
    use HasFactory, HasUuids,SoftDeletes;
    protected $fillable =[
        'id',
        'user_id',
        'link_pengabdian',
        'judul_data',
        'tahun_data',
        'semester',
        'deleted_by',
        'permission'

    ];

    public function User()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function Deleted_by()
    {
        return $this->belongsTo(User::class,'deleted_by');
    }
}
