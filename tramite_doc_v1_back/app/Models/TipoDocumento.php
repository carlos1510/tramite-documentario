<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
date_default_timezone_set('America/Lima');

class TipoDocumento extends Model
{
    use HasFactory;

    protected $table = 'tipo_documentos';

    protected $fillable = [
        'tipo_documento',
        'abrev_tipo_documento',
        'nombre_tipo_documento',
        'estado',
    ];
}
