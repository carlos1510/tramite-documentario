<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Persona;
use GuzzleHttp\Client;
date_default_timezone_set('America/Lima');

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

    public function obtenerDatosPersonaByDocumento(Request $request){
        if(strlen($request->numero_documento) == 8){
            if($request->numero_documento != '00000000'){
                $token = 'apis-token-866.a7kD7Q9DNmGj1NG1uYFqp1PxnGB8zpjd';

                $client = new Client(['base_uri' => 'https://api.apis.net.pe', 'verify' => false]);
                $parameters = [
                    'http_errors' => false,
                    'connect_timeout' => 5,
                    'headers' => [
                        'Authorization' => 'Bearer '.$token,
                        'Referer' => 'https://apis.net.pe/api-consulta-dni',
                        'User-Agent' => 'laravel/guzzle',
                        'Accept' => 'application/json',
                    ],
                    'query' => ['numero' => $request->numero_documento]
                ];
                $res = $client->request('GET', '/v1/dni', $parameters);
                $resultado = json_decode($res->getBody()->getContents(), true);
                $dato[] = array('idtipo_documento' => $request->idtipo_documento, 'numero_documento' => isset($resultado['numeroDocumento'])?$resultado['numeroDocumento']:$request->numero_documento,'apellido_paterno' => $resultado['apellidoPaterno'],'apellido_materno' => $resultado['apellidoMaterno'],'nombres' => $resultado['nombres'],'cliente' => $resultado['nombre'], 'codigo' => null, 'posicion' => null, 'idpersona' => null, 'codigo_empleado' => null, 'correlativo_codigo' => null, 'idarea' => null, 'nombre_cargo' => null, 'fecha_nacimiento' => null, 'telefono' => null, 'correo');
                $data = $dato;
                /*if($resultado['apellidoPaterno'] == ""){
                    $token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTcwMw.JbaYXbRprI5dwWDOFK8vXV1DtBK3v1jZDJSAJq5p6xs';
                    $dni = $params->dni;
                    $json = file_get_contents('https://quertium.com/api/v1/reniec/dni/'.$dni.'?token='.$token);

                    $person = json_decode($json, true);
                    $nombres = $person['primerNombre']." ".$person['segundoNombre'];
                    $dato[] = array('dni' => $dni, 'apellido_paterno' => $person['apellidoPaterno'], 'apellido_materno' => $person['apellidoMaterno'], 'nombres' => rtrim($nombres), 'cliente' => $person['apellidoPaterno']." ".$person['apellidoMaterno']." ".rtrim($nombres), 'codigo' => null, 'posicion' => null, 'id'=>null);
                    $data = $dato;
                }*/
            }else{
                $dato[] = array('idtipo_documento' => $request->idtipo_documento, 'numero_documento' => $request->numero_documento, 'apellido_paterno' => '', 'apellido_materno' => '', 'nombres' => '', 'cliente' => 'VENTAS VARIAS', 'codigo' => null, 'posicion' => null, 'idpersona' => null, 'codigo_empleado' => null, 'correlativo_codigo' => null, 'idarea' => null, 'nombre_cargo' => null, 'fecha_nacimiento' => null, 'telefono' => null, 'correo');
                $data = $dato;
            }
        }else{
            $dato[] = array('idtipo_documento' => $request->idtipo_documento, 'numero_documento' => $request->numero_documento, 'apellido_paterno' => '', 'apellido_materno' => '', 'nombres' => '', 'cliente' => '', 'codigo' => null, 'posicion' => null, 'idpersona' => null, 'codigo_empleado' => null, 'correlativo_codigo' => null, 'idarea' => null, 'nombre_cargo' => null, 'fecha_nacimiento' => null, 'telefono' => null, 'correo');
            $data = $dato;
        }

        return response()->json($data);
    }
}
