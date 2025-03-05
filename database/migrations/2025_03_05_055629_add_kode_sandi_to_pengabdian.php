<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pengabdians', function (Blueprint $table) {
            $table->string('kode_sandi')->nullable();
            $table->integer('percobaan')->default(0);
            $table->boolean('guest_mode')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengabdians', function (Blueprint $table) {
            //
        });
    }
};
