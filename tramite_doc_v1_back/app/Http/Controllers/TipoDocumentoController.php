<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoDocumento;
date_default_timezone_set('America/Lima');

class TipoDocumentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(TipoDocumento::where(['estado' => 1])->get());
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
        TipoDocumento::create([
            'tipo_documento' => strtoupper($request->tipo_documento),
            'abrev_tipo_documento' => strtoupper($request->abrev_tipo_documento),
            'nombre_tipo_documento' => strtoupper($request->nombre_tipo_documento),
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
        return response()->json(TipoDocumento::whereId($id)->first());
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
        $tipo_doc = TipoDocumento::whereId($id)->first();

        $tipo_doc->update([
            'tipo_documento' => strtoupper($request->tipo_documento),
            'abrev_tipo_documento' => strtoupper($request->abrev_tipo_documento),
            'nombre_tipo_documento' => strtoupper($request->nombre_tipo_documento),
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
        $tipo_documento = TipoDocumento::whereId($id)->first();
        $tipo_documento->update([
            'estado' => 0,
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }

    public function listarTipo($tipo){
        return response()->json(TipoDocumento::where(['estado' => 1, 'tipo_documento' => $tipo])->get());
    }


}
