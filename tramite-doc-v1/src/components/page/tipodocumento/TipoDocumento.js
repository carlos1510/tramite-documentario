import React, { useState, useEffect } from 'react'
import ContentHeader from '../../ContentHeader'
import {Form} from "react-final-form";
import TextField from '../../atoms/TextField';
import SelectField from '../../atoms/SelectField';
import DataTable from 'react-data-table-component';
import { MdEdit, MdOutlineClear, MdReplay } from 'react-icons/md';


import http from '../../../http';
import Swal from 'sweetalert2';
import { isNumber, required } from '../../validations/Validations';
import ButtonSave from '../../utility/ButtonSave';
import ButtonBack from '../../utility/ButtonBack';

const TipoDocumento = () => {

  const [tipoDocumento, setTipoDocumentos] = useState([]);
  const [estado, setEstado] = useState(false);
  const [id, setId] = useState();
  const [titulo, setTitulo] = useState('Agregar')
  const [data, setData] = useState({});

  const columns = [
    {
        name: '#',selector: (row, index) => ++index,
    },
    {
        name: 'Tipo de Documento', selector: row => row.tipo_documento
    },
    {
        name: 'Abrev. de Documento', selector: row => row.abrev_tipo_documento
    },
    {
        name: 'Nombre Completo', selector: row => row.nombre_tipo_documento
    },
    {
        name: 'Editar',
        cell: (row) => <button key={row.id} className="btn btn-success btn-sm" 
        onClick={() => {setEstado(true); setTitulo('Editar'); fechTipoDocumento(row.id)}}><MdEdit /></button>,
        button: true,
    },
    {
        name: 'Eliminar',
        cell: (row) => <button key={row.id} className="btn btn-danger btn-sm" 
        onClick={() => fechtDeleteTipoDoc(row.id)}><MdOutlineClear /></button>,
        button: true,
    },
  ];

  useEffect(() => {
    fectAllTipoDocumentos();
  }, []);

  const fectAllTipoDocumentos = () => {
    http.get('/tipo_documentos/listar').then(res => {
      setTipoDocumentos(res.data);
    })
  }

  const fechtDeleteTipoDoc = (param) => {
    Swal.fire({
      title: 'Advertencia',
      text: '¿Está seguro que desea eliminar el registro?',
      icon: 'error',
      showDenyButton: true,
      denyButtonText: 'No',
      confirmButtonText: 'Si',
      confirmButtonColor: "blue",

    }).then(response => {
      if(response.isConfirmed){
        http.post('/tipo_documentos/delete/'+param).then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Se elimino exitosamente el registro',
            timer: '3000'
          });
          fectAllTipoDocumentos();
        })
      }
    })
  }

  const fechTipoDocumento = (param) => {
    setId(param);
    
    http.post('/tipo_documentos/obtenerbyId/'+ param ).then((res) => {
      setData({
        tipo_documento: res.data.tipo_documento,
        abrev_tipo_documento: res.data.abrev_tipo_documento,
        nombre_tipo_documento: res.data.nombre_tipo_documento 
      })
    })
  }

    const data_select = [
        {id: 'DOCUMENTOS DE IDENTIDAD', name: 'DOCUMENTOS DE IDENTIDAD'},
        {id: 'DOCUMENTOS DE TRAMITES', name: 'DOCUMENTOS DE TRAMITES'},
    ]

    const onSubmit = async (values) => {
      if(estado){
        http.put('/tipo_documentos/update/'+id, values).then((res) => {
          setTitulo('Agregar');
          Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Operación realizado exitosamente',
            timer: '3000'
          })
          fectAllTipoDocumentos();
          setId();
          setEstado(false);
          setData({
            tipo_documento: '',
            abrev_tipo_documento: '',
            nombre_tipo_documento: '' 
          })
          //setLoading(false);
          //setTitulo('Agregar');
         });
      }else{
        http.post('/tipo_documentos/guardar', values).then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Operación realizado exitosamente',
            timer: '3000'
          })
          fectAllTipoDocumentos();
          setId();
          setEstado(false);
          //setLoading(false);
          setTitulo('Agregar');
          setData({
            tipo_documento: '',
            abrev_tipo_documento: '',
            nombre_tipo_documento: '' 
          })
        })
      }
        
    }
    
      const validate = () => {
        console.log("Validaciones");
      }

  return (
    <div>
      <ContentHeader title='Categoria' type={true}  />
      <div className="wrapper wrapper-content">
        <div className='row'>
          <div className='col-lg-7'>
            <div className='panel panel-success'>
              <div className='panel-heading'>Lista de Tipo de Documentos</div>
              <div className='panel-body'>
                <div className='table-responsive'>
                  <DataTable columns={columns}
                    data={tipoDocumento || [] }
                    pagination 
                    fixedHeader
                    fixedHeaderScrollHeight="340px"
                    responsive={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-5'>
            <div className='panel panel-success'>
              <div className='panel-heading'>{titulo} Tipo de Documento</div>
              <Form 
                    onSubmit={onSubmit} 
                    validate={validate}
                    initialValues={data}
                render={({ handleSubmit, form: {reset}, submitSucceeded }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='panel-body'>
                            {submitSucceeded && reset()}
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <SelectField name='tipo_documento' requerido={true} label="Tipo de Documento" validate={required()} data={data_select || []} />
                                </div>
                                <div className='col-lg-12'>
                                    <TextField name='abrev_tipo_documento' className='text-uppercase' requerido={true} label='Abreviacion Nombre' validate={required()} />
                                </div>
                                <div className='col-lg-12'>
                                    <TextField name='nombre_tipo_documento' className='text-uppercase' requerido={true} label='Nombre Completo' validate={required()} />
                                </div>
                            </div>
                        </div>
                        <div className='panel-footer align-items-center'>
                            <div className='col text-center'>
                                <ButtonBack type={'button'} onClick={() => reset()} />
                                <ButtonSave type={'submit'}  />
                            </div>
                        </div>
                    </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TipoDocumento
