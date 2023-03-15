<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
date_default_timezone_set('America/Lima');

class Area extends Model
{
    use HasFactory;

    protected $table = 'areas';

    protected $fillable = [
        'area_nombre',
        'idempresa',
        'created_at',
        'updated_at',
        'estado',
    ];
}
