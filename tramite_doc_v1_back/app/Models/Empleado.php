<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
date_default_timezone_set('America/Lima');

class Empleado extends Model
{
    use HasFactory;

    protected $table = 'empleados';

    protected $fillable = [
        'idpersona',
        'idarea',
        'idempresa',
        'codigo_empleado',
        'correlativo_codigo',
        'nombre_cargo',
        'idusuario',
        'created_at',
        'updated_at',
        'estado',
    ];
}
