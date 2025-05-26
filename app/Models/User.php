<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes,HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
        'username',
        'nidn',
        'roles',
        'email',
        'fakultas',
        'prodi',
        'password',
        'size',
        'upload_size',
        'usage',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = md5($value);
    }
    public function Pengabdian()
    {
        return $this->hasMany(Pengabdian::class);
    }
    public function Penunjang()
    {
        return $this->hasMany(Penunjang::class);
    }
    public function Penelitian()
    {
        return $this->hasMany(Penelitian::class);
    }
    public function Pribadi()
    {
        return $this->hasMany(Pribadi::class);
    }
}
