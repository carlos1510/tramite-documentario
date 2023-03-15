import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Form } from 'react-final-form'
import { MdEdit, MdOutlineClear, MdPersonAddAlt } from 'react-icons/md'
import TextField from '../../atoms/TextField'
import ContentHeader from '../../ContentHeader'
import ButtonBack from '../../utility/ButtonBack'
import ButtonSave from '../../utility/ButtonSave'
import { required } from '../../validations/Validations';
import http from '../../../http';
import Swal from 'sweetalert2';

const Empresas = () => {
    const columns = [
        {name: '#',selector: (row, index) => ++index,},
        {name: 'Nro. RUC', selector: row => row.numero_doc},
        {name: 'Razon Social', selector: row => row.razon_social},
        {name: 'Direccion', selector: row => row.direccion},
        {name: 'Telefono', selector: row => row.telefono},
        {name: 'Correo', selector: row => row.correo},
        {name: 'Editar', 
            cell: (row) => <button key={row.id} className="btn btn-success btn-sm" 
            onClick={() => {setEstado(true); setTitulo('Editar'); fechEmpresaById(row.id)}} ><MdEdit /></button>,
            button: true,
        },
        {name: 'Eliminar',
            cell: (row) => <button key={row.id} className="btn btn-danger btn-sm" 
            onClick={() => fechtDeleteEmpresa(row.id)} ><MdOutlineClear /></button>,
            button: true,
        }
    ]

    const [estadoregistro, setEstadoRegistro] = useState(false);
    const [data, setData] = useState({});
    const [estado, setEstado] = useState(false);
    const [id, setId] = useState();
    const [titulo, setTitulo] = useState('Agregar')
    const [empresa, setEmpresas] = useState([]);

    useEffect(() => {
        fectAllEmpresas();
    }, []);

    const fectAllEmpresas = () => {
        http.get('/empresas/listar').then(res => {
            setEmpresas(res.data);
        })
    }

    const fechEmpresaById = (param) => {
        setId(param);
        
        http.post('/empresas/obtenerbyId/'+ param ).then((res) => {
            setEstadoRegistro(true)
          setData({
            numero_doc: res.data.numero_doc,
            razon_social: res.data.razon_social,
            correo: res.data.correo,
            telefono: res.data.telefono, 
            direccion: res.data.direccion,  
          })
        })
    }

    const fechtDeleteEmpresa = (param) => {
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
            http.post('/empresas/delete/'+param).then((res) => {
              Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Se elimino exitosamente el registro',
                timer: '3000'
              });
              fectAllEmpresas();
            })
          }
        })
    }

    const onSubmit = async (values) => {
        if(estado){
            http.put('/empresas/update/'+id, values).then((res) => {
              setTitulo('Agregar');
              Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Operación realizado exitosamente',
                timer: '3000'
              })
              fectAllEmpresas();
              setEstadoRegistro(false);
              nuevo()
             });
          }else{
            http.post('/empresas/guardar', values).then(res => {
              Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Operación realizado exitosamente',
                timer: '3000'
              })
              fectAllEmpresas();
              setEstadoRegistro(false);
              nuevo()
            })
          }
    } 

    const nuevoRegistro = () => {
        nuevo();
        setEstadoRegistro(true);
    }

    const nuevo = () => {
        limpiarDato();
        setId();
        setTitulo('Agregar');
        setEstado(false);
        //setLoading(false);
    }

    const salirRegistro = () => {
        limpiarDato();
        setEstadoRegistro(false);
    }

    const limpiarDato = () => {
        setData({
            numero_doc: '',
            razon_social: '',
            correo: '',
            telefono: '', 
            direccion: '', 
          })
    }

  return (
    <div>
      <ContentHeader title='Empresa' type={true}  />
      <div className="wrapper wrapper-content">
        {estadoregistro ? 
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='ibox' >
                        <div className='ibox-title'>
                            <h5>{titulo} Empresa</h5>
                        </div>
                        <Form 
                        onSubmit={onSubmit} 
                        initialValues={data}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div className='ibox-content'>
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <TextField name='numero_doc' requerido={true} label='RUC' validate={required()} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <TextField name='razon_social' requerido={true} label='Razón Social' validate={required()} />
                                        </div>
                                        <div className='col-lg-3'>
                                            <TextField name='telefono' label='Telefono' />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <TextField name='direccion' label='Dirección' />
                                        </div>
                                        <div className='col-lg-6'>
                                            <TextField name='correo' label='Correo' />
                                        </div>
                                    </div>
                                </div>
                                <div className='ibox-footer'>
                                    <div className='col text-center'>
                                        <ButtonBack type={'button'} onClick={salirRegistro} />
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
                            <h5>Lista de Empresa</h5>
                            <div className="ibox-tools">
                                <button type='button' onClick={nuevoRegistro} className='btn btn-sm btn-success'><MdPersonAddAlt size={20} /> Agregar</button>
                            </div>
                        </div>
                        <div className='ibox-content no-padding'>
                            <div className='table-responsive'>
                                <DataTable columns={columns}
                                data={ empresa || [] }
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

export default Empresas
