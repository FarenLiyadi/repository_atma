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
        Schema::create('pengabdians', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->char('user_id', 36);

            $table->string('link_pengabdian');
            $table->string('judul_data');
            $table->string('tahun_data');
            $table->tinyInteger('semester')->comment('1 awal, 2 akhir, 3 pendek');
            $table->tinyInteger('permission')->comment('1 visible, 2 invisible');
           
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengabdians');
    }
};
