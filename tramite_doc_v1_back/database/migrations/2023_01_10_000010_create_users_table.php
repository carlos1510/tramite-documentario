<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->id();
            $table->string('nombre_usuario');
            $table->string('clave', 45);
            $table->bigInteger('idempleado')->unsigned();
            $table->bigInteger('idrol')->unsigned();
            $table->integer('acceso')->nullable(true);
            $table->integer('estado')->nullable(true);
            $table->string('password');
            $table->rememberToken();
            $table->dateTime('created_at', $presition = 0)->nullable(true);
            $table->dateTime('updated_at', $presition = 0)->nullable(true);

            $table->foreign('idempleado')->references('id')->on('empleados')->onDelete('cascade');
            $table->foreign('idrol')->references('id')->on('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
