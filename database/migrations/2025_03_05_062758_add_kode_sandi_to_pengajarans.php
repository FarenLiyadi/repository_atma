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
        Schema::table('pengajarans', function (Blueprint $table) {
            $table->json('visitor')->nullable(); // Adding a JSON column
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
        Schema::table('pengajarans', function (Blueprint $table) {
            //
        });
    }
};
