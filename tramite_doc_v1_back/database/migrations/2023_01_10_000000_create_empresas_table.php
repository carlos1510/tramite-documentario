<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->id();
            $table->string('numero_doc', 15)->nullable(true);
            $table->string('razon_social', 150);
            $table->string('correo', 150)->nullable(true);
            $table->string('telefono', 15)->nullable(true);
            $table->string('direccion')->nullable(true);
            $table->string('logo')->nullable(true);
            $table->dateTime('created_at')->nullable(true);
            $table->dateTime('updated_at')->nullable(true);
            $table->integer('estado')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empresas');
    }
}
