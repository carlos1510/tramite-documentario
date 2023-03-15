<?php

namespace App\Http\Controllers;

use App\Http\Utils\Util;
use Illuminate\Http\Request;
use App\Models\Empleado;
use App\Models\Persona;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\isNull;

date_default_timezone_set('America/Lima');

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Empleado::where(['estado' => 1])->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $idpersona = isset($request->idpersona)?$request->idpersona:null;
        if (!is_null($request->idpersona)){
            $idpersona = 'editar';
            $persona = Persona::whereId($request->idpersona)->first();
            $persona->update([
                'idtipo_documento' => isset($request->idtipo_documento)?$request->idtipo_documento:null,
                'numero_documento' => isset($request->numero_documento)?$request->numero_documento:null,
                'nombres' => isset($request->nombres)?$request->nombres:null,
                'apellido_paterno' => isset($request->apellido_paterno)?$request->apellido_paterno:null,
                'apellido_materno' => isset($request->apellido_materno)?$request->apellido_materno:null,
                'telefono' => isset($request->telefono)?$request->telefono:null,
                'correo' => isset($request->correo)?$request->correo:null,
                'fecha_nacimiento' => isset($request->fecha_nacimiento)?($request->fecha_nacimiento!=""?Util::convertirStringFecha($request->fecha_nacimiento, false):null):null,
                'direccion' => isset($request->direccion)?$request->direccion:null,
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }else{
            Persona::create([
                'idtipo_documento' => isset($request->idtipo_documento)?$request->idtipo_documento:null,
                'numero_documento' => isset($request->numero_documento)?$request->numero_documento:null,
                'nombres' => isset($request->nombres)?$request->nombres:null,
                'apellido_paterno' => isset($request->apellido_paterno)?$request->apellido_paterno:null,
                'apellido_materno' => isset($request->apellido_materno)?$request->apellido_materno:null,
                'telefono' => isset($request->telefono)?$request->telefono:null,
                'correo' => isset($request->correo)?$request->correo:null,
                'fecha_nacimiento' => isset($request->fecha_nacimiento)?($request->fecha_nacimiento!=""?Util::convertirStringFecha($request->fecha_nacimiento, false):null):null,
                'direccion' => isset($request->direccion)?$request->direccion:null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => null,
            ]);

            $result_id = DB::selectOne("SELECT MAX(id) AS id FROM personas");
            $idpersona = $result_id->id;
        }

        Empleado::create([
            'idpersona' => $idpersona,
            'idarea' => isset($request->idarea)?$request->idarea:1,
            'idempresa' => isset($request->idempresa)?$request->idempresa:1,
            'codigo_empleado' => isset($request->codigo_empleado)?$request->codigo_empleado:null,
            'correlativo_codigo' => isset($request->correlativo_codigo)?strtoupper($request->correlativo_codigo):null,
            'nombre_cargo' => isset($request->nombre_cargo)?strtoupper($request->nombre_cargo):null,
            'idusuario' => isset($request->idusuario)?$request->idusuario:null,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => null,
            'estado' => 1,
        ]);

        return  response()->json(['confirm' => 'success', 'idpersona'=>$idpersona]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return response()->json(Empleado::whereId($id)->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $empleado = Empleado::whereId($id)->first();

        $empleado->update([
            'area_nombre' => strtoupper($request->area_nombre),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $empleado = Empleado::whereId($id)->first();
        $empleado->update([
            'estado' => 0,
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }

    public function getCodigoEmpleado(){
        //$empleado = DB::selectOne('SELECT (IFNULL(MAX(correlativo_codigo), 0) + 1) AS correlativo FROM empleados');
        $empleado = Empleado::select('correlativo_codigo')->max('correlativo_codigo');
        if (isNull($empleado)){
            $data['correlativo_codigo'] = 1;
        }else{
            $data['correlativo_codigo'] = (int)$empleado + 1;
        }
        $data['codigo_empleado'] = 'E-'.str_pad($data['correlativo_codigo'], 8, "0", STR_PAD_LEFT);
        return response()->json($data);
    }
}
