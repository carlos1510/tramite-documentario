<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movimientos', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->id();
            $table->bigInteger('iddocumento')->unsigned();
            $table->bigInteger('idarea_origen')->unsigned();
            $table->bigInteger('idarea_destino')->unsigned();
            $table->dateTime('fecha', $precision = 0);
            $table->string('descripcion');
            $table->bigInteger('idusuario')->unsigned();
            $table->integer('estado');
            $table->string('nombre_archivo')->nullable(true);
            $table->char('extension_archivo', 8)->nullable(true);
            $table->string('descripcion_original')->nullable(true);
            $table->dateTime('created_at', $precision = 0)->nullable(true);
            $table->dateTime('updated_at', $precision = 0)->nullable(true);

            $table->foreign('iddocumento')->references('id')->on('documentos')->onDelete('cascade');;
            $table->foreign('idarea_origen')->references('id')->on('areas')->onDelete('cascade');;
            $table->foreign('idarea_destino')->references('id')->on('areas')->onDelete('cascade');;
            $table->foreign('idusuario')->references('id')->on('users')->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movimientos');
    }
}
