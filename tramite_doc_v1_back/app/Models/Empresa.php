<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
date_default_timezone_set('America/Lima');

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'empresas';

    protected $fillable = [
        'numero_doc',
        'razon_social',
        'correo',
        'telefono',
        'direccion',
        'logo',
        'created_at',
        'updated_at',
        'estado',
    ];
}
