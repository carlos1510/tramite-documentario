<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpleadosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->id();
            $table->bigInteger('idpersona')->unsigned();
            $table->bigInteger('idarea')->unsigned();
            $table->bigInteger('idempresa')->unsigned();
            $table->string('codigo_empleado', 10);
            $table->integer('correlativo_codigo');
            $table->string('nombre_cargo', 75)->nullable(true);
            $table->bigInteger('idusuario')->unsigned();
            $table->dateTime('created_at')->nullable(true);
            $table->dateTime('updated_at')->nullable(true);
            $table->integer('estado')->nullable(true);

            $table->foreign('idpersona')->references('id')->on('personas')->onDelete('cascade');
            $table->foreign('idarea')->references('id')->on('areas')->onDelete('cascade');
            $table->foreign('idempresa')->references('id')->on('empresas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empleados');
    }
}
