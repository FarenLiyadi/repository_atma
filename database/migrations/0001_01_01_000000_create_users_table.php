<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Ramsey\Uuid\Uuid;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('username' , 255)->unique();
            $table->tinyInteger('roles')->comment('1 superadmin, 2 dosen, 3 TU');
            $table->tinyInteger('size')->nullable();
            $table->double('usage',10,4)->default(0);
            $table->string('email')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            // $table->foreignId('user_id')->nullable()->index();
            $table->uuid('user_id')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
        User::create([
            "id"            => Uuid::uuid1(),
            "username"      => "superadmin",
            // "email"         => "superadmin@example.com",
            "password"      => Hash::make("12345678"),
            "roles"         => 1,
            "size"  => 10
           
        ]);
        User::create([
            "id"            => Uuid::uuid1(),
            "username"      => "faren",
            // "email"         => "superadmin@example.com",
            "password"      => Hash::make("12345678"),
            "roles"         => 2,
            "size"  => 10
           
        ]);
        User::create([
            "id"            => Uuid::uuid1(),
            "username"      => "alvin",
            // "email"         => "superadmin@example.com",
            "password"      => Hash::make("12345678"),
            "roles"         => 3,
            "size"  => 10
           
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
