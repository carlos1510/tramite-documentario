<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personas', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->id();
            $table->bigInteger('idtipo_documento')->unsigned();
            $table->string('numero_documento', 15);
            $table->string('nombres', 45);
            $table->string('apellido_paterno', 45);
            $table->string('apellido_materno', 45);
            $table->string('telefono', 15)->nullable(true);
            $table->string('correo', 150)->nullable(true);
            $table->date('fecha_nacimiento', $presition = 0)->nullable(true);
            $table->string('direccion')->nullable(true);
            $table->foreign('idtipo_documento')->references('id')->on('tipo_documentos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personas');
    }
}
