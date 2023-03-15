<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TipoDocumentoController;
use App\Http\Controllers\EmpresasController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\EmpleadoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/tipo_documentos/listar', [TipoDocumentoController::class, 'index']);
Route::post('/tipo_documentos/guardar', [TipoDocumentoController::class, 'store']);
Route::put('/tipo_documentos/update/{id}', [TipoDocumentoController::class, 'update']);
Route::post('/tipo_documentos/obtenerbyId/{id}', [TipoDocumentoController::class, 'edit']);
Route::post('/tipo_documentos/delete/{id}', [TipoDocumentoController::class, 'destroy']);
Route::post('/tipo_documentos/listar/{tipo}', [TipoDocumentoController::class, 'listarTipo']);

Route::get('/empresas/listar', [EmpresasController::class, 'index']);
Route::post('/empresas/guardar', [EmpresasController::class, 'store']);
Route::put('/empresas/update/{id}', [EmpresasController::class, 'update']);
Route::post('/empresas/obtenerbyId/{id}', [EmpresasController::class, 'edit']);
Route::post('/empresas/delete/{id}', [EmpresasController::class, 'destroy']);

Route::get('/areas/listar', [AreaController::class, 'index']);
Route::post('/areas/guardar', [AreaController::class, 'store']);
Route::put('/areas/update/{id}', [AreaController::class, 'update']);
Route::post('/areas/obtenerbyId/{id}', [AreaController::class, 'edit']);
Route::post('/areas/delete/{id}', [AreaController::class, 'destroy']);

Route::post('/personas/obtenerDatosPersonaByDocumento', [PersonaController::class, 'obtenerDatosPersonaByDocumento']);

Route::post('/empleados/getCodigoEmpleado', [EmpleadoController::class, 'getCodigoEmpleado']);
Route::post('/empleados/guardar', [EmpleadoController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
