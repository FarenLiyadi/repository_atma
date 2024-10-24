<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Penelitian extends Model
{
    use HasFactory, HasUuids,SoftDeletes;
    protected $fillable =[
        'id',
        'user_id',
        'link_penelitian',
        'judul_data',
        'tahun_data',
        'semester',
        'permission',
        'deleted_by',

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
