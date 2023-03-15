<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documentos', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->id();
            $table->bigInteger('idpersona')->unsigned();
            $table->bigInteger('idtipo_documento')->unsigned();
            $table->string('representacion', 50)->nullable(true);
            $table->string('ruc', 15)->nullable(true);
            $table->string('nombre_empresa', 100)->nullable(true);
            $table->string('nro_documento', 15);
            $table->string('codigo_documento', 15);
            $table->integer('codigo_documento_correlativo');
            $table->integer('folio')->nullable(true);
            $table->string('asunto')->nullable(true);
            $table->string('nombre_archivo')->nullable(true);
            $table->char('extension_archivo')->nullable(true);
            $table->date('fecha', $presition = 0)->nullable(true);
            $table->bigInteger('idarea')->unsigned();
            $table->bigInteger('idarea_origen')->unsigned();
            $table->bigInteger('idarea_destino')->unsigned();
            $table->integer('estado')->nullable(true);
            $table->dateTime('created_at', $presition = 0)->nullable(true);
            $table->dateTime('updated_at', $presition = 0)->nullable(true);

            $table->foreign('idpersona')->references('id')->on('personas')->onDelete('cascade');
            $table->foreign('idtipo_documento')->references('id')->on('tipo_documentos')->onDelete('cascade');
            $table->foreign('idarea')->references('id')->on('areas')->onDelete('cascade');
            $table->foreign('idarea_origen')->references('id')->on('areas')->onDelete('cascade');
            $table->foreign('idarea_destino')->references('id')->on('areas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documentos');
    }
}
