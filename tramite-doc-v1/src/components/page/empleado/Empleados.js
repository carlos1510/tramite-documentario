import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import SelectField from '../../atoms/SelectField'
import ContentHeader from '../../ContentHeader'
import { required } from '../../validations/Validations'
import TextField from '../../atoms/TextField'
import ButtonBack from '../../utility/ButtonBack'
import ButtonSave from '../../utility/ButtonSave'
import http from '../../../http'
import {MdPersonAddAlt} from "react-icons/md";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const Empleados = () => {

    const columns = [
        {name: '#'}
    ]

  const data_cargo = [{id:'ADMINISTRADOR', name: 'ADMINISTRADOR'}, {id:'DIRECTOR', name: 'DIRECTOR'}, {id:'SECRETARIA', name: 'SECRETARIA'},]
  const [area, setAreas] = useState([]);
  const [tipoDoc, setTipoDocumento] = useState([])
  const [valor, setValor] = useState({});
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [codigo, setCodigo] = useState({})
  const [estadoregistro, setEstadoRegistro] = useState(false);
  const [estado, setEstado] = useState(false);
  const [empleado, setEmpleados] = useState([])
  

  useEffect(() => {
        fetchAreas();
        fetchTipoDocumento();

  }, []);

  const onSubmit = async (values) => {
    if (estado){
        //editar
    }else {
        http.post('/empleados/guardar', values).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Operación realizado exitosamente',
                timer: '3000'
            })
            //fectAll;
            setEstadoRegistro(false);
            nuevo()
        })
    }
  }

  const fetchAreas = () => {
    let objeto = null;
    let data = []
    http.get('/areas/listar').then(res => {
      res.data.forEach((item, index) => {
        objeto = { id: item.id, name: item.area_nombre}
        data[index] = objeto
      });      
      setAreas(data)  
    })
  }

  const fetchTipoDocumento = () => {
    let objeto = null;
    let data = []
    let params = "DOCUMENTOS DE IDENTIDAD"
    http.post('/tipo_documentos/listar/'+params).then(res => {
      res.data.forEach((item, index) => {
        objeto = { id: item.id, name: item.abrev_tipo_documento}
        data[index] = objeto
      });      
      setTipoDocumento(data)  
    })
  }

  const fetchBuscarPersonabyDoc = (values) => {
      if(values.tipo_documento !== null && values.numero_documento !== null){
        if(values.numero_documento.trim() !== ''){
          setLoadingSearch(true);
          http.post('/personas/obtenerDatosPersonaByDocumento', values).then(res => {
              setValor({
                  idtipo_documento: res.data[0].idtipo_documento,
                  numero_documento: res.data[0].numero_documento,
                  apellido_paterno: res.data[0].apellido_paterno,
                  apellido_materno: res.data[0].apellido_materno, 
                  nombres: res.data[0].nombres,
                  telefono: res.data[0].telefono,
                  correo: res.data[0].correo,
                  fecha_nacimiento: res.data[0].fecha_nacimiento,
                  direccion: res.data[0].direccion,
                  codigo_empleado: res.data[0].codigo_empleado!==null ? res.data[0].codigo_empleado : codigo.codigo_empleado,
                  nombre_cargo: res.data[0].nombre_cargo,
                  idarea: res.data[0].idarea,
                  correlativo_codigo: res.data[0].correlativo_codigo !==null ? res.data[0].correlativo_codigo : codigo.correlativo_codigo,
                  idpersona: res.data[0].idpersona,
              })
              setLoadingSearch(false);
          })
        }
        
      }
  }

    const fechtCodigoEmpleado = () => {
        http.post('/empleados/getCodigoEmpleado').then((res) => {
            setCodigo({
                'codigo_empleado': res.data.codigo_empleado,
                'correlativo_codigo': res.data.correlativo_codigo,
            })
        })
    }

    const nuevo = () => {
        limpiarDato()
        setEstado(false);
        fechtCodigoEmpleado();
    }

    const nuevoRegistro = () => {
        nuevo();
        setEstadoRegistro(true)
    }

    const salir = () => {
        nuevo()
        setEstadoRegistro(false)
    }

  const limpiarDato = () => {
    setValor({
        numero_documento: '',
        apellido_paterno: '',
        apellido_materno: '',
        nombres: '',
        telefono: '',
        correo: '',
        fecha_nacimiento: '',
        direccion: '',
        codigo_empleado: '',
        nombre_cargo: '',
        idarea: '',
        correlativo_codigo: '',
        idpersona: '',
        idtipo_documento: '',
    })
}

  return (
    <div>
      <ContentHeader title='Empleado' type={true}  />
      <div className="wrapper wrapper-content">
          {estadoregistro ?
          <div className='row'>
              <div className='col-lg-12'>
                  <div className='ibox'>
                    <div className='ibox-title'>
                      <h5>Empleado</h5>
                    </div>
                    <Form
                      onSubmit={onSubmit}
                      initialValues={valor}
                    render={({handleSubmit, values}) => (
                      <form onSubmit={handleSubmit}>
                        <div className='ibox-content'>
                          <div className='row'>
                            <div className='col-lg-3'>
                              <SelectField name='idtipo_documento' requerido={true} label="Tipo de Documento" validate={required()} data={tipoDoc || []} />
                            </div>
                            <div className='col-lg-3'>
                              <TextField name='numero_documento' isButton={true} onClick={() =>fetchBuscarPersonabyDoc(values)} requerido={true} label='Numero Documento' loading={loadingSearch} />
                            </div>
                            <div className='col-lg-3'>
                              <TextField name='apellido_paterno' label='Apellido Paterno' requerido={true} validate={required()} />
                            </div>
                            <div className='col-lg-3'>
                              <TextField name='apellido_materno' label='Apellido Materno' requerido={true} validate={required()} />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-3'>
                              <TextField name='nombres' label='Nombres' requerido={true} validate={required()} />
                            </div>
                            <div className='col-lg-3'>
                              <TextField name='telefono' label='Telefono'  />
                            </div>
                            <div className='col-lg-6'>
                              <TextField name='correo' label='Correo' />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-3'>
                              <TextField name='fecha_nacimiento' label='Fecha Nacimiento'/>
                            </div>
                            <div className='col-lg-9'>
                              <TextField name='direccion' label='Dirección' />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-3'>
                              <TextField name='codigo_empleado' label='Codigo Empleado'/>
                            </div>
                            <div className='col-lg-3'>
                              <SelectField name='nombre_cargo' requerido={true} label="Cargo" validate={required()} data={data_cargo || []} />
                            </div>
                            <div className='col-lg-3'>
                              <SelectField name='idarea' requerido={true} label="Área" validate={required()} data={area || []} />
                            </div>
                          </div>
                        </div>
                        <div className='ibox-footer'>
                          <div className='col text-center'>
                              <ButtonBack type={'button'} onClick={salir} />
                              <ButtonSave type={'submit'} />
                          </div>
                        </div>
                      </form>
                    )}
                    />
                  </div>
              </div>
          </div>
              :
            <div className='row'>
              <div className='col-lg-12'>
                  <div className='ibox'>
                      <div className='ibox-title'>
                          <h5>Lista de Empleados</h5>
                          <div className="ibox-tools">
                              <button type='button' onClick={nuevoRegistro} className='btn btn-sm btn-success'><MdPersonAddAlt size={20} /> Agregar</button>
                          </div>
                      </div>
                      <div className='ibox-content no-padding'>
                          <div className='table-responsive'>
                              <DataTable columns={columns}
                                         data={ empleado || [] }
                                         pagination
                                         fixedHeader
                                         fixedHeaderScrollHeight="340px"
                                         responsive={true} />
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          }
      </div>
    </div>
  )
}

export default Empleados