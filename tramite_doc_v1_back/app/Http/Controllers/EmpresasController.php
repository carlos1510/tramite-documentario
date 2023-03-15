<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
date_default_timezone_set('America/Lima');

class EmpresasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Empresa::where(['estado' => 1])->get());
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
        Empresa::create([
            'numero_doc' => $request->numero_doc,
            'razon_social' => strtoupper($request->razon_social),
            'correo' => isset($request->correo)?$request->correo:null,
            'telefono' => isset($request->telefono)?$request->telefono:null,
            'direccion' => isset($request->direccion)?$request->direccion:null,
            'logo' => isset($request->logo)?$request->logo:null,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => null,
            'estado' => 1,
        ]);

        return  response()->json(['confirm' => 'success']);
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
        return response()->json(Empresa::whereId($id)->first());
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
        $empresa = Empresa::whereId($id)->first();

        $empresa->update([
            'numero_doc' => $request->numero_doc,
            'razon_social' => strtoupper($request->razon_social),
            'correo' => isset($request->correo)?$request->correo:null,
            'telefono' => isset($request->telefono)?$request->telefono:null,
            'direccion' => isset($request->direccion)?$request->direccion:null,
            'logo' => isset($request->logo)?$request->logo:null,
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
        $empresa = Empresa::whereId($id)->first();
        $empresa->update([
            'estado' => 0,
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }
}
