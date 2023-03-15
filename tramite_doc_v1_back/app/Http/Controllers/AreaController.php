<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Area;
date_default_timezone_set('America/Lima');

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Area::where(['estado' => 1])->get());
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
        Area::create([
            'area_nombre' => strtoupper($request->area_nombre),
            'idempresa' => isset($request->idempresa)?$request->idempresa:1,
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
        return response()->json(Area::whereId($id)->first());
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
        $area = Area::whereId($id)->first();

        $area->update([
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
        $area = Area::whereId($id)->first();
        $area->update([
            'estado' => 0,
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }
}
